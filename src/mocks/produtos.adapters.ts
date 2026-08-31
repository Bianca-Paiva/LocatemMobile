import type { Produto } from '../types/produto.types';
import type { ReservaData } from '../pages/Reservas/MinhasReservas/MinhasReservas.types';
import { calcularResumoAvaliacoes } from '../utils/avaliacoesResumo';

/**
 * Recorta de um `Produto` do catálogo (`PRODUTOS_MOCK`) apenas os campos
 * que toda `ReservaData` reaproveita (ferramenta, imagem, locador, categoria,
 * avaliações e localização), evitando duplicar esses dados em cada mock de reserva.
 *
 * Os campos retornados aqui não fazem parte de `DadosSolicitacao`: são sempre
 * derivados do produto de origem, nunca da própria solicitação.
 */
export function toReservaProdutoBase(
  produto: Produto
): Pick<
  ReservaData,
  | 'produto'
  | 'imagem'
  | 'locador'
  | 'categoria'
  | 'avaliacaoLocador'
  | 'numeroAvaliacoes'
  | 'localizacao'
> {
  // Média e quantidade sempre calculadas a partir das avaliações reais da
  // ferramenta (`produto.avaliacoes`), nunca dos campos fixos `rating`/`reviewCount`
  // do mock — mesma regra usada no Web (ver mocks/produtos.adapters.ts -> toLocacaoProdutoBase).
  const { media, quantidade } = calcularResumoAvaliacoes(produto.avaliacoes);

  return {
    produto: produto.title,
    imagem: produto.images[0],
    locador: produto.locador,
    categoria: produto.categoria,
    avaliacaoLocador: media,
    numeroAvaliacoes: quantidade,
    localizacao: produto.localizacao,
  };
}
