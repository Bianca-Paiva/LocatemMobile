/**
 * Hook de pagamento: controla estado e navegacao das etapas do checkout.
 */
import { useContext } from 'react';
import { PagamentoContext } from '../../../context/Checkout/Pagamento/PagamentoContext';

/** Acessa os dados globais e as acoes do fluxo de pagamento. */
export function usePagamentoStore() {
  const ctx = useContext(PagamentoContext);

  if (!ctx) {
    throw new Error('usePagamentoStore deve ser usado dentro de PagamentoProvider');
  }

  return ctx;
}
