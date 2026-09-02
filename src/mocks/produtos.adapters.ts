import type { Produto } from '../types/produto.types';
import type { ReservaData } from '../pages/Reservas/MinhasReservas/MinhasReservas.types';
import type { ProdutoBusca } from '../pages/Search/Searchtypes';
import type { Product } from '../components/ProductCard/types';
import type { ProdutoSemelhante } from '../pages/ProductScreen/components/ProdutoSemelhantes/types';
import { calcularResumoAvaliacoes } from '../utils/avaliacoesResumo';

/**
 * Recorta um `Produto` do catálogo (`PRODUTOS_MOCK`) para o formato
 * `ProdutoBusca`, usado pela tela de Busca (Search). Espelha o adapter
 * `toProdutoBusca` do LOCATEM-WEB-REACT.
 */
export function toProdutoBusca(produto: Produto): ProdutoBusca {
  return {
    id: produto.id,
    title: produto.title,
    marca: produto.marca,
    categoria: produto.categoria,
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

/**
 * Recorta um `Produto` do catálogo pro formato "de card" usado pela Home e
 * pela Busca (`ProductCard`). O `id` vem sempre do produto real do catálogo —
 * é ele que a tela de detalhes usa depois pra identificar qual ferramenta
 * carregar (ver `ProductScreen`).
 */
export function toProductCard(produto: Produto): Product {
  const precoNumerico =
    typeof produto.price === 'string'
      ? parseFloat(produto.price.replace(',', '.'))
      : produto.price;

  return {
    id: String(produto.id),
    imageUrl: produto.images[0],
    title: produto.title,
    storeName: produto.locador,
    price: Number.isNaN(precoNumerico) ? 0 : precoNumerico,
    period: 'dia',
  };
}

/**
 * Recorta um `Produto` do catálogo pro formato usado pela seção "Ferramentas
 * Semelhantes" da tela de detalhe. Mantém o `id` real do produto pra que,
 * ao clicar num card semelhante, a tela consiga buscar o produto completo
 * de novo no catálogo (ver `ProductScreen` -> `handleSemelhante`).
 */
export function toProdutoSemelhante(produto: Produto): ProdutoSemelhante {
  return {
    id: produto.id,
    title: produto.title,
    marca: produto.marca,
    price: produto.price,
    images: produto.images,
    imageVerificado: produto.imageVerificado,
    imageNota: produto.imageNota,
    rating: produto.rating,
    reviewCount: produto.reviewCount,
  };
}


