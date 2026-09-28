/**
 * Detalhe da ferramenta: apresenta dados do produto e inicia fluxos de carrinho ou locacao.
 */
export interface TempoDropdownProps {
  value: string;
  onChange: (value: string) => void;
  onOpenChange?: (isOpen: boolean) => void;
}