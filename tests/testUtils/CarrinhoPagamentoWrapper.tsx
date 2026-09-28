/** Cenarios cobertos pelos testes de CarrinhoPagamentoWrapper. */
import React from 'react';
import { CarrinhoProvider } from '../../src/context/Checkout/Carrinho/CarrinhoContext';
import { PagamentoProvider } from '../../src/context/Checkout/Pagamento/PagamentoContext';

/** Disponibiliza os providers de carrinho e pagamento durante o teste. */
export function CarrinhoPagamentoWrapper({ children }: { children: React.ReactNode }) {
  return (
    <CarrinhoProvider>
      <PagamentoProvider>{children}</PagamentoProvider>
    </CarrinhoProvider>
  );
}
