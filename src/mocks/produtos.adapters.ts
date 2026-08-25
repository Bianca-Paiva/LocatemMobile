import type { Produto } from '../types/produto.types';
import type { ReservaData } from '../pages/Reservas/MinhasReservas/MinhasReservas.types';

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
  return {
    produto: produto.title,
    imagem: produto.images[0],
    locador: produto.locador,
    categoria: produto.categoria,
    avaliacaoLocador: produto.rating,
    numeroAvaliacoes: produto.reviewCount,
    localizacao: produto.localizacao,
  };
}
