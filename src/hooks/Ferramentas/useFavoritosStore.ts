import { useContext } from 'react';
import { FavoritosContext } from '../../context/Ferramentas/Favoritos/FavoritosContext';

export function useFavoritosStore() {
  const ctx = useContext(FavoritosContext);

  if (!ctx) {
    throw new Error('useFavoritosStore deve ser usado dentro de FavoritosProvider');
  }

  return ctx;
}
