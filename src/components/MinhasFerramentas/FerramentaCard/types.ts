import type { Ferramenta } from '../../../context/FerramentasContext';

export interface FerramentaCardProps {
  ferramenta: Ferramenta;
  onEditar: (id: string) => void;
  onRemover: (id: string) => void;
  onAlternarStatus: (id: string) => void;
}
