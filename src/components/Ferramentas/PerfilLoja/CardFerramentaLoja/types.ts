/**
 * Componente de ferramentas: exibe cards, detalhes ou informacoes relacionadas a anuncios.
 */
import type { Produto } from '../../../../types/Ferramentas/produto.types';

export interface CardFerramentaLojaProps {
  produto: Produto;
  favoritado: boolean;
  onToggleFavorito: (id: number) => void;
  onVerDetalhes: (produto: Produto) => void;
}
