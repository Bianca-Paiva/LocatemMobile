import React from 'react';
import { act, create } from 'react-test-renderer';
import { CarrinhoProvider } from '../../../../src/context/Checkout/Carrinho/CarrinhoContext';
import { PagamentoProvider } from '../../../../src/context/Checkout/Pagamento/PagamentoContext';
import { usePagamentoAprovado } from '../../../../src/hooks/Checkout/Pagamento/usePagamentoAprovado';
import { usePagamentoStore } from '../../../../src/hooks/Checkout/Pagamento/usePagamentoStore';
import { useCarrinhoStore } from '../../../../src/hooks/Carrinho/useCarrinhoStore';
import type { Produto } from '../../../../src/types/Ferramentas/produto.types';

// usePagamentoAprovado também "congela" itens/estado no momento em que a
// tela monta (useState com inicializador preguiçoso), então usamos o mesmo
// harness de duas fases do teste de useProcessandoPagamento.

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

function ComAprovado({ navigate, api }: { navigate: (r: string) => void; api: any }) {
  api.aprovado = usePagamentoAprovado(navigate);
  return null;
}

function Harness({ mostrarAprovado, navigate, api }: { mostrarAprovado: boolean; navigate: any; api: any }) {
  api.carrinhoStore = useCarrinhoStore();
  api.pagamentoStore = usePagamentoStore();
  return mostrarAprovado ? <ComAprovado navigate={navigate} api={api} /> : null;
}

function montarHarness(navigate = jest.fn()) {
  const api: any = {};
  let renderer: any;
  act(() => {
    renderer = create(
      <CarrinhoProvider>
        <PagamentoProvider>
          <Harness mostrarAprovado={false} navigate={navigate} api={api} />
        </PagamentoProvider>
      </CarrinhoProvider>,
    );
  });

  function montarTelaAprovado() {
    act(() => {
      renderer.update(
        <CarrinhoProvider>
          <PagamentoProvider>
            <Harness mostrarAprovado={true} navigate={navigate} api={api} />
          </PagamentoProvider>
        </CarrinhoProvider>,
      );
    });
  }

  return { api, navigate, montarTelaAprovado };
}

