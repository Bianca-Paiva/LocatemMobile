import { useContext } from 'react';
import { CarrinhoContext } from '../../context/Checkout/Carrinho/CarrinhoContext';

/** Acessa o estado global do carrinho e suas operacoes. */
export function useCarrinhoStore() {
  const ctx = useContext(CarrinhoContext);

  if (!ctx) {
    throw new Error('useCarrinhoStore deve ser usado dentro de CarrinhoProvider');
  }

  return ctx;
}
