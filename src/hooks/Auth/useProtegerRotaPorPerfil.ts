// Portado de LOCATEM-WEB-REACT/src/hooks/Auth/useProtegerRotaPorPerfil.ts
// (só o `useExigirPerfil`, que é o que a HomeLocador precisa).

import { useEffect } from 'react';

import { useAuth } from './useAuth';
import type { TipoUsuario } from '../../types/Auth/usuario.types';

/**
 * Protege telas EXCLUSIVAS de um tipo de usuário (ex: HomeLocador — só o
 * locador pode acessar).
 *
 * Bloqueia tanto o visitante não autenticado quanto o usuário autenticado de
 * outro tipo, redirecionando para `rotaFallback` (chave "legada" em minúsculo
 * aceita pelo `useLegacyNavigate` de routes/AppRoutes.tsx, ex: 'home').
 *
 * Uso:
 *   const acessoPermitido = useExigirPerfil(navigate, 'locador', 'home');
 *   if (!acessoPermitido) return null; // sempre DEPOIS de todos os hooks
 */
export function useExigirPerfil(
  navigate: (route: string) => void,
  tipoExigido: TipoUsuario,
  rotaFallback: string,
): boolean {
  const { usuario } = useAuth();
  const acessoPermitido = !!usuario && usuario.tipo === tipoExigido;

  useEffect(() => {
    if (!acessoPermitido) {
      navigate(rotaFallback);
    }
  }, [acessoPermitido, navigate, rotaFallback]);

  return acessoPermitido;
}
