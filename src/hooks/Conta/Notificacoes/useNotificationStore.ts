import { create } from 'zustand';
import type { NotificationData } from '../../../pages/Conta/Notificacoes/Notificacoes.types';
import { mockNotifications } from '../../../pages/Conta/Notificacoes/Notificacao.mock';

/**
 * Dados necessários pra criar uma notificação nova. `id` e `lida` são
 * preenchidos pelo store — quem chama `adicionarNotificacao` não escolhe o
 * id (evita colisão) e toda notificação nova sempre nasce como não lida.
 */
export type NovaNotificacao = Omit<NotificationData, 'id' | 'lida'>;

interface NotificationStore {
  notificacoes: NotificationData[];

  /** Cria uma notificação nova, sempre no topo da lista (mais recente primeiro). */
  adicionarNotificacao: (notificacao: NovaNotificacao) => void;

  /** Marca uma notificação específica como lida (idempotente). */
  marcarComoLida: (id: string) => void;

  /** Marca todas as notificações atuais como lidas. */
  marcarTodasComoLidas: () => void;

  /** Remove uma notificação específica (ex: ação "Renovar" concluída). */
  removerNotificacao: (id: string) => void;

  /** Remove todas as notificações. */
  limparTodas: () => void;
}

// Gera um id com baixa chance de colisão sem depender de nenhuma lib extra.
// A versão anterior usava só `Math.random().toString()`, que sozinho tem uma
// chance real de colidir em listas grandes; combinar com o timestamp reduz
// bastante esse risco sem precisar instalar `uuid` só pra isso.
function gerarId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Única fonte de verdade das notificações do usuário.
 *
 * ANTES desta reescrita, este store existia isolado do resto do app:
 * `adicionarNotificacao` era importado no ProductScreen, mas a tela de
 * Notificações (`useNotifications`) lia de um array mockado local — sem
 * nenhuma relação com este store. Ou seja, qualquer notificação "criada"
 * por aqui nunca aparecia de verdade pro usuário (e, na prática, nem
 * chegava a ser criada: `adicionarNotificacao` era desestruturado no
 * ProductScreen mas nunca chamado).
 *
 * Agora este store é a única fonte de verdade: `useNotifications` (o hook
 * usado pela tela) consome os dados diretamente daqui, então qualquer
 * chamada real a `adicionarNotificacao` — vinda de onde for no app — passa
 * a aparecer corretamente na tela de Notificações.
 */
export const useNotificationStore = create<NotificationStore>((set) => ({
  notificacoes: mockNotifications,

  adicionarNotificacao: (notificacao) => set((state) => ({
    notificacoes: [
      { ...notificacao, id: gerarId(), lida: false }, // mais recente primeiro
      ...state.notificacoes,
    ],
  })),

  marcarComoLida: (id) => set((state) => ({
    notificacoes: state.notificacoes.map((notif) =>
      notif.id === id ? { ...notif, lida: true } : notif
    ),
  })),

  marcarTodasComoLidas: () => set((state) => ({
    notificacoes: state.notificacoes.map((notif) => ({ ...notif, lida: true })),
  })),

  removerNotificacao: (id) => set((state) => ({
    notificacoes: state.notificacoes.filter((notif) => notif.id !== id),
  })),

  limparTodas: () => set({ notificacoes: [] }),
}));
