import { filtrarProdutos } from '../filtrarProdutos';
import type { FilterState, ProdutoBusca } from '../../../pages/Search/Searchtypes';
import { FILTROS_VAZIOS } from '../../../pages/Search/Searchtypes';

/**
 * ==========================================================================
 * ROTEIRO DE TESTES — Filtro principal da tela de Busca
 * (src/utils/Busca/filtrarProdutos.ts, usado por src/pages/Search/SearchScreen.tsx)
 * ==========================================================================
 *
 * CENÁRIOS PRINCIPAIS
 *  1. Sem nenhum filtro e sem busca -> retorna todos os produtos.
 *  2. Filtro por categoria -> retorna só produtos daquela categoria.
 *  3. Filtro por marca -> retorna só produtos daquela marca.
 *  4. Busca por texto -> compara com título, marca e categoria (case-insensitive).
 *  5. Filtro por faixa de preço -> respeita os limites de cada faixa.
 *  6. Filtro por forma de pagamento -> produto precisa aceitar ao menos uma das formas selecionadas.
 *  7. Filtro por disponibilidade (Disponível / Indisponível para Aluguel).
 *  8. Filtro por avaliação mínima.
 *  9. Filtro por voltagem.
 * 10. Combinação de múltiplos filtros ao mesmo tempo (todos precisam bater — lógica E).
 *
 * EDGE CASES
 * 11. Lista de produtos vazia -> sempre retorna vazio, com qualquer filtro.
 * 12. Termo de busca com espaços nas pontas -> ignora os espaços (trim).
 * 13. Termo de busca com letras maiúsculas/minúsculas misturadas -> case-insensitive.
 * 14. Termo de busca vazio ou só com espaços -> não filtra por texto (comporta-se como se não houvesse busca).
 * 15. Filtro de marca com múltiplas marcas selecionadas -> lógica OU entre elas.
 * 16. `brandSearch` (campo de busca de marca dentro do drawer) combinado com `brands` selecionadas.
 * 17. Produto sem campo `voltagem` (undefined) -> nunca aparece quando o filtro de voltagem está ativo.
 * 18. Preço exatamente na borda de uma faixa (R$50,00 / R$51,00 / R$200,00 / R$201,00).
 * 19. Preço com vírgula decimal (formato BR, ex: "89,90").
 * 20. `minRating` combinado com produto de rating 0.
 * 21. Nenhum filtro selecionado em um campo de lista (array vazio) -> não restringe esse campo.
 * ==========================================================================
 */

function criarProduto(overrides: Partial<ProdutoBusca> = {}): ProdutoBusca {
  return {
    id: 1,
    title: 'Furadeira de Impacto',
    marca: 'Bosch',
    categoria: 'Ferramentas Elétricas',
    price: '150,00',
    images: [],
    imageVerificado: {} as any,
    imageNota: {} as any,
    rating: 4,
    reviewCount: 10,
    paymentMethods: ['Cartão de Crédito', 'Pix'],
    available: true,
    locador: 'Loja do João',
    localizacao: 'São Paulo, SP',
    estoqueDisponivel: 3,
    voltagem: '220V',
    ...overrides,
  };
}

