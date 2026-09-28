/** Cenarios cobertos pelos testes de useCarrinhoStore. */
import { act } from 'react-test-renderer';
import { renderHook } from '../../testUtils/renderHook';
import { CarrinhoWrapper } from '../../testUtils/CarrinhoWrapper';
import { useCarrinhoStore } from '../../../src/hooks/Carrinho/useCarrinhoStore';
import type { Produto } from '../../../src/types/Ferramentas/produto.types';

/** Cria um produto de teste valido e aplica as substituicoes do cenario. */
function criarProduto(overrides: Partial<Produto> = {}): Produto {
  return {
    id: 1,
    title: 'Furadeira',
    marca: 'Bosch',
    price: '30,00',
    images: [],
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

/** Renderiza o hook com seus providers e prepara os dados usados no teste. */
function setup() {
  return renderHook(() => useCarrinhoStore(), { wrapper: CarrinhoWrapper });
}

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

/**
 * `adicionarItem` gera o id do item com `` `c-${Date.now()}` ``. Com fake
 * timers, duas chamadas na mesma "hora congelada" colidiriam (ver bug
 * documentado no describe "bug conhecido" abaixo), então avançamos o
 * relógio entre inserções nos testes que dependem de ids distintos.
 */
function avancarRelogio(ms = 1) {
  act(() => jest.advanceTimersByTime(ms));
}

describe('useCarrinhoStore', () => {
  it('lança um erro quando usado fora do CarrinhoProvider', () => {
    // Sem wrapper — Context retorna null e o hook deve lançar. O helper
    // renderHook captura a exceção em result.error em vez de deixá-la
    // propagar de dentro do render do react-test-renderer.
    const consoleErro = jest.spyOn(console, 'error').mockImplementation(() => {});
    const { result } = renderHook(() => useCarrinhoStore());
    expect(result.error).toBeInstanceOf(Error);
    expect((result.error as Error).message).toBe('useCarrinhoStore deve ser usado dentro de CarrinhoProvider');
    consoleErro.mockRestore();
  });

  it('inicia com o carrinho vazio', () => {
    const { result } = setup();
    expect(result.current!.itens).toEqual([]);
  });

  describe('adicionarItem', () => {
    it('adiciona o item no topo da lista, já selecionado, com valores padrão de quantidade e dias', () => {
      const { result } = setup();

      act(() => result.current!.adicionarItem(criarProduto({ title: 'Furadeira' })));

      const [item] = result.current!.itens;
      expect(item.produto.title).toBe('Furadeira');
      expect(item.quantidade).toBe(1);
      expect(item.dias).toBe(1);
      expect(item.selecionado).toBe(true);
      expect(item.entrega).toBeUndefined();
    });

    it('aceita quantidade, dias e entrega customizados', () => {
      const { result } = setup();

      act(() =>
        result.current!.adicionarItem(criarProduto(), 3, 5, { data: '2025-07-10', horario: '09:00' }),
      );

      const [item] = result.current!.itens;
      expect(item.quantidade).toBe(3);
      expect(item.dias).toBe(5);
      expect(item.entrega).toEqual({ data: '2025-07-10', horario: '09:00' });
    });

    it('insere itens novos no topo (mais recente primeiro)', () => {
      const { result } = setup();

      act(() => result.current!.adicionarItem(criarProduto({ title: 'Primeiro' })));
      avancarRelogio();
      act(() => result.current!.adicionarItem(criarProduto({ title: 'Segundo' })));

      expect(result.current!.itens.map((i) => i.produto.title)).toEqual(['Segundo', 'Primeiro']);
    });
  });

  describe('removerItem', () => {
    it('remove apenas o item com o id correspondente', () => {
      const { result } = setup();

      act(() => result.current!.adicionarItem(criarProduto({ title: 'A' })));
      avancarRelogio();
      act(() => result.current!.adicionarItem(criarProduto({ title: 'B' })));

      const idA = result.current!.itens.find((i) => i.produto.title === 'A')!.id;
      act(() => result.current!.removerItem(idA));

      expect(result.current!.itens).toHaveLength(1);
      expect(result.current!.itens[0].produto.title).toBe('B');
    });
  });

  describe('atualizarQuantidade', () => {
    it('atualiza a quantidade do item correspondente', () => {
      const { result } = setup();
      act(() => result.current!.adicionarItem(criarProduto()));
      const id = result.current!.itens[0].id;

      act(() => result.current!.atualizarQuantidade(id, 4));

      expect(result.current!.itens[0].quantidade).toBe(4);
    });

    it('ignora valores de quantidade menores que 1', () => {
      const { result } = setup();
      act(() => result.current!.adicionarItem(criarProduto()));
      const id = result.current!.itens[0].id;

      act(() => result.current!.atualizarQuantidade(id, 0));

      expect(result.current!.itens[0].quantidade).toBe(1);
    });
  });

  describe('atualizarDias', () => {
    it('atualiza os dias do item correspondente', () => {
      const { result } = setup();
      act(() => result.current!.adicionarItem(criarProduto()));
      const id = result.current!.itens[0].id;

      act(() => result.current!.atualizarDias(id, 7));

      expect(result.current!.itens[0].dias).toBe(7);
    });

    it('ignora valores de dias menores que 1', () => {
      const { result } = setup();
      act(() => result.current!.adicionarItem(criarProduto()));
      const id = result.current!.itens[0].id;

      act(() => result.current!.atualizarDias(id, -3));

      expect(result.current!.itens[0].dias).toBe(1);
    });
  });

  describe('alternarSelecao', () => {
    it('inverte o estado de seleção apenas do item correspondente', () => {
      const { result } = setup();
      act(() => result.current!.adicionarItem(criarProduto({ title: 'A' })));
      avancarRelogio();
      act(() => result.current!.adicionarItem(criarProduto({ title: 'B' })));

      const idA = result.current!.itens.find((i) => i.produto.title === 'A')!.id;
      act(() => result.current!.alternarSelecao(idA));

      expect(result.current!.itens.find((i) => i.produto.title === 'A')!.selecionado).toBe(false);
      expect(result.current!.itens.find((i) => i.produto.title === 'B')!.selecionado).toBe(true);
    });
  });

  describe('selecionarTodos', () => {
    it('marca todos os itens com o valor informado', () => {
      const { result } = setup();
      act(() => result.current!.adicionarItem(criarProduto({ title: 'A' })));
      avancarRelogio();
      act(() => result.current!.adicionarItem(criarProduto({ title: 'B' })));

      act(() => result.current!.selecionarTodos(false));
      expect(result.current!.itens.every((i) => !i.selecionado)).toBe(true);

      act(() => result.current!.selecionarTodos(true));
      expect(result.current!.itens.every((i) => i.selecionado)).toBe(true);
    });
  });

  describe('selecionarItens', () => {
    it('altera a seleção apenas dos itens cujos ids estão na lista', () => {
      const { result } = setup();
      act(() => result.current!.adicionarItem(criarProduto({ title: 'A' })));
      avancarRelogio();
      act(() => result.current!.adicionarItem(criarProduto({ title: 'B' })));
      avancarRelogio();
      act(() => result.current!.adicionarItem(criarProduto({ title: 'C' })));

      const idA = result.current!.itens.find((i) => i.produto.title === 'A')!.id;
      const idC = result.current!.itens.find((i) => i.produto.title === 'C')!.id;

      act(() => result.current!.selecionarItens([idA, idC], false));

      expect(result.current!.itens.find((i) => i.produto.title === 'A')!.selecionado).toBe(false);
      expect(result.current!.itens.find((i) => i.produto.title === 'B')!.selecionado).toBe(true);
      expect(result.current!.itens.find((i) => i.produto.title === 'C')!.selecionado).toBe(false);
    });
  });

  describe('bug conhecido: colisão de id em adicionarItem', () => {
    it('dois itens adicionados no mesmo milissegundo recebem o MESMO id (Date.now())', () => {
      // Documenta o comportamento atual: `adicionarItem` usa `c-${Date.now()}`
      // como id. Sem avançar o relógio entre as chamadas, os dois itens
      // recebem o mesmo id, e ações por id (remover/selecionar/etc.) passam
      // a afetar os dois itens ao mesmo tempo em vez de só um.
      const { result } = setup();

      act(() => {
        result.current!.adicionarItem(criarProduto({ title: 'A' }));
        result.current!.adicionarItem(criarProduto({ title: 'B' }));
      });

      const [item1, item2] = result.current!.itens;
      expect(item1.id).toBe(item2.id); // colisão real — ver recomendação no relatório
    });
  });
});
