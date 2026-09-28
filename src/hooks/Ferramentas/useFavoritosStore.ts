/**
 * Hook de favoritos: entrega a lista de ferramentas salvas
 * e as acoes para favoritar ou remover itens.
 */
import { useContext } from 'react';
import { FavoritosContext } from '../../context/Ferramentas/Favoritos/FavoritosContext';

export function useFavoritosStore() {
  const ctx = useContext(FavoritosContext);

  if (!ctx) {
    throw new Error('useFavoritosStore deve ser usado dentro de FavoritosProvider');
  }

  return ctx;
}
