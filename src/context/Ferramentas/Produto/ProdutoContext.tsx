/**
 * Contexto do produto selecionado.
 * Mantem a ferramenta aberta na tela de detalhes para fluxos de locacao,
 * carrinho e componentes que precisam ler a mesma selecao.
 */
import { createContext, useState } from 'react';
import type { ReactNode } from 'react';

import type { Produto } from '../../../types/Ferramentas/produto.types';

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

/** Disponibiliza o produto selecionado e seus dados para as telas consumidoras. */
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
