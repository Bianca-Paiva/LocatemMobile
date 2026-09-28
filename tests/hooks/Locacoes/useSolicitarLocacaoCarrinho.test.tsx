/** Cenarios cobertos pelos testes de useSolicitarLocacaoCarrinho. */
import { act } from 'react-test-renderer';
import { renderHook } from '../../testUtils/renderHook';
import { useSolicitarLocacaoCarrinho } from '../../../src/hooks/Locacoes/useSolicitarLocacaoCarrinho';
import type { ProdutoSelecionado } from '../../../src/context/Ferramentas/Produto/ProdutoContext';
import { getHojeIso, adicionarDias, adicionarHorasAPartirDeAgora } from '../../../src/utils/Locacoes/dataLocacao';

/** Cria um produto de teste valido e aplica as substituicoes do cenario. */
function criarProduto(overrides: Partial<ProdutoSelecionado> = {}): ProdutoSelecionado {
  return {
    id: 1,
    title: 'Furadeira',
    marca: 'Bosch',
    price: '20,00',
    images: [],
    imageVerificado: {} as any,
    imageNota: {} as any,
    rating: 4,
    reviewCount: 10,
    locador: 'Loja A',
    localizacao: 'São Paulo, SP',
    categoria: 'Ferramentas',
    estoqueDisponivel: 4,
    paymentMethods: [],
    available: true,
    ...overrides,
  };
}

