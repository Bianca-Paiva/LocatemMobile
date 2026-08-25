import { create } from 'zustand';

// 🚀 ARQUITETURA: Estrutura de um item dentro do carrinho
interface CarrinhoItem {
  id: string;
  produto: any;
  dadosReserva: any;
}

interface CarrinhoStore {
  itens: CarrinhoItem[];
  adicionarItem: (produto: any, dadosReserva: any) => void;
  removerItem: (id: string) => void;
  limparCarrinho: () => void;
}

export const useCarrinhoStore = create<CarrinhoStore>((set) => ({
  itens: [],

  adicionarItem: (produto, dadosReserva) => set((state) => ({
    // Pega os itens antigos (...state.itens) e adiciona o novo no final da lista
    itens: [
      ...state.itens, 
      { id: Math.random().toString(), produto, dadosReserva }
    ]
  })),

  removerItem: (id) => set((state) => ({
    itens: state.itens.filter((item) => item.id !== id)
  })),

  limparCarrinho: () => set({ itens: [] }),
}));