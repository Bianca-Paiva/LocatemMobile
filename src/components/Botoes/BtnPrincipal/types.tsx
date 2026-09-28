/**
 * Botao reutilizavel: centraliza estilos e estados de interacao usados em varias telas.
 */
export interface BtnPrincipalProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}