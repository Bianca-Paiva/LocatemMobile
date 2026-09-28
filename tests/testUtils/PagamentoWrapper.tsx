/** Cenarios cobertos pelos testes de PagamentoWrapper. */
import React from 'react';
import { PagamentoProvider } from '../../src/context/Checkout/Pagamento/PagamentoContext';

/** Envolve o teste no provider de pagamento. */
export function PagamentoWrapper({ children }: { children: React.ReactNode }) {
  return <PagamentoProvider>{children}</PagamentoProvider>;
}
