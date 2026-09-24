import { filtrarProdutos } from '../../../src/utils/Busca/filtrarProdutos';
import type { FilterState, ProdutoBusca } from '../../../src/pages/Search/Searchtypes';
import { FILTROS_VAZIOS } from '../../../src/pages/Search/Searchtypes';

/**
 * ==========================================================================
 * ROTEIRO DE TESTES — Filtro principal da tela de Busca
 * (src/utils/Busca/filtrarProdutos.ts, usado por src/pages/Search/SearchScreen.tsx)
 * ==========================================================================
 * O cabeçalho documenta os cenários mapeados para garantir a cobertura total
 * da lógica de filtragem, divididos entre regras de negócios padrão e exceções (edge cases).
 */

// Função auxiliar (Factory Pattern) para gerar produtos "mockados" (falsos) para os testes.
// Ela recebe um objeto 'overrides' opcional para sobrescrever propriedades específicas,
// retornando um produto base válido. Isso evita a repetição de dezenas de linhas em cada teste.
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
    ...overrides, // Aplica as propriedades customizadas passadas no teste
  };
}

// Agrupamento principal dos testes da função filtrarProdutos
describe('filtrarProdutos', () => {
  // ---------- Cenários principais ----------

  it('retorna todos os produtos quando não há filtros nem busca', () => {
    const produtos = [criarProduto({ id: 1 }), criarProduto({ id: 2 })];
    // Ao passar FILTROS_VAZIOS e string vazia, a função não deve alterar a lista.
    const resultado = filtrarProdutos(produtos, FILTROS_VAZIOS, '');
    expect(resultado).toHaveLength(2);
  });

  it('filtra por categoria', () => {
    const produtos = [
      criarProduto({ id: 1, categoria: 'Ferramentas Elétricas' }),
      criarProduto({ id: 2, categoria: 'Jardinagem' }),
    ];
    // Simula o estado do filtro com a categoria 'Jardinagem' selecionada.
    const filters: FilterState = { ...FILTROS_VAZIOS, categories: ['Jardinagem'] };

    const resultado = filtrarProdutos(produtos, filters, '');

    // Espera que apenas o produto de id 2 seja retornado.
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

    // Verifica se a lista final contém apenas o ID do produto da marca filtrada.
    expect(resultado.map((p) => p.id)).toEqual([2]);
  });

  it('busca por texto no título', () => {
    const produtos = [
      criarProduto({ id: 1, title: 'Furadeira de Impacto' }),
      criarProduto({ id: 2, title: 'Serra Circular' }),
    ];

    // Simula o input do usuário na barra de busca digitando "furadeira".
    const resultado = filtrarProdutos(produtos, FILTROS_VAZIOS, 'furadeira');

    expect(resultado.map((p) => p.id)).toEqual([1]);
  });

  it('busca por texto encontra também por marca ou categoria, não só título', () => {
    const produtos = [
      criarProduto({ id: 1, title: 'Furadeira', marca: 'Bosch', categoria: 'Elétricas' }),
      criarProduto({ id: 2, title: 'Serra', marca: 'DeWalt', categoria: 'Elétricas' }),
    ];

    // O termo "bosch" não está no título, mas está na marca. Deve encontrar o ID 1.
    expect(filtrarProdutos(produtos, FILTROS_VAZIOS, 'bosch').map((p) => p.id)).toEqual([1]);
    
    // O termo "elétricas" está na categoria de ambos. Deve encontrar os IDs 1 e 2.
    expect(filtrarProdutos(produtos, FILTROS_VAZIOS, 'elétricas').map((p) => p.id)).toEqual([1, 2]);
  });

  it('filtra por faixa de preço', () => {
    const produtos = [
      criarProduto({ id: 1, price: '30,00' }),   // Encaixa em R$0 - R$50
      criarProduto({ id: 2, price: '80,00' }),   // Encaixa em R$51 - R$100
      criarProduto({ id: 3, price: '250,00' }),  // Encaixa em R$201+
    ];
    const filters: FilterState = { ...FILTROS_VAZIOS, priceRanges: ['R$0 - R$50'] };

    // Garante que o parser de string monetária funciona e filtra corretamente a faixa escolhida.
    expect(filtrarProdutos(produtos, filters, '').map((p) => p.id)).toEqual([1]);
  });

  it('filtra por forma de pagamento (lógica OU dentro do filtro)', () => {
    const produtos = [
      criarProduto({ id: 1, paymentMethods: ['Pix'] }),
      criarProduto({ id: 2, paymentMethods: ['Cartão de Débito'] }),
    ];
    const filters: FilterState = { ...FILTROS_VAZIOS, paymentMethods: ['Pix'] };

    // Produto só precisa ter 'Pix' incluso no seu array de métodos de pagamento.
    expect(filtrarProdutos(produtos, filters, '').map((p) => p.id)).toEqual([1]);
  });

  it('filtra por disponibilidade', () => {
    const produtos = [
      criarProduto({ id: 1, available: true }),
      criarProduto({ id: 2, available: false }),
    ];

    // Testa os dois fluxos possíveis do filtro booleano de disponibilidade.
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
    // Se o filtro pede mínimo 3, deve incluir produtos com rating 3 ou mais.
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
      // ID 1: Bate categoria, marca, e o rating (5 > 4).
      criarProduto({ id: 1, categoria: 'Elétricas', marca: 'Bosch', rating: 5, available: true }),
      // ID 2: Falha no rating (2 < 4).
      criarProduto({ id: 2, categoria: 'Elétricas', marca: 'Bosch', rating: 2, available: true }),
      // ID 3: Falha na categoria (Jardinagem !== Elétricas).
      criarProduto({ id: 3, categoria: 'Jardinagem', marca: 'Bosch', rating: 5, available: true }),
    ];
    
    // Todos os critérios abaixo devem ser satisfeitos simultaneamente.
    const filters: FilterState = {
      ...FILTROS_VAZIOS,
      categories: ['Elétricas'],
      brands: ['Bosch'],
      minRating: 4,
    };

    expect(filtrarProdutos(produtos, filters, '').map((p) => p.id)).toEqual([1]);
  });

  // ---------- Edge cases (Casos limites e validações de segurança) ----------

  it('lista de produtos vazia sempre retorna vazio', () => {
    // Garante que a função não quebre (lançando erros) ao receber um array sem itens.
    expect(filtrarProdutos([], FILTROS_VAZIOS, 'qualquer coisa')).toEqual([]);
  });

  it('ignora espaços nas pontas do termo de busca', () => {
    const produtos = [criarProduto({ id: 1, title: 'Furadeira' })];
    // A função deve aplicar .trim() internamente.
    expect(filtrarProdutos(produtos, FILTROS_VAZIOS, '  furadeira  ')).toHaveLength(1);
  });

  it('busca por texto é case-insensitive', () => {
    const produtos = [criarProduto({ id: 1, title: 'Furadeira de Impacto' })];
    // Maiúsculas e minúsculas não devem afetar o match.
    expect(filtrarProdutos(produtos, FILTROS_VAZIOS, 'FURADEIRA')).toHaveLength(1);
    expect(filtrarProdutos(produtos, FILTROS_VAZIOS, 'FuRaDeIrA')).toHaveLength(1);
  });

  it('termo de busca vazio ou só com espaços não filtra por texto', () => {
    const produtos = [criarProduto({ id: 1 }), criarProduto({ id: 2, title: 'Outro produto' })];
    // Trata strings vazias ou compostas só de espaços como ausência de busca.
    expect(filtrarProdutos(produtos, FILTROS_VAZIOS, '')).toHaveLength(2);
    expect(filtrarProdutos(produtos, FILTROS_VAZIOS, '   ')).toHaveLength(2);
  });

  it('múltiplas marcas selecionadas usam lógica OU entre elas', () => {
    const produtos = [
      criarProduto({ id: 1, marca: 'Bosch' }),
      criarProduto({ id: 2, marca: 'DeWalt' }),
      criarProduto({ id: 3, marca: 'Makita' }),
    ];
    // O usuário clicou no checkbox da Bosch e da Makita.
    const filters: FilterState = { ...FILTROS_VAZIOS, brands: ['Bosch', 'Makita'] };

    expect(filtrarProdutos(produtos, filters, '').map((p) => p.id)).toEqual([1, 3]);
  });

  it('brandSearch (campo de texto do drawer) filtra por marca mesmo sem brands selecionadas', () => {
    const produtos = [
      criarProduto({ id: 1, marca: 'Bosch' }),
      criarProduto({ id: 2, marca: 'DeWalt' }),
    ];
    // Testa o campo de busca rápido exclusivo para marcas no menu lateral (drawer).
    const filters: FilterState = { ...FILTROS_VAZIOS, brandSearch: 'de' };

    // "de" bate em "DeWalt" (case-insensitive), não em "Bosch"
    expect(filtrarProdutos(produtos, filters, '').map((p) => p.id)).toEqual([2]);
  });

  it('produto sem voltagem nunca aparece quando o filtro de voltagem está ativo', () => {
    const produtos = [
      criarProduto({ id: 1, voltagem: undefined }), // Produto sem informação (bivolt, manual, etc)
      criarProduto({ id: 2, voltagem: '220V' }),
    ];
    const filters: FilterState = { ...FILTROS_VAZIOS, voltagens: ['220V'] };

    // Evita falsos positivos para produtos que não possuem a propriedade.
    expect(filtrarProdutos(produtos, filters, '').map((p) => p.id)).toEqual([2]);
  });

  it('respeita os limites exatos de cada faixa de preço (bordas)', () => {
    const produtos = [
      criarProduto({ id: 1, price: '50,00' }),   // borda limite superior da faixa 0-50
      criarProduto({ id: 2, price: '51,00' }),   // borda limite inferior da faixa 51-100
      criarProduto({ id: 3, price: '200,00' }),  // borda limite superior da faixa 101-200
      criarProduto({ id: 4, price: '201,00' }),  // borda limite inferior da faixa 201+
    ];

    // Testa estritamente a matemática das condicionais >= e <= do filtro.
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
    // Garante que o sistema converte a string '89,90' para o número 89.90 internamente.
    const produtos = [criarProduto({ id: 1, price: '89,90' })];
    const filters: FilterState = { ...FILTROS_VAZIOS, priceRanges: ['R$51 - R$100'] };

    expect(filtrarProdutos(produtos, filters, '')).toHaveLength(1);
  });

  it('minRating inclui corretamente produto com rating 0 quando o filtro também é 0 ou não é usado', () => {
    const produtos = [criarProduto({ id: 1, rating: 0 })];

    // Se não há filtro ativo, o produto nota 0 deve aparecer.
    expect(filtrarProdutos(produtos, FILTROS_VAZIOS, '')).toHaveLength(1);
    
    // Se o usuário exigir nota 1+, o nota 0 é cortado.
    expect(
      filtrarProdutos(produtos, { ...FILTROS_VAZIOS, minRating: 1 }, '')
    ).toHaveLength(0);
  });

  it('campos de filtro com array vazio não restringem o resultado', () => {
    const produtos = [criarProduto({ id: 1 }), criarProduto({ id: 2 })];
    // Se uma categoria de filtro existe mas está vazia [], o código deve ignorá-la 
    // em vez de procurar produtos com propriedades vazias.
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