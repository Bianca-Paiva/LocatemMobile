import { create } from 'zustand';

// 🚀 ARQUITETURA: Definimos o contrato do estado para blindar a aplicação de erros.
interface ProdutoStore {
  produtoSelecionado: any | null; // Idealmente tipado com a interface 'Product'
  setProdutoSelecionado: (produto: any) => void;
  limparSelecao: () => void;
}

export const useProdutoStore = create<ProdutoStore>((set) => ({
  produtoSelecionado: null,

  // Atualiza a memória global instantaneamente
  setProdutoSelecionado: (produto) => set({ produtoSelecionado: produto }),

  // Ação de limpeza para liberar memória RAM quando o usuário sair do fluxo
  limparSelecao: () => set({ produtoSelecionado: null }),
}));