describe('useSolicitarLocacaoCarrinho', () => {
  it('inicia com a quantidade inicial informada (ou 1 por padrão)', () => {
    const { result: r1 } = renderHook(() => useSolicitarLocacaoCarrinho({ produto: criarProduto() }));
    expect(r1.current!.form.quantidade).toBe(1);

    const { result: r2 } = renderHook(() =>
      useSolicitarLocacaoCarrinho({ produto: criarProduto(), quantidadeInicial: 3 }),
    );
    expect(r2.current!.form.quantidade).toBe(3);
  });

  describe('quantidade', () => {
    it('incrementarQuantidade respeita o estoque disponível', () => {
      const { result } = renderHook(() =>
        useSolicitarLocacaoCarrinho({ produto: criarProduto({ estoqueDisponivel: 1 }) }),
      );

      act(() => result.current!.incrementarQuantidade());

      expect(result.current!.form.quantidade).toBe(1);
    });

    it('decrementarQuantidade nunca fica abaixo de 1', () => {
      const { result } = renderHook(() => useSolicitarLocacaoCarrinho({ produto: criarProduto() }));

      act(() => result.current!.decrementarQuantidade());

      expect(result.current!.form.quantidade).toBe(1);
    });
  });

  describe('dataMinimaEntrega', () => {
    it('é hoje quando o produto tem aprovação automática', () => {
      const { result } = renderHook(() =>
        useSolicitarLocacaoCarrinho({ produto: criarProduto({ tipoAprovacao: 'automatica' }) }),
      );

      expect(result.current!.dataMinimaEntrega).toBe(getHojeIso());
    });

    it('é hoje quando o produto não define tipoAprovacao', () => {
      const { result } = renderHook(() => useSolicitarLocacaoCarrinho({ produto: criarProduto() }));

      expect(result.current!.dataMinimaEntrega).toBe(getHojeIso());
    });

    it('soma o prazo de aprovação + pagamento (48h) quando a aprovação é manual', () => {
      const { result } = renderHook(() =>
        useSolicitarLocacaoCarrinho({ produto: criarProduto({ tipoAprovacao: 'manual' }) }),
      );

      expect(result.current!.dataMinimaEntrega).toBe(adicionarHorasAPartirDeAgora(48));
    });
  });

  describe('dataMinimaDevolucao', () => {
    it('é a dataMinimaEntrega enquanto a entrega não foi escolhida', () => {
      const { result } = renderHook(() => useSolicitarLocacaoCarrinho({ produto: criarProduto() }));

      expect(result.current!.dataMinimaDevolucao).toBe(result.current!.dataMinimaEntrega);
    });

    it('é o dia seguinte à data de entrega escolhida', () => {
      const { result } = renderHook(() => useSolicitarLocacaoCarrinho({ produto: criarProduto() }));

      act(() => result.current!.setCampo('dataEntrega', '2025-07-10'));

      expect(result.current!.dataMinimaDevolucao).toBe('2025-07-11');
    });
  });

  describe('handleDataEntregaChange', () => {
    it('preenche automaticamente a data de devolução usando a duração inicial', () => {
      const { result } = renderHook(() =>
        useSolicitarLocacaoCarrinho({ produto: criarProduto(), duracaoInicial: 5 }),
      );

      act(() => result.current!.handleDataEntregaChange('2025-07-10'));

      expect(result.current!.form.dataEntrega).toBe('2025-07-10');
      expect(result.current!.form.dataDevolucao).toBe(adicionarDias('2025-07-10', 5));
    });

    it('não altera a devolução quando não há duração inicial', () => {
      const { result } = renderHook(() => useSolicitarLocacaoCarrinho({ produto: criarProduto() }));

      act(() => result.current!.handleDataEntregaChange('2025-07-10'));

      expect(result.current!.form.dataEntrega).toBe('2025-07-10');
      expect(result.current!.form.dataDevolucao).toBe('');
    });
  });

  describe('cálculo do resumo', () => {
    it('calcula aluguel, frete (fixo R$10) e valor total', () => {
      const { result } = renderHook(() => useSolicitarLocacaoCarrinho({ produto: criarProduto({ price: '20,00' }) }));

      act(() => {
        result.current!.setCampo('dataEntrega', '2025-07-10');
        result.current!.setCampo('dataDevolucao', '2025-07-13');
      });

      expect(result.current!.resumo.diarias).toBe(3);
      expect(result.current!.resumo.aluguel).toBe(60); // 3 x R$20 x 1
      expect(result.current!.resumo.frete).toBe(10);
      expect(result.current!.resumo.valor).toBe(70);
      expect(result.current!.resumo.valorFormatado).toBe('R$ 70,00');
    });

    it('formularioCompleto só é true com todos os campos e período válido', () => {
      const { result } = renderHook(() => useSolicitarLocacaoCarrinho({ produto: criarProduto() }));

      expect(result.current!.resumo.formularioCompleto).toBe(false);

      act(() => {
        result.current!.setCampo('dataEntrega', '2025-07-10');
        result.current!.setCampo('horarioEntrega', '09:00');
        result.current!.setCampo('dataDevolucao', '2025-07-11');
        result.current!.setCampo('horarioDevolucao', '15:00');
      });

      expect(result.current!.resumo.formularioCompleto).toBe(true);
    });

    it('formularioCompleto é false quando o período é inválido mesmo com os outros campos preenchidos', () => {
      const { result } = renderHook(() => useSolicitarLocacaoCarrinho({ produto: criarProduto() }));

      act(() => {
        result.current!.setCampo('dataEntrega', '2025-07-10');
        result.current!.setCampo('horarioEntrega', '09:00');
        result.current!.setCampo('dataDevolucao', '2025-07-10'); // mesma data da entrega
        result.current!.setCampo('horarioDevolucao', '15:00');
      });

      expect(result.current!.resumo.formularioCompleto).toBe(false);
    });
  });

  describe('montarDadosLocacao', () => {
    it('monta os dados prontos para o item do carrinho', () => {
      const produto = criarProduto({ id: 42 });
      const { result } = renderHook(() => useSolicitarLocacaoCarrinho({ produto }));

      act(() => {
        result.current!.setCampo('dataEntrega', '2025-07-10');
        result.current!.setCampo('horarioEntrega', '09:00');
        result.current!.setCampo('dataDevolucao', '2025-07-12');
        result.current!.setCampo('horarioDevolucao', '15:00');
      });

      const dados = result.current!.montarDadosLocacao();

      expect(dados.produtoId).toBe(42);
      expect(dados.dataEntrega).toBe('2025-07-10');
      expect(dados.dataDevolucao).toBe('2025-07-12');
      expect(dados.quantidade).toBe(1);
      expect(dados.resumo.formularioCompleto).toBe(true);
    });
  });
});
