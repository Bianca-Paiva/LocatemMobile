import type { Produto } from '../../../../types/Ferramentas/produto.types';

export interface CardFerramentaLojaProps {
  produto: Produto;
  favoritado: boolean;
  onToggleFavorito: (id: number) => void;
  onVerDetalhes: (produto: Produto) => void;
}
