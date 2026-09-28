/** Cenarios cobertos pelos testes de CarrinhoWrapper. */
import React from 'react';
import { CarrinhoProvider } from '../../src/context/Checkout/Carrinho/CarrinhoContext';

/** Envolve o teste no provider do carrinho. */
export function CarrinhoWrapper({ children }: { children: React.ReactNode }) {
  return <CarrinhoProvider>{children}</CarrinhoProvider>;
}
