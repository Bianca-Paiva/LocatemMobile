/** Cenarios cobertos pelos testes de useNotificationStore. */
import { act } from "react-test-renderer";
import { useNotificationStore } from "../../../../src/hooks/Conta/Notificacoes/useNotificationStore";
import { mockNotifications } from "../../../../src/pages/Conta/Notificacoes/Notificacao.mock";

const ESTADO_INICIAL = useNotificationStore.getState();

beforeEach(() => {
  act(() => {
    useNotificationStore.setState(ESTADO_INICIAL, false);
    useNotificationStore.setState({ notificacoes: [] }, false);
  });
});

// Cria um tipo apenas para o contexto dos testes
type DadosNotificacao = {
  titulo?: string;
  mensagem?: string;
  tipo?: string;
  data?: string;
  id?: string;
  lida?: boolean;
  [key: string]: any; // Permite propriedades extra
};

/** Cria dados de notificacao para os cenarios da store. */
function criarNotificacao(overrides: DadosNotificacao = {}) {
  return {
    titulo: "Locação aprovada",
    mensagem: "Sua locação foi aprovada.",
    tipo: "locacao",
    data: "2025-07-10",
    ...overrides,
  } as any; // O "as any" força o TypeScript a aceitar o objeto na chamada da store
}

describe("useNotificationStore", () => {
  it("inicia com as notificações mockadas (mockNotifications)", () => {
    act(() => useNotificationStore.setState(ESTADO_INICIAL, true));
    expect(useNotificationStore.getState().notificacoes).toEqual(
      mockNotifications,
    );
  });

  describe("adicionarNotificacao", () => {
    it("adiciona a notificação no topo da lista, com id gerado e lida=false", () => {
      act(() =>
        useNotificationStore
          .getState()
          .adicionarNotificacao(criarNotificacao({ titulo: "Nova" })),
      );

      const notificacoes = useNotificationStore.getState().notificacoes;
      expect(notificacoes).toHaveLength(1);
      expect((notificacoes[0] as any).titulo).toBe("Nova");
      expect(notificacoes[0].lida).toBe(false);
      expect(notificacoes[0].id).toEqual(expect.any(String));
    });

    it('mantém a ordem "mais recente primeiro"', () => {
      act(() => {
        useNotificationStore
          .getState()
          .adicionarNotificacao(criarNotificacao({ titulo: "Primeira" }));
        useNotificationStore
          .getState()
          .adicionarNotificacao(criarNotificacao({ titulo: "Segunda" }));
      });

      const notificacoes = useNotificationStore.getState().notificacoes;
      expect(notificacoes.map((n: any) => n.titulo)).toEqual([
        "Segunda",
        "Primeira",
      ]);
    });

    it("gera ids diferentes para notificações diferentes", () => {
      act(() => {
        useNotificationStore
          .getState()
          .adicionarNotificacao(criarNotificacao({ titulo: "A" }));
        useNotificationStore
          .getState()
          .adicionarNotificacao(criarNotificacao({ titulo: "B" }));
      });

      const [n1, n2] = useNotificationStore.getState().notificacoes;
      expect(n1.id).not.toBe(n2.id);
    });
  });

  describe("marcarComoLida", () => {
    it("marca apenas a notificação com o id correspondente", () => {
      act(() => {
        useNotificationStore
          .getState()
          .adicionarNotificacao(criarNotificacao({ titulo: "A" }));
        useNotificationStore
          .getState()
          .adicionarNotificacao(criarNotificacao({ titulo: "B" }));
      });

      const idA = useNotificationStore
        .getState()
        .notificacoes.find((n: any) => n.titulo === "A")!.id;

      act(() => useNotificationStore.getState().marcarComoLida(idA));

      const notificacoes = useNotificationStore.getState().notificacoes;
      expect(notificacoes.find((n) => n.id === idA)!.lida).toBe(true);
      expect(notificacoes.find((n: any) => n.titulo === "B")!.lida).toBe(false);
    });

    it("é idempotente — chamar de novo para o mesmo id não quebra nada", () => {
      act(() =>
        useNotificationStore
          .getState()
          .adicionarNotificacao(criarNotificacao()),
      );
      const id = useNotificationStore.getState().notificacoes[0].id;

      act(() => {
        useNotificationStore.getState().marcarComoLida(id);
        useNotificationStore.getState().marcarComoLida(id);
      });

      expect(useNotificationStore.getState().notificacoes[0].lida).toBe(true);
    });

    it("não faz nada quando o id não existe na lista", () => {
      act(() =>
        useNotificationStore
          .getState()
          .adicionarNotificacao(criarNotificacao()),
      );

      act(() =>
        useNotificationStore.getState().marcarComoLida("id-inexistente"),
      );

      expect(useNotificationStore.getState().notificacoes[0].lida).toBe(false);
    });
  });

  describe("marcarTodasComoLidas", () => {
    it("marca todas as notificações como lidas", () => {
      act(() => {
        useNotificationStore
          .getState()
          .adicionarNotificacao(criarNotificacao({ titulo: "A" }));
        useNotificationStore
          .getState()
          .adicionarNotificacao(criarNotificacao({ titulo: "B" }));
      });

      act(() => useNotificationStore.getState().marcarTodasComoLidas());

      expect(
        useNotificationStore.getState().notificacoes.every((n) => n.lida),
      ).toBe(true);
    });
  });

  describe("removerNotificacao", () => {
    it("remove apenas a notificação com o id correspondente", () => {
      act(() => {
        useNotificationStore
          .getState()
          .adicionarNotificacao(criarNotificacao({ titulo: "A" }));
        useNotificationStore
          .getState()
          .adicionarNotificacao(criarNotificacao({ titulo: "B" }));
      });

      const idA = useNotificationStore
        .getState()
        .notificacoes.find((n: any) => n.titulo === "A")!.id;

      act(() => useNotificationStore.getState().removerNotificacao(idA));

      const notificacoes = useNotificationStore.getState().notificacoes;
      expect(notificacoes).toHaveLength(1);
      expect((notificacoes[0] as any).titulo).toBe("B");
    });
  });

  describe("limparTodas", () => {
    it("remove todas as notificações", () => {
      act(() => {
        useNotificationStore
          .getState()
          .adicionarNotificacao(criarNotificacao({ titulo: "A" }));
        useNotificationStore
          .getState()
          .adicionarNotificacao(criarNotificacao({ titulo: "B" }));
      });

      act(() => useNotificationStore.getState().limparTodas());

      expect(useNotificationStore.getState().notificacoes).toEqual([]);
    });
  });
});
