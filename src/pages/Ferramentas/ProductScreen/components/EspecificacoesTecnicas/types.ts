/**
 * Detalhe da ferramenta: apresenta dados do produto e inicia fluxos de carrinho ou locacao.
 */
export interface Especificacao {
  label: string;
  valor: string;
}

export interface EspecificacoesTecnicasProps {
  especificacoes: Especificacao[];
}