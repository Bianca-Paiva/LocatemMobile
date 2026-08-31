import { createContext, useState } from 'react';
import type { ReactNode } from 'react';

import type { Produto } from '../types/produto.types';

export interface ItemCarrinho {
  id: string;
  produto: Produto;
  quantidade: number;
  /** Quantidade de dias de locação escolhida para este item */
  dias: number;
  /** Se o item participa da compra (subtotal/total). Ligado por padrão ao ser adicionado. */
  selecionado: boolean;
}

interface CarrinhoContextType {
  itens: ItemCarrinho[];
  adicionarItem: (produto: Produto, quantidade?: number, dias?: number) => void;
  removerItem: (id: string) => void;
  atualizarQuantidade: (id: string, quantidade: number) => void;
  atualizarDias: (id: string, dias: number) => void;
  alternarSelecao: (id: string) => void;
  selecionarTodos: (selecionado: boolean) => void;
  selecionarItens: (ids: string[], selecionado: boolean) => void;
}

export const CarrinhoContext = createContext<CarrinhoContextType | null>(null);

export function CarrinhoProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);

  // Só adiciona a ferramenta ao carrinho — não cria reserva, notificação nem
  // dispara nenhum fluxo de aprovação/pagamento, igual ao "Adicionar ao
  // carrinho" da versão Web.
  const adicionarItem = (produto: Produto, quantidade = 1, dias = 1) => {
    const novoItem: ItemCarrinho = {
      id: `c-${Date.now()}`,
      produto,
      quantidade,
      dias,
      selecionado: true,
    };
    setItens((atuais) => [novoItem, ...atuais]);
  };

  const removerItem = (id: string) => {
    setItens((atuais) => atuais.filter((item) => item.id !== id));
  };

  const atualizarQuantidade = (id: string, quantidade: number) => {
    if (quantidade < 1) return;
    setItens((atuais) =>
      atuais.map((item) => (item.id === id ? { ...item, quantidade } : item)),
    );
  };

  const atualizarDias = (id: string, dias: number) => {
    if (dias < 1) return;
    setItens((atuais) =>
      atuais.map((item) => (item.id === id ? { ...item, dias } : item)),
    );
  };

  const alternarSelecao = (id: string) => {
    setItens((atuais) =>
      atuais.map((item) => (item.id === id ? { ...item, selecionado: !item.selecionado } : item)),
    );
  };

  const selecionarTodos = (selecionado: boolean) => {
    setItens((atuais) => atuais.map((item) => ({ ...item, selecionado })));
  };

  const selecionarItens = (ids: string[], selecionado: boolean) => {
    const idsSelecionados = new Set(ids);
    setItens((atuais) =>
      atuais.map((item) => (idsSelecionados.has(item.id) ? { ...item, selecionado } : item)),
    );
  };

  return (
    <CarrinhoContext.Provider
      value={{
        itens,
        adicionarItem,
        removerItem,
        atualizarQuantidade,
        atualizarDias,
        alternarSelecao,
        selecionarTodos,
        selecionarItens,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}