describe('filtrarProdutos', () => {
  // ---------- Cenários principais ----------

  it('retorna todos os produtos quando não há filtros nem busca', () => {
    const produtos = [criarProduto({ id: 1 }), criarProduto({ id: 2 })];
    const resultado = filtrarProdutos(produtos, FILTROS_VAZIOS, '');
    expect(resultado).toHaveLength(2);
  });

  it('filtra por categoria', () => {
    const produtos = [
      criarProduto({ id: 1, categoria: 'Ferramentas Elétricas' }),
      criarProduto({ id: 2, categoria: 'Jardinagem' }),
    ];
    const filters: FilterState = { ...FILTROS_VAZIOS, categories: ['Jardinagem'] };

    const resultado = filtrarProdutos(produtos, filters, '');

    expect(resultado).toHaveLength(1);
    expect(resultado[0].id).toBe(2);
  });

  it('filtra por marca', () => {
    const produtos = [
      criarProduto({ id: 1, marca: 'Bosch' }),
      criarProduto({ id: 2, marca: 'DeWalt' }),
    ];
    const filters: FilterState = { ...FILTROS_VAZIOS, brands: ['DeWalt'] };

    const resultado = filtrarProdutos(produtos, filters, '');

    expect(resultado.map((p) => p.id)).toEqual([2]);
  });

  it('busca por texto no título', () => {
    const produtos = [
      criarProduto({ id: 1, title: 'Furadeira de Impacto' }),
      criarProduto({ id: 2, title: 'Serra Circular' }),
    ];

    const resultado = filtrarProdutos(produtos, FILTROS_VAZIOS, 'furadeira');

    expect(resultado.map((p) => p.id)).toEqual([1]);
  });

  it('busca por texto encontra também por marca ou categoria, não só título', () => {
    const produtos = [
      criarProduto({ id: 1, title: 'Furadeira', marca: 'Bosch', categoria: 'Elétricas' }),
      criarProduto({ id: 2, title: 'Serra', marca: 'DeWalt', categoria: 'Elétricas' }),
    ];

    // "bosch" só aparece na marca do produto 1
    expect(filtrarProdutos(produtos, FILTROS_VAZIOS, 'bosch').map((p) => p.id)).toEqual([1]);
    // "elétricas" aparece na categoria dos dois
    expect(filtrarProdutos(produtos, FILTROS_VAZIOS, 'elétricas').map((p) => p.id)).toEqual([1, 2]);
  });

  it('filtra por faixa de preço', () => {
    const produtos = [
      criarProduto({ id: 1, price: '30,00' }),   // R$0 - R$50
      criarProduto({ id: 2, price: '80,00' }),   // R$51 - R$100
      criarProduto({ id: 3, price: '250,00' }),  // R$201+
    ];
    const filters: FilterState = { ...FILTROS_VAZIOS, priceRanges: ['R$0 - R$50'] };

    expect(filtrarProdutos(produtos, filters, '').map((p) => p.id)).toEqual([1]);
  });

  it('filtra por forma de pagamento (lógica OU dentro do filtro)', () => {
    const produtos = [
      criarProduto({ id: 1, paymentMethods: ['Pix'] }),
      criarProduto({ id: 2, paymentMethods: ['Cartão de Débito'] }),
    ];
    const filters: FilterState = { ...FILTROS_VAZIOS, paymentMethods: ['Pix'] };

    expect(filtrarProdutos(produtos, filters, '').map((p) => p.id)).toEqual([1]);
  });

  it('filtra por disponibilidade', () => {
    const produtos = [
      criarProduto({ id: 1, available: true }),
      criarProduto({ id: 2, available: false }),
    ];

    const disponiveis: FilterState = { ...FILTROS_VAZIOS, availability: 'Disponível para Aluguel' };
    const indisponiveis: FilterState = { ...FILTROS_VAZIOS, availability: 'Indisponível para Aluguel' };

    expect(filtrarProdutos(produtos, disponiveis, '').map((p) => p.id)).toEqual([1]);
    expect(filtrarProdutos(produtos, indisponiveis, '').map((p) => p.id)).toEqual([2]);
  });

  it('filtra por avaliação mínima', () => {
    const produtos = [
      criarProduto({ id: 1, rating: 5 }),
      criarProduto({ id: 2, rating: 3 }),
      criarProduto({ id: 3, rating: 2 }),
    ];
    const filters: FilterState = { ...FILTROS_VAZIOS, minRating: 3 };

    expect(filtrarProdutos(produtos, filters, '').map((p) => p.id)).toEqual([1, 2]);
  });

  it('filtra por voltagem', () => {
    const produtos = [
      criarProduto({ id: 1, voltagem: '220V' }),
      criarProduto({ id: 2, voltagem: '127V' }),
    ];
    const filters: FilterState = { ...FILTROS_VAZIOS, voltagens: ['127V'] };

    expect(filtrarProdutos(produtos, filters, '').map((p) => p.id)).toEqual([2]);
  });

  it('combina múltiplos filtros com lógica E (todos precisam bater)', () => {
    const produtos = [
      criarProduto({ id: 1, categoria: 'Elétricas', marca: 'Bosch', rating: 5, available: true }),
      criarProduto({ id: 2, categoria: 'Elétricas', marca: 'Bosch', rating: 2, available: true }),
      criarProduto({ id: 3, categoria: 'Jardinagem', marca: 'Bosch', rating: 5, available: true }),
    ];
    const filters: FilterState = {
      ...FILTROS_VAZIOS,
      categories: ['Elétricas'],
      brands: ['Bosch'],
      minRating: 4,
    };

    expect(filtrarProdutos(produtos, filters, '').map((p) => p.id)).toEqual([1]);
  });

  // ---------- Edge cases ----------

  it('lista de produtos vazia sempre retorna vazio', () => {
    expect(filtrarProdutos([], FILTROS_VAZIOS, 'qualquer coisa')).toEqual([]);
  });

  it('ignora espaços nas pontas do termo de busca', () => {
    const produtos = [criarProduto({ id: 1, title: 'Furadeira' })];
    expect(filtrarProdutos(produtos, FILTROS_VAZIOS, '  furadeira  ')).toHaveLength(1);
  });

  it('busca por texto é case-insensitive', () => {
    const produtos = [criarProduto({ id: 1, title: 'Furadeira de Impacto' })];
    expect(filtrarProdutos(produtos, FILTROS_VAZIOS, 'FURADEIRA')).toHaveLength(1);
    expect(filtrarProdutos(produtos, FILTROS_VAZIOS, 'FuRaDeIrA')).toHaveLength(1);
  });

  it('termo de busca vazio ou só com espaços não filtra por texto', () => {
    const produtos = [criarProduto({ id: 1 }), criarProduto({ id: 2, title: 'Outro produto' })];
    expect(filtrarProdutos(produtos, FILTROS_VAZIOS, '')).toHaveLength(2);
    expect(filtrarProdutos(produtos, FILTROS_VAZIOS, '   ')).toHaveLength(2);
  });

  it('múltiplas marcas selecionadas usam lógica OU entre elas', () => {
    const produtos = [
      criarProduto({ id: 1, marca: 'Bosch' }),
      criarProduto({ id: 2, marca: 'DeWalt' }),
      criarProduto({ id: 3, marca: 'Makita' }),
    ];
    const filters: FilterState = { ...FILTROS_VAZIOS, brands: ['Bosch', 'Makita'] };

    expect(filtrarProdutos(produtos, filters, '').map((p) => p.id)).toEqual([1, 3]);
  });

  it('brandSearch (campo de texto do drawer) filtra por marca mesmo sem brands selecionadas', () => {
    const produtos = [
      criarProduto({ id: 1, marca: 'Bosch' }),
      criarProduto({ id: 2, marca: 'DeWalt' }),
    ];
    const filters: FilterState = { ...FILTROS_VAZIOS, brandSearch: 'de' };

    // "de" bate em "DeWalt" (case-insensitive), não em "Bosch"
    expect(filtrarProdutos(produtos, filters, '').map((p) => p.id)).toEqual([2]);
  });

  it('produto sem voltagem nunca aparece quando o filtro de voltagem está ativo', () => {
    const produtos = [
      criarProduto({ id: 1, voltagem: undefined }),
      criarProduto({ id: 2, voltagem: '220V' }),
    ];
    const filters: FilterState = { ...FILTROS_VAZIOS, voltagens: ['220V'] };

    expect(filtrarProdutos(produtos, filters, '').map((p) => p.id)).toEqual([2]);
  });

  it('respeita os limites exatos de cada faixa de preço (bordas)', () => {
    const produtos = [
      criarProduto({ id: 1, price: '50,00' }),   // borda de cima da faixa 0-50
      criarProduto({ id: 2, price: '51,00' }),   // borda de baixo da faixa 51-100
      criarProduto({ id: 3, price: '200,00' }),  // borda de cima da faixa 101-200
      criarProduto({ id: 4, price: '201,00' }),  // borda de baixo da faixa 201+
    ];

    expect(
      filtrarProdutos(produtos, { ...FILTROS_VAZIOS, priceRanges: ['R$0 - R$50'] }, '').map((p) => p.id)
    ).toEqual([1]);
    expect(
      filtrarProdutos(produtos, { ...FILTROS_VAZIOS, priceRanges: ['R$51 - R$100'] }, '').map((p) => p.id)
    ).toEqual([2]);
    expect(
      filtrarProdutos(produtos, { ...FILTROS_VAZIOS, priceRanges: ['R$101 - R$200'] }, '').map((p) => p.id)
    ).toEqual([3]);
    expect(
      filtrarProdutos(produtos, { ...FILTROS_VAZIOS, priceRanges: ['R$201+'] }, '').map((p) => p.id)
    ).toEqual([4]);
  });

  it('interpreta corretamente preço no formato BR (vírgula decimal)', () => {
    const produtos = [criarProduto({ id: 1, price: '89,90' })];
    const filters: FilterState = { ...FILTROS_VAZIOS, priceRanges: ['R$51 - R$100'] };

    expect(filtrarProdutos(produtos, filters, '')).toHaveLength(1);
  });

  it('minRating inclui corretamente produto com rating 0 quando o filtro também é 0 ou não é usado', () => {
    const produtos = [criarProduto({ id: 1, rating: 0 })];

    expect(filtrarProdutos(produtos, FILTROS_VAZIOS, '')).toHaveLength(1);
    expect(
      filtrarProdutos(produtos, { ...FILTROS_VAZIOS, minRating: 1 }, '')
    ).toHaveLength(0);
  });

  it('campos de filtro com array vazio não restringem o resultado', () => {
    const produtos = [criarProduto({ id: 1 }), criarProduto({ id: 2 })];
    const filters: FilterState = {
      ...FILTROS_VAZIOS,
      categories: [],
      brands: [],
      voltagens: [],
      priceRanges: [],
      paymentMethods: [],
    };

    expect(filtrarProdutos(produtos, filters, '')).toHaveLength(2);
  });
});
