import React from 'react';
import { CarrinhoProvider } from '../../src/context/Checkout/Carrinho/CarrinhoContext';
import { PagamentoProvider } from '../../src/context/Checkout/Pagamento/PagamentoContext';

export function CarrinhoPagamentoWrapper({ children }: { children: React.ReactNode }) {
  return (
    <CarrinhoProvider>
      <PagamentoProvider>{children}</PagamentoProvider>
    </CarrinhoProvider>
  );
}
