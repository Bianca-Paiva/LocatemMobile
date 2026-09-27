import React from 'react';
import { PagamentoProvider } from '../../src/context/Checkout/Pagamento/PagamentoContext';

export function PagamentoWrapper({ children }: { children: React.ReactNode }) {
  return <PagamentoProvider>{children}</PagamentoProvider>;
}
