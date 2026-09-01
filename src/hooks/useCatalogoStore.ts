import { useContext } from 'react';
import { CatalogoContext } from '../context/CatalogoContext';

/**
 * Hook de acesso ao catálogo central de ferramentas (CatalogoContext).
 * Espelha o `useCatalogoStore` do LOCATEM-WEB-REACT: mesma fonte única de
 * verdade do catálogo, reaproveitada pela Home, pela Busca e por qualquer
 * outra tela que precise listar/filtrar produtos.
 */
export function useCatalogoStore() {
  const ctx = useContext(CatalogoContext);

  if (!ctx) {
    throw new Error('useCatalogoStore deve ser usado dentro de CatalogoProvider');
  }

  return ctx;
}
