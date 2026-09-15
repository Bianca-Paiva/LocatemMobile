import { useContext } from 'react';
import { PagamentoContext } from '../context/PagamentoContext';

export function usePagamentoStore() {
  const ctx = useContext(PagamentoContext);

  if (!ctx) {
    throw new Error('usePagamentoStore deve ser usado dentro de PagamentoProvider');
  }

  return ctx;
}
