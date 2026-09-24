import type { ProdutoBusca, FilterState } from '../../pages/Search/Searchtypes';

/**
 * Filtro principal da tela de Busca.
 *
 * Extraído de `SearchScreen.tsx` (onde vivia como lógica inline dentro de um
 * `useMemo`) para que possa ser testado isoladamente, sem precisar renderizar
 * nenhum componente React Native. A tela continua com o mesmo comportamento —
 * ela só chama esta função dentro do `useMemo`.
 *
 * Regras (todas combinadas com E — um produto só aparece se passar em TODAS
 * as regras abaixo):
 * - categorias/marcas/voltagens/faixaDePreço/formaDePagamento: se a lista de
 *   valores selecionados estiver vazia, o filtro é ignorado (não restringe).
 *   Se houver valores selecionados, o produto precisa corresponder a pelo
 *   menos um deles (correspondência "ou" dentro do próprio filtro).
 * - disponibilidade e avaliação mínima: comparação direta.
 * - busca por texto: compara (case-insensitive) com título, marca e
 *   categoria do produto.
 */
export function filtrarProdutos(
  produtos: ProdutoBusca[],
  filters: FilterState,
  search: string,
): ProdutoBusca[] {
  return produtos.filter((product) => matchesAllFilters(product, filters, search));
}

function matchesAllFilters(
  product: ProdutoBusca,
  filters: FilterState,
  search: string,
): boolean {
  if (filters.categories.length > 0 && !filters.categories.includes(product.categoria)) {
    return false;
  }

  if (filters.brands.length > 0 && !filters.brands.includes(product.marca)) {
    return false;
  }

  if (filters.brandSearch && !product.marca.toLowerCase().includes(filters.brandSearch.toLowerCase())) {
    return false;
  }

  if (filters.voltagens.length > 0) {
    if (!product.voltagem || !filters.voltagens.includes(product.voltagem)) return false;
  }

  if (filters.priceRanges.length > 0 && !matchesPriceRange(product.price, filters.priceRanges)) {
    return false;
  }

  if (filters.paymentMethods.length > 0) {
    const matchPayment = product.paymentMethods.some((method) =>
      filters.paymentMethods.includes(method)
    );
    if (!matchPayment) return false;
  }

  if (filters.availability) {
    if (filters.availability === 'Disponível para Aluguel' && !product.available) return false;
    if (filters.availability === 'Indisponível para Aluguel' && product.available) return false;
  }

  if (filters.minRating !== null && product.rating < filters.minRating) return false;

  if (search.trim() && !matchesSearchTerm(product, search)) return false;

  return true;
}

function matchesPriceRange(precoStr: string, priceRanges: string[]): boolean {
  const preco = parseFloat(precoStr.replace(',', '.'));

  // Preço inválido/não numérico nunca corresponde a nenhuma faixa — evita
  // que um produto com preço malformado apareça em todas as faixas por
  // causa de comparações com NaN.
  if (Number.isNaN(preco)) return false;

  return priceRanges.some((range) => {
    if (range === 'R$0 - R$50') return preco >= 0 && preco <= 50;
    if (range === 'R$51 - R$100') return preco >= 51 && preco <= 100;
    if (range === 'R$101 - R$200') return preco >= 101 && preco <= 200;
    if (range === 'R$201+') return preco > 200;
    return false;
  });
}

function matchesSearchTerm(product: ProdutoBusca, search: string): boolean {
  const termo = search.trim().toLowerCase();
  return (
    product.title.toLowerCase().includes(termo) ||
    product.marca.toLowerCase().includes(termo) ||
    product.categoria.toLowerCase().includes(termo)
  );
}
