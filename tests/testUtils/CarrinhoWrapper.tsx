import React from 'react';
import { CarrinhoProvider } from '../../src/context/Checkout/Carrinho/CarrinhoContext';

export function CarrinhoWrapper({ children }: { children: React.ReactNode }) {
  return <CarrinhoProvider>{children}</CarrinhoProvider>;
}
