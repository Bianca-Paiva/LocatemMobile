import { createContext, useState } from 'react';
import type { ReactNode } from 'react';

import type { Produto } from '../types/produto.types';

// ProdutoSelecionado agora é apenas um alias de Produto
export type ProdutoSelecionado = Produto;

interface ProdutoContextType {
  produtoSelecionado: ProdutoSelecionado | null;
  setProdutoSelecionado: (
    p: ProdutoSelecionado
  ) => void;
}

export const ProdutoContext =
  createContext<ProdutoContextType | null>(
    null
  );

export function ProdutoProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [
    produtoSelecionado,
    setProdutoSelecionado,
  ] =
    useState<ProdutoSelecionado | null>(
      null
    );

  return (
    <ProdutoContext.Provider
      value={{
        produtoSelecionado,
        setProdutoSelecionado,
      }}
    >
      {children}
    </ProdutoContext.Provider>
  );
}