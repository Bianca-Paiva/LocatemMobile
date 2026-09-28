/**
 * Componente de ferramentas: exibe cards, detalhes ou informacoes relacionadas a anuncios.
 */
import type { Ferramenta } from '../../../../context/Ferramentas/FerramentasContext';

export interface FerramentaCardProps {
  ferramenta: Ferramenta;
  onEditar: (id: string) => void;
  onRemover: (id: string) => void;
  onAlternarStatus: (id: string) => void;
}
