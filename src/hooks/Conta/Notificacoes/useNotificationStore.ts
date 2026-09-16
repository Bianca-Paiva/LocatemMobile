import { create } from 'zustand';

interface NotificationStore {
  notificacoes: any[];
  adicionarNotificacao: (notificacao: any) => void;
  marcarComoLida: (id: string) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notificacoes: [],

  adicionarNotificacao: (notificacao) => set((state) => ({
    notificacoes: [
      { ...notificacao, id: Math.random().toString(), lida: false },
      ...state.notificacoes // Adicionamos no INÍCIO da lista para ser a mais recente
    ]
  })),

  marcarComoLida: (id) => set((state) => ({
    notificacoes: state.notificacoes.map((notif) => 
      notif.id === id ? { ...notif, lida: true } : notif
    )
  }))
}));