describe('usePagamentoAprovado', () => {
  it('acessoValido é false e redireciona para "carrinho" quando não veio de um pagamento processado', () => {
    const { navigate, montarTelaAprovado } = montarHarness();
    montarTelaAprovado();

    expect(navigate).toHaveBeenCalledWith('carrinho');
  });

  it('acessoValido é true quando há método definido e o pagamento foi processado', () => {
    const { api, montarTelaAprovado, navigate } = montarHarness();

    act(() => {
      api.pagamentoStore.setMetodoPagamento('pix');
      api.pagamentoStore.marcarPagamentoProcessado();
    });

    montarTelaAprovado();

    expect(api.aprovado.acessoValido).toBe(true);
    expect(navigate).not.toHaveBeenCalledWith('carrinho');
  });

  it('acessoValido é false quando o método existe mas o pagamento ainda não foi processado', () => {
    const { api, montarTelaAprovado } = montarHarness();

    act(() => api.pagamentoStore.setMetodoPagamento('pix'));

    montarTelaAprovado();

    expect(api.aprovado.acessoValido).toBe(false);
  });

  it('formata o método de pagamento com os 4 últimos dígitos do cartão quando aplicável', () => {
    const { api, montarTelaAprovado } = montarHarness();

    act(() => {
      api.pagamentoStore.setMetodoPagamento('credito');
      api.pagamentoStore.setCartaoPagamento({ id: '1', bandeira: 'Visa', ultimosDigitos: '1234' });
      api.pagamentoStore.marcarPagamentoProcessado();
    });

    montarTelaAprovado();

    expect(api.aprovado.metodoFormatado).toBe('Cartão de Crédito •••• 1234');
  });

  it('formata o pix sem dígitos de cartão', () => {
    const { api, montarTelaAprovado } = montarHarness();

    act(() => {
      api.pagamentoStore.setMetodoPagamento('pix');
      api.pagamentoStore.marcarPagamentoProcessado();
    });

    montarTelaAprovado();

    expect(api.aprovado.metodoFormatado).toBe('PIX');
  });

  it('lista apenas os itens que estavam selecionados no carrinho', () => {
    const { api, montarTelaAprovado } = montarHarness();

    act(() => {
      api.carrinhoStore.adicionarItem(criarProduto({ id: 1, title: 'A' }), 2, 3);
    });
    act(() => jest.useFakeTimers().advanceTimersByTime(1));
    act(() => {
      api.carrinhoStore.adicionarItem(criarProduto({ id: 2, title: 'B' }), 1, 1);
    });

    const itemB = api.carrinhoStore.itens.find((i: any) => i.produto.title === 'B');
    act(() => {
      api.carrinhoStore.alternarSelecao(itemB.id);
      api.pagamentoStore.setMetodoPagamento('pix');
      api.pagamentoStore.marcarPagamentoProcessado();
    });

    montarTelaAprovado();

    expect(api.aprovado.produtos).toHaveLength(1);
    expect(api.aprovado.produtos[0].nome).toBe('A');
    expect(api.aprovado.produtos[0].dias).toBe(3);
    expect(api.aprovado.produtos[0].unidades).toBe(2);
    jest.useRealTimers();
  });

  describe('entrega (Resumo do pedido)', () => {
    it('retorna null quando não há itens', () => {
      const { api, montarTelaAprovado } = montarHarness();
      act(() => {
        api.pagamentoStore.setMetodoPagamento('pix');
        api.pagamentoStore.marcarPagamentoProcessado();
      });
      montarTelaAprovado();

      expect(api.aprovado.entrega).toBeNull();
    });

    it('retorna null quando algum item não tem entrega registrada', () => {
      const { api, montarTelaAprovado } = montarHarness();
      act(() => {
        api.carrinhoStore.adicionarItem(criarProduto(), 1, 1); // sem "entrega"
        api.pagamentoStore.setMetodoPagamento('pix');
        api.pagamentoStore.marcarPagamentoProcessado();
      });
      montarTelaAprovado();

      expect(api.aprovado.entrega).toBeNull();
    });

    it('retorna a entrega quando o único item já tem data/horário definidos', () => {
      const { api, montarTelaAprovado } = montarHarness();
      act(() => {
        api.carrinhoStore.adicionarItem(criarProduto(), 1, 1, { data: '2025-07-10', horario: '09:00' });
        api.pagamentoStore.setMetodoPagamento('pix');
        api.pagamentoStore.marcarPagamentoProcessado();
      });
      montarTelaAprovado();

      expect(api.aprovado.entrega).toEqual({ data: '2025-07-10', horario: '09:00', todosOsItens: false });
    });

    it('retorna null quando os itens têm entregas diferentes', () => {
      const { api, montarTelaAprovado } = montarHarness();
      act(() => {
        api.carrinhoStore.adicionarItem(criarProduto({ id: 1 }), 1, 1, { data: '2025-07-10', horario: '09:00' });
      });
      act(() => jest.useFakeTimers().advanceTimersByTime(1));
      act(() => {
        api.carrinhoStore.adicionarItem(criarProduto({ id: 2 }), 1, 1, { data: '2025-07-11', horario: '09:00' });
        api.pagamentoStore.setMetodoPagamento('pix');
        api.pagamentoStore.marcarPagamentoProcessado();
      });
      montarTelaAprovado();

      expect(api.aprovado.entrega).toBeNull();
      jest.useRealTimers();
    });

    it('marca todosOsItens=true quando há mais de um item com a mesma entrega', () => {
      const { api, montarTelaAprovado } = montarHarness();
      act(() => {
        api.carrinhoStore.adicionarItem(criarProduto({ id: 1 }), 1, 1, { data: '2025-07-10', horario: '09:00' });
      });
      act(() => jest.useFakeTimers().advanceTimersByTime(1));
      act(() => {
        api.carrinhoStore.adicionarItem(criarProduto({ id: 2 }), 1, 1, { data: '2025-07-10', horario: '09:00' });
        api.pagamentoStore.setMetodoPagamento('pix');
        api.pagamentoStore.marcarPagamentoProcessado();
      });
      montarTelaAprovado();

      expect(api.aprovado.entrega).toEqual({ data: '2025-07-10', horario: '09:00', todosOsItens: true });
      jest.useRealTimers();
    });
  });

  describe('ações', () => {
    it('verDetalhesDoAluguel limpa o funil de pagamento e navega para "minhasLocacoesPosPagamento"', () => {
      const { api, navigate, montarTelaAprovado } = montarHarness();
      act(() => {
        api.carrinhoStore.adicionarItem(criarProduto(), 1, 1);
        api.pagamentoStore.setMetodoPagamento('pix');
        api.pagamentoStore.marcarPagamentoProcessado();
      });
      montarTelaAprovado();

      act(() => api.aprovado.verDetalhesDoAluguel());

      expect(navigate).toHaveBeenCalledWith('minhasLocacoesPosPagamento');
      expect(api.pagamentoStore.metodo).toBeNull();
      expect(api.carrinhoStore.itens).toHaveLength(0);
    });

    it('voltarParaInicio limpa o funil de pagamento e navega para "HomeScreen"', () => {
      const { api, navigate, montarTelaAprovado } = montarHarness();
      act(() => {
        api.carrinhoStore.adicionarItem(criarProduto(), 1, 1);
        api.pagamentoStore.setMetodoPagamento('pix');
        api.pagamentoStore.marcarPagamentoProcessado();
      });
      montarTelaAprovado();

      act(() => api.aprovado.voltarParaInicio());

      expect(navigate).toHaveBeenCalledWith('HomeScreen');
      expect(api.pagamentoStore.processado).toBe(false);
    });

    it('não remove itens não selecionados do carrinho ao limpar o funil', () => {
      const { api, montarTelaAprovado } = montarHarness();
      act(() => {
        api.carrinhoStore.adicionarItem(criarProduto({ id: 1, title: 'A' }), 1, 1);
      });
      act(() => jest.useFakeTimers().advanceTimersByTime(1));
      act(() => {
        api.carrinhoStore.adicionarItem(criarProduto({ id: 2, title: 'B' }), 1, 1);
      });
      const itemB = api.carrinhoStore.itens.find((i: any) => i.produto.title === 'B');
      act(() => {
        api.carrinhoStore.alternarSelecao(itemB.id);
        api.pagamentoStore.setMetodoPagamento('pix');
        api.pagamentoStore.marcarPagamentoProcessado();
      });
      montarTelaAprovado();

      act(() => api.aprovado.voltarParaInicio());

      expect(api.carrinhoStore.itens).toHaveLength(1);
      expect(api.carrinhoStore.itens[0].produto.title).toBe('B');
      jest.useRealTimers();
    });
  });
});
