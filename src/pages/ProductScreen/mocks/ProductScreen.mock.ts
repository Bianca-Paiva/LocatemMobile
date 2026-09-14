import { PRODUTOS_MOCK } from '../../../mocks/produtos.mock';

/**
 * Produto exibido quando a tela é aberta sem um produto selecionado no
 * `useProdutoStore` (ex: acesso direto à rota, sem vir de um clique em
 * card). Os dados completos vêm sempre do catálogo central
 * (`src/mocks/produtos.mock.ts`) — mesmo padrão usado no Web
 * (ver `ProdutoDetalhe.mock.ts`), nunca um objeto solto e desatualizado.
 */
export const FALLBACK_PRODUTO = PRODUTOS_MOCK[0];
