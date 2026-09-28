/**
 * Hook de autenticacao: expoe a sessao atual, login, logout
 * e atualizacao de perfil para telas e componentes.
 */
import { useContext } from 'react';
import { AuthContext } from '../../context/Auth/AuthContext';

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }

  return ctx;
}
