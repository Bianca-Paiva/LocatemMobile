import { create } from 'zustand';

interface ReservaStore {
  reservas: any[];
  adicionarReserva: (reserva: any) => any;
}

export const useReservaStore = create<ReservaStore>((set) => ({
  reservas: [],

  adicionarReserva: (reserva) => {
    // 🚀 REGRA DE NEGÓCIO: Simulamos a criação de um ID único no "banco de dados"
    const novaReserva = { ...reserva, id: Math.random().toString(36).substr(2, 9) };
    
    set((state) => ({
      reservas: [...state.reservas, novaReserva]
    }));

    // Retornamos a nova reserva para que a ProductScreen possa usar o ID na notificação
    return novaReserva; 
  },
}));