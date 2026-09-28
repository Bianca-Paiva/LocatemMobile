/** Cenarios cobertos pelos testes de avaliacoesResumo. */
import { calcularResumoAvaliacoes } from '../../../src/utils/Avaliacao/avaliacoesResumo';
import type { AvaliacaoProduto } from '../../../src/types/Ferramentas/produto.types';

/** Cria uma avaliacao de teste com a nota recebida. */
function criarAvaliacao(rating: number): AvaliacaoProduto {
  return {
    nome: 'Usuário Teste',
    rating,
    tempo: '1 semana atrás',
    texto: 'Ótimo produto',
    fotos: [],
    utilCount: 0,
  };
}

describe('calcularResumoAvaliacoes', () => {
  it('retorna zerado quando não há avaliações', () => {
    expect(calcularResumoAvaliacoes(undefined)).toEqual({
      media: 0,
      quantidade: 0,
      distribuicao: [0, 0, 0, 0, 0],
    });
  });

  it('retorna zerado quando a lista de avaliações é vazia', () => {
    expect(calcularResumoAvaliacoes([])).toEqual({
      media: 0,
      quantidade: 0,
      distribuicao: [0, 0, 0, 0, 0],
    });
  });

  it('calcula a média corretamente', () => {
    const resumo = calcularResumoAvaliacoes([criarAvaliacao(5), criarAvaliacao(4), criarAvaliacao(4)]);
    expect(resumo.media).toBeCloseTo(4.3, 1);
    expect(resumo.quantidade).toBe(3);
  });

  it('arredonda a média para 1 casa decimal', () => {
    const resumo = calcularResumoAvaliacoes([criarAvaliacao(5), criarAvaliacao(5), criarAvaliacao(4)]);
    // (5+5+4)/3 = 4.666... -> 4.7
    expect(resumo.media).toBe(4.7);
  });

  it('calcula a distribuição percentual por estrela (ordem [5,4,3,2,1])', () => {
    const resumo = calcularResumoAvaliacoes([
      criarAvaliacao(5),
      criarAvaliacao(5),
      criarAvaliacao(4),
      criarAvaliacao(1),
    ]);
    expect(resumo.distribuicao).toEqual([50, 25, 0, 0, 25]);
  });

  it('arredonda cada nota fracionada para a estrela inteira mais próxima antes de contar', () => {
    const resumo = calcularResumoAvaliacoes([criarAvaliacao(4.6), criarAvaliacao(3.4)]);
    // 4.6 arredonda para 5, 3.4 arredonda para 3
    expect(resumo.distribuicao).toEqual([50, 0, 50, 0, 0]);
  });

  it('soma 100% de distribuição quando todas as avaliações têm a mesma nota', () => {
    const resumo = calcularResumoAvaliacoes([criarAvaliacao(5), criarAvaliacao(5)]);
    expect(resumo.distribuicao).toEqual([100, 0, 0, 0, 0]);
  });

  it('calcula corretamente com uma única avaliação', () => {
    const resumo = calcularResumoAvaliacoes([criarAvaliacao(3)]);
    expect(resumo).toEqual({ media: 3, quantidade: 1, distribuicao: [0, 0, 100, 0, 0] });
  });
});
