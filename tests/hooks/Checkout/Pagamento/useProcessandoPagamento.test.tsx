import React from 'react';
import { act, create } from 'react-test-renderer';
import { CarrinhoProvider } from '../../../../src/context/Checkout/Carrinho/CarrinhoContext';
import { PagamentoProvider } from '../../../../src/context/Checkout/Pagamento/PagamentoContext';
import { useProcessandoPagamento } from '../../../../src/hooks/Checkout/Pagamento/useProcessandoPagamento';
import { usePagamentoStore } from '../../../../src/hooks/Checkout/Pagamento/usePagamentoStore';
import { useCarrinhoStore } from '../../../../src/hooks/Carrinho/useCarrinhoStore';
import { useLocacaoStore } from '../../../../src/hooks/Locacoes/useLocacaoStore';
import type { Produto } from '../../../../src/types/Ferramentas/produto.types';

/**
 * useProcessandoPagamento captura os itens selecionados do carrinho num
 * useRef NO MOMENTO EM QUE A TELA MONTA (comportamento intencional, ver
 * comentário no próprio hook). Por isso este harness monta o carrinho e o
 * pagamento primeiro, popula os itens/método, e só DEPOIS monta o
 * componente que usa useProcessandoPagamento — replicando a navegação real
 * (Carrinho -> Método de Pagamento -> Processando Pagamento).
 */
const ESTADO_INICIAL_LOCACOES = useLocacaoStore.getState();

beforeEach(() => {
  jest.useFakeTimers();
  act(() => {
    useLocacaoStore.setState(ESTADO_INICIAL_LOCACOES, false);
    useLocacaoStore.setState({ locacoes: [], locacaoSelecionada: null }, false);
  });
});

afterEach(() => {
  jest.useRealTimers();
});

function criarProduto(overrides: Partial<Produto> = {}): Produto {
  return {
    id: 1,
    title: 'Furadeira',
    marca: 'Bosch',
    price: '30,00',
    images: ['img' as any],
    imageVerificado: {} as any,
    imageNota: {} as any,
    rating: 4,
    reviewCount: 5,
    locador: 'Loja A',
    localizacao: 'São Paulo, SP',
    categoria: 'Ferramentas',
    estoqueDisponivel: 5,
    paymentMethods: [],
    available: true,
    ...overrides,
  };
}

function ComProcessando({ navigate, api }: { navigate: (r: string) => void; api: any }) {
  api.processando = useProcessandoPagamento(navigate);
  return null;
}

function Harness({ mostrarProcessando, navigate, api }: { mostrarProcessando: boolean; navigate: any; api: any }) {
  api.carrinhoStore = useCarrinhoStore();
  api.pagamentoStore = usePagamentoStore();
  return mostrarProcessando ? <ComProcessando navigate={navigate} api={api} /> : null;
}

function montarHarness(navigate = jest.fn()) {
  const api: any = {};
  let renderer: any;
  act(() => {
    renderer = create(
      <CarrinhoProvider>
        <PagamentoProvider>
          <Harness mostrarProcessando={false} navigate={navigate} api={api} />
        </PagamentoProvider>
      </CarrinhoProvider>,
    );
  });

  function montarTelaProcessando() {
    act(() => {
      renderer.update(
        <CarrinhoProvider>
          <PagamentoProvider>
            <Harness mostrarProcessando={true} navigate={navigate} api={api} />
          </PagamentoProvider>
        </CarrinhoProvider>,
      );
    });
  }

  return { api, navigate, montarTelaProcessando };
}

describe('useProcessandoPagamento', () => {
  it('redireciona para "carrinho" quando não há método de pagamento definido', () => {
    const { navigate, montarTelaProcessando } = montarHarness();
    montarTelaProcessando();
    expect(navigate).toHaveBeenCalledWith('carrinho');
  });

  it('metodoValido é true assim que um método de pagamento existe', () => {
    const { api, montarTelaProcessando } = montarHarness();
    act(() => api.pagamentoStore.setMetodoPagamento('pix'));
    montarTelaProcessando();
    expect(api.processando.metodoValido).toBe(true);
  });

  it('após o tempo de processamento, cria uma locacao para cada item selecionado do carrinho', () => {
    const { api, navigate, montarTelaProcessando } = montarHarness();

    act(() => {
      api.carrinhoStore.adicionarItem(criarProduto({ id: 1, title: 'Furadeira' }), 2, 3);
      api.pagamentoStore.setMetodoPagamento('pix');
    });

    montarTelaProcessando();
    act(() => jest.advanceTimersByTime(5000));

    expect(navigate).toHaveBeenCalledWith('pagamentoAprovado');
    const locacoes = useLocacaoStore.getState().locacoes;
    expect(locacoes).toHaveLength(1);
    expect(locacoes[0].produto).toBe('Furadeira');
    expect(locacoes[0].status).toBe('preparandoEntrega');
    expect(locacoes[0].quantidade).toBe(2);
  });

  it('marca o pagamento como processado após o tempo de espera', () => {
    const { api, montarTelaProcessando } = montarHarness();

    act(() => {
      api.carrinhoStore.adicionarItem(criarProduto(), 1, 1);
      api.pagamentoStore.setMetodoPagamento('pix');
    });

    montarTelaProcessando();
    expect(api.pagamentoStore.processado).toBe(false);

    act(() => jest.advanceTimersByTime(5000));

    expect(api.pagamentoStore.processado).toBe(true);
  });

  it('cria uma locacao apenas para os itens selecionados, ignorando os desmarcados', () => {
    const { api, montarTelaProcessando } = montarHarness();

    // Os ids dos itens usam Date.now(); com fake timers, avançamos o relógio
    // entre as duas inserções para não gerar o mesmo id para A e B.
    act(() => {
      api.carrinhoStore.adicionarItem(criarProduto({ id: 1, title: 'A' }), 1, 1);
    });
    act(() => jest.advanceTimersByTime(1));
    act(() => {
      api.carrinhoStore.adicionarItem(criarProduto({ id: 2, title: 'B' }), 1, 1);
    });

    const itemB = api.carrinhoStore.itens.find((i: any) => i.produto.title === 'B');
    act(() => {
      api.carrinhoStore.alternarSelecao(itemB.id); // desmarca "B"
      api.pagamentoStore.setMetodoPagamento('pix');
    });

    montarTelaProcessando();
    act(() => jest.advanceTimersByTime(5000));

    const locacoesCriadas = useLocacaoStore.getState().locacoes;
    expect(locacoesCriadas).toHaveLength(1);
    expect(locacoesCriadas[0].produto).toBe('A');
  });

  it('calcula o valor total considerando preço diário x quantidade x dias', () => {
    const { api, montarTelaProcessando } = montarHarness();

    act(() => {
      api.carrinhoStore.adicionarItem(criarProduto({ price: '25,00' }), 2, 4);
      api.pagamentoStore.setMetodoPagamento('pix');
    });

    montarTelaProcessando();
    act(() => jest.advanceTimersByTime(5000));

    // 25 x 2 x 4 = 200
    expect(useLocacaoStore.getState().locacoes[0].valor).toBe('R$ 200,00');
  });

  it('não cria nenhuma locacao quando o carrinho está vazio', () => {
    const { api, montarTelaProcessando } = montarHarness();

    act(() => api.pagamentoStore.setMetodoPagamento('pix'));
    montarTelaProcessando();
    act(() => jest.advanceTimersByTime(5000));

    expect(useLocacaoStore.getState().locacoes).toHaveLength(0);
  });
});
