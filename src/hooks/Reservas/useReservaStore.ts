import { create } from 'zustand';

interface ReservaStore {
  reservas: any[];
  reservaSelecionada: any | null; // Novo estado para guardar a seleção
  adicionarReserva: (reserva: any) => any;
  setReservaSelecionada: (reserva: any | null) => void; // Nova função exigida pelo componente
}

export const useReservaStore = create<ReservaStore>((set) => ({
  reservas: [],
  reservaSelecionada: null, // Estado inicial

  adicionarReserva: (reserva) => {
    // 🚀 REGRA DE NEGÓCIO: Simulamos a criação de um ID único no "banco de dados"
    const novaReserva = { ...reserva, id: Math.random().toString(36).substr(2, 9) };
    
    set((state) => ({
      reservas: [...state.reservas, novaReserva]
    }));

    // Retornamos a nova reserva para que a ProductScreen possa usar o ID na notificação
    return novaReserva; 
  },

  // Implementação da função que faltava
  setReservaSelecionada: (reserva) => set({ reservaSelecionada: reserva }),
}));