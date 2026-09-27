import { act } from 'react-test-renderer';
import { renderHook } from '../../testUtils/renderHook';
import { useSolicitarLocacao } from '../../../src/hooks/Locacoes/useSolicitarLocacao';
import type { ProdutoSelecionado } from '../../../src/context/Ferramentas/Produto/ProdutoContext';

function criarProduto(overrides: Partial<ProdutoSelecionado> = {}): ProdutoSelecionado {
  return {
    id: 1,
    title: 'Furadeira de Impacto',
    marca: 'Bosch',
    price: '50,00',
    images: ['imagem-1' as any],
    imageVerificado: {} as any,
    imageNota: {} as any,
    rating: 4,
    reviewCount: 10,
    locador: 'Loja do João',
    localizacao: 'São Paulo, SP',
    categoria: 'Ferramentas Elétricas',
    estoqueDisponivel: 5,
    paymentMethods: ['Pix'],
    available: true,
    ...overrides,
  };
}

describe('useSolicitarLocacao', () => {
  it('inicia com o formulário vazio e quantidade 1', () => {
    const { result } = renderHook(() => useSolicitarLocacao({ produto: criarProduto() }));

    expect(result.current!.form.quantidade).toBe(1);
    expect(result.current!.form.dataEntrega).toBe('');
    expect(result.current!.resumo.formularioCompleto).toBe(false);
  });

  describe('quantidade', () => {
    it('incrementarQuantidade aumenta em 1', () => {
      const { result } = renderHook(() => useSolicitarLocacao({ produto: criarProduto() }));

      act(() => result.current!.incrementarQuantidade());

      expect(result.current!.form.quantidade).toBe(2);
    });

    it('incrementarQuantidade não ultrapassa o estoque disponível', () => {
      const { result } = renderHook(() =>
        useSolicitarLocacao({ produto: criarProduto({ estoqueDisponivel: 2 }) }),
      );

      act(() => result.current!.incrementarQuantidade());
      act(() => result.current!.incrementarQuantidade());
      act(() => result.current!.incrementarQuantidade());

      expect(result.current!.form.quantidade).toBe(2);
    });

    it('decrementarQuantidade não vai abaixo de 1', () => {
      const { result } = renderHook(() => useSolicitarLocacao({ produto: criarProduto() }));

      act(() => result.current!.decrementarQuantidade());
      act(() => result.current!.decrementarQuantidade());

      expect(result.current!.form.quantidade).toBe(1);
    });

    it('decrementarQuantidade reduz normalmente quando acima de 1', () => {
      const { result } = renderHook(() => useSolicitarLocacao({ produto: criarProduto() }));

      act(() => result.current!.incrementarQuantidade());
      act(() => result.current!.incrementarQuantidade());
      act(() => result.current!.decrementarQuantidade());

      expect(result.current!.form.quantidade).toBe(2);
    });
  });

  describe('cálculo de aluguel e período', () => {
    it('calcula diárias, aluguel, frete e valor total para um período válido', () => {
      const { result } = renderHook(() => useSolicitarLocacao({ produto: criarProduto({ price: '50,00' }) }));

      act(() => {
        result.current!.setCampo('dataEntrega', '2025-07-10');
        result.current!.setCampo('dataDevolucao', '2025-07-13');
      });

      expect(result.current!.resumo.diarias).toBe(3);
      expect(result.current!.resumo.aluguel).toBe(150); // 3 diárias x R$50 x 1 unidade
      expect(result.current!.resumo.frete).toBe(15);
      expect(result.current!.resumo.valor).toBe(165);
      expect(result.current!.resumo.valorFormatado).toBe('R$ 165,00');
      expect(result.current!.resumo.periodoValido).toBe(true);
    });

    it('multiplica o aluguel pela quantidade selecionada', () => {
      const { result } = renderHook(() => useSolicitarLocacao({ produto: criarProduto({ price: '50,00' }) }));

      act(() => {
        result.current!.setCampo('dataEntrega', '2025-07-10');
        result.current!.setCampo('dataDevolucao', '2025-07-12');
        result.current!.incrementarQuantidade();
      });

      // 2 diárias x R$50 x 2 unidades = 200
      expect(result.current!.resumo.aluguel).toBe(200);
    });

    it('não considera o período válido quando a devolução é igual ou anterior à entrega', () => {
      const { result } = renderHook(() => useSolicitarLocacao({ produto: criarProduto() }));

      act(() => {
        result.current!.setCampo('dataEntrega', '2025-07-10');
        result.current!.setCampo('dataDevolucao', '2025-07-10');
      });

      expect(result.current!.resumo.periodoValido).toBe(false);
      expect(result.current!.resumo.diarias).toBe(0);
      expect(result.current!.resumo.periodoFormatado).toBe('Selecione um período válido');
    });

    it('trata preço do produto com vírgula corretamente', () => {
      const { result } = renderHook(() => useSolicitarLocacao({ produto: criarProduto({ price: '89,90' }) }));

      act(() => {
        result.current!.setCampo('dataEntrega', '2025-07-10');
        result.current!.setCampo('dataDevolucao', '2025-07-11');
      });

      expect(result.current!.resumo.aluguel).toBeCloseTo(89.9, 2);
    });

    it('usa preço 0 quando o preço do produto não é um número válido', () => {
      const { result } = renderHook(() => useSolicitarLocacao({ produto: criarProduto({ price: 'grátis' }) }));

      act(() => {
        result.current!.setCampo('dataEntrega', '2025-07-10');
        result.current!.setCampo('dataDevolucao', '2025-07-11');
      });

      expect(result.current!.resumo.aluguel).toBe(0);
    });
  });

  describe('validação de endereço e contato', () => {
    function preencherPeriodoEHorarios(result: any) {
      act(() => {
        result.current.setCampo('dataEntrega', '2025-07-10');
        result.current.setCampo('horarioEntrega', '09:00');
        result.current.setCampo('dataDevolucao', '2025-07-12');
        result.current.setCampo('horarioDevolucao', '09:00');
      });
    }

    it('formulário não fica completo sem rua/número preenchidos', () => {
      const { result } = renderHook(() => useSolicitarLocacao({ produto: criarProduto() }));
      preencherPeriodoEHorarios(result);

      act(() => {
        result.current!.setCampo('nomeCompleto', 'João da Silva');
        result.current!.setCampo('telefoneContato', '11987654321');
      });

      expect(result.current!.resumo.formularioCompleto).toBe(false);
    });

    it('exige CEP válido quando "cepDesconhecido" é falso', () => {
      const { result } = renderHook(() => useSolicitarLocacao({ produto: criarProduto() }));
      preencherPeriodoEHorarios(result);

      act(() => {
        result.current!.setCampo('ruaAvenida', 'Rua das Flores');
        result.current!.setCampo('numero', '100');
        result.current!.setCampo('nomeCompleto', 'João da Silva');
        result.current!.setCampo('telefoneContato', '11987654321');
        result.current!.setCampo('cep', '123'); // CEP incompleto
      });

      expect(result.current!.resumo.formularioCompleto).toBe(false);

      act(() => {
        result.current!.setCampo('cep', '01234-567');
      });

      expect(result.current!.resumo.formularioCompleto).toBe(true);
    });

    it('dispensa a validação de CEP quando "cepDesconhecido" é true', () => {
      const { result } = renderHook(() => useSolicitarLocacao({ produto: criarProduto() }));
      preencherPeriodoEHorarios(result);

      act(() => {
        result.current!.setCampo('ruaAvenida', 'Rua das Flores');
        result.current!.setCampo('numero', '100');
        result.current!.setCampo('nomeCompleto', 'João da Silva');
        result.current!.setCampo('telefoneContato', '11987654321');
        result.current!.setCampo('cepDesconhecido', true);
      });

      expect(result.current!.resumo.formularioCompleto).toBe(true);
    });

    it('exige nome completo válido (2+ palavras)', () => {
      const { result } = renderHook(() => useSolicitarLocacao({ produto: criarProduto() }));
      preencherPeriodoEHorarios(result);

      act(() => {
        result.current!.setCampo('ruaAvenida', 'Rua das Flores');
        result.current!.setCampo('numero', '100');
        result.current!.setCampo('cepDesconhecido', true);
        result.current!.setCampo('telefoneContato', '11987654321');
        result.current!.setCampo('nomeCompleto', 'João'); // só um nome
      });

      expect(result.current!.resumo.formularioCompleto).toBe(false);
    });

    it('exige telefone com 10 ou 11 dígitos', () => {
      const { result } = renderHook(() => useSolicitarLocacao({ produto: criarProduto() }));
      preencherPeriodoEHorarios(result);

      act(() => {
        result.current!.setCampo('ruaAvenida', 'Rua das Flores');
        result.current!.setCampo('numero', '100');
        result.current!.setCampo('cepDesconhecido', true);
        result.current!.setCampo('nomeCompleto', 'João da Silva');
        result.current!.setCampo('telefoneContato', '123'); // incompleto
      });

      expect(result.current!.resumo.formularioCompleto).toBe(false);
    });
  });

  describe('montarDadosLocacao', () => {
    it('monta os dados da locacao com valores formatados e status pendente', () => {
      const produto = criarProduto({
        title: 'Furadeira',
        price: '50,00',
        avaliacoes: [
          { nome: 'A', rating: 5, tempo: '1 dia', texto: '', fotos: [], utilCount: 0 },
          { nome: 'B', rating: 3, tempo: '2 dias', texto: '', fotos: [], utilCount: 0 },
        ],
      });
      const { result } = renderHook(() => useSolicitarLocacao({ produto }));

      act(() => {
        result.current!.setCampo('dataEntrega', '2025-07-10');
        result.current!.setCampo('horarioEntrega', '09:00');
        result.current!.setCampo('dataDevolucao', '2025-07-13');
        result.current!.setCampo('horarioDevolucao', '15:00');
        result.current!.setCampo('ruaAvenida', 'Rua das Flores');
        result.current!.setCampo('numero', '100');
        result.current!.setCampo('cepDesconhecido', true);
        result.current!.setCampo('nomeCompleto', 'João da Silva');
        result.current!.setCampo('telefoneContato', '11987654321');
      });

      const dados = result.current!.montarDadosLocacao();

      expect(dados.produto).toBe('Furadeira');
      expect(dados.status).toBe('pendente');
      expect(dados.mensagemStatus).toBe('Aguardando aprovação do locador');
      expect(dados.dataInicio).toBe('10/07/2025');
      expect(dados.dataFim).toBe('13/07/2025');
      expect(dados.horaInicio).toBe('09:00');
      expect(dados.horaFim).toBe('15:00');
      expect(dados.avaliacaoLocador).toBe(4); // média de 5 e 3
      expect(dados.numeroAvaliacoes).toBe(2);
      expect(dados.nomeContato).toBe('João da Silva');
      expect(dados.telefoneContato).toBe('11987654321');
      expect(dados.endereco.ruaAvenida).toBe('Rua das Flores');
      expect(dados.endereco.cep).toBe(''); // cepDesconhecido -> cep vazio
    });
  });

  describe('dataMinimaEntrega', () => {
    it('retorna a data de hoje em formato ISO (fuso local)', () => {
      const { result } = renderHook(() => useSolicitarLocacao({ produto: criarProduto() }));
      const hoje = new Date();
      const hojeIso = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, '0')}-${String(
        hoje.getDate(),
      ).padStart(2, '0')}`;

      expect(result.current!.dataMinimaEntrega).toBe(hojeIso);
    });
  });
});
