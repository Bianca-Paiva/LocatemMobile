import { create } from 'zustand';

interface LocacaoStore {
  locacoes: any[];
  locacaoSelecionada: any | null; // Novo estado para guardar a seleção
  adicionarLocacao: (locacao: any) => any;
  setLocacaoSelecionada: (locacao: any | null) => void; // Nova função exigida pelo componente
}

export const useLocacaoStore = create<LocacaoStore>((set) => ({
  locacoes: [],
  locacaoSelecionada: null, // Estado inicial

  adicionarLocacao: (locacao) => {
    // 🚀 REGRA DE NEGÓCIO: Simulamos a criação de um ID único no "banco de dados"
    const novaLocacao = { ...locacao, id: Math.random().toString(36).substr(2, 9) };
    
    set((state) => ({
      locacoes: [...state.locacoes, novaLocacao]
    }));

    // Retornamos a nova locacao para que a ProductScreen possa usar o ID na notificação
    return novaLocacao; 
  },

  // Implementação da função que faltava
  setLocacaoSelecionada: (locacao) => set({ locacaoSelecionada: locacao }),
}));