/**
 * Detalhe da ferramenta: apresenta dados do produto e inicia fluxos de carrinho ou locacao.
 */
export interface SeletorQuantidadeProps {
  quantidade: number;
  estoqueDisponivel: number;
  onDecrementar: () => void;
  onIncrementar: () => void;
}