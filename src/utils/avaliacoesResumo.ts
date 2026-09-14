import type { AvaliacaoProduto } from '../types/produto.types';

/**
 * Calcula a média, a quantidade e a distribuição percentual de notas de uma
 * ferramenta a partir das avaliações reais dela (`Produto.avaliacoes`).
 *
 * Adaptado de `web/src/utils/avaliacoesResumo.ts`: a mesma conta é usada em
 * mais de um lugar no Mobile (tela de Produto e resumo de reserva), então
 * fica centralizada aqui em vez de reimplementada em cada tela/adapter — e,
 * principalmente, evita depender de `rating`/`reviewCount`/`distribuicaoAvaliacoes`
 * fixos do mock, que podem ficar desatualizados em relação às avaliações reais.
 */
export interface ResumoAvaliacoes {
  media: number;
  quantidade: number;
  /** Percentual de avaliações por nota, na ordem [5,4,3,2,1] estrelas. */
  distribuicao: number[];
}

export function calcularResumoAvaliacoes(
  avaliacoes: AvaliacaoProduto[] | undefined,
): ResumoAvaliacoes {
  const lista = avaliacoes ?? [];
  const quantidade = lista.length;

  if (quantidade === 0) {
    return { media: 0, quantidade: 0, distribuicao: [0, 0, 0, 0, 0] };
  }

  const soma = lista.reduce((acumulado, avaliacao) => acumulado + avaliacao.rating, 0);
  // Arredonda para 1 casa decimal (mesmo formato exibido hoje, ex: "4.7").
  const media = Math.round((soma / quantidade) * 10) / 10;

  // Cada nota é arredondada para a estrela mais próxima antes de entrar na
  // distribuição, já que a barra de distribuição é sempre por estrela inteira (5 a 1).
  const distribuicao = [5, 4, 3, 2, 1].map((nota) => {
    const quantidadeNaNota = lista.filter((avaliacao) => Math.round(avaliacao.rating) === nota).length;
    return Math.round((quantidadeNaNota / quantidade) * 100);
  });

  return { media, quantidade, distribuicao };
}
