import type { Produto } from '../types/produto.types';
import type { ReservaData } from '../pages/Reservas/MinhasReservas/MinhasReservas.types';
import type { ProdutoBusca } from '../pages/Search/Searchtypes';
import type { Product } from '../components/ProductCard/types';

/**
 * Recorta um `Produto` do catálogo (`PRODUTOS_MOCK`) para o formato
 * `ProdutoBusca`, usado pela tela de Busca (Search). Espelha o adapter
 * `toProdutoBusca` do LOCATEM-WEB-REACT.
 */
export function toProdutoBusca(produto: Produto): ProdutoBusca {
  return {
    id: produto.id,
    title: produto.title,
    brand: produto.marca,
    category: produto.category,
    price: produto.price,
    images: produto.images,
    imageVerificado: produto.imageVerificado,
    imageNota: produto.imageNota,
    rating: produto.rating,
    reviewCount: produto.reviewCount,
    paymentMethods: produto.paymentMethods,
    available: produto.available,
    locador: produto.locador,
    localizacao: produto.localizacao,
    estoqueDisponivel: produto.estoqueDisponivel,
    voltagem: produto.voltagem,
  };
}

/**
 * Converte um `ProdutoBusca` para o formato `Product` esperado pelo
 * `ProductCard` já existente no app (usado hoje pela Home). Mantém a Busca
 * usando o mesmo card visual do resto do app, em vez de criar um componente
 * de card novo e duplicado.
 */
export function toLegacyProduct(produto: ProdutoBusca): Product {
  return {
    id: String(produto.id),
    imageUrl: produto.images[0],
    title: produto.title,
    storeName: produto.locador,
    // `price` no catálogo é uma string em formato BR ("15,00") — o card
    // legado formata o número recebido para moeda, então convertemos aqui.
    price: parseFloat(produto.price.replace(',', '.')) || 0,
    period: 'dia',
  };
}
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
    categoria: produto.category,
    avaliacaoLocador: produto.rating,
    numeroAvaliacoes: produto.reviewCount,
    localizacao: produto.localizacao,
    
  };
}
