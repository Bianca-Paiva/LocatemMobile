/**
 * Hook de locacoes: calcula estados, filtros e acoes dos fluxos de aluguel.
 */
import { useContext } from 'react';
import { LocacaoContext } from '../../context/Locacoes/LocacaoContext';

/** Acessa a store global de locacoes e suas operacoes. */
export function useLocacaoStore() {
  const ctx = useContext(LocacaoContext);

  if (!ctx) {
    throw new Error(
      'useLocacaoStore deve ser usado dentro de LocacaoProvider'
    );
  }

  return ctx;
}