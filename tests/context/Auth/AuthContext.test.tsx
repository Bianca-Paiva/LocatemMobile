/** Cenarios cobertos pelos testes de AuthContext. */
import React from "react";
import { act, create } from "react-test-renderer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  AuthContext,
  AuthProvider,
} from "../../../src/context/Auth/AuthContext";
import { USUARIOS_MOCK } from "../../../src/mocks/usuarios.mock";

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
);

// React 19 + react-test-renderer: sem esta flag o act() emite avisos e pode
// não flushar corretamente os efeitos.
(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;

// O login para usuários mockados tem um delay artificial de 500ms
// (setTimeout) simulando uma chamada de rede. Usamos fake timers e
// avançamos esse delay explicitamente em vez de depender de timers reais.
jest.useFakeTimers();

const SESSAO_KEY = "@locatemMobile:sessaoUsuario";

const usuarioLocador = USUARIOS_MOCK.find((u) => u.tipo === "locador")!;
const usuarioLocatario = USUARIOS_MOCK.find((u) => u.tipo === "locatario")!;

/** Configura respostas simuladas de rede na ordem das chamadas. */
function mockFetch(...respostas: any[]) {
  const fn = jest.fn();
  respostas.forEach((r) => fn.mockResolvedValueOnce(r));
  (globalThis as any).fetch = fn;
  return fn;
}

/** Configura a chamada de rede para rejeitar com o erro informado. */
function mockFetchRejeitado(erro: Error) {
  const fn = jest.fn().mockRejectedValueOnce(erro);
  (globalThis as any).fetch = fn;
  return fn;
}

/** Componente auxiliar que renderiza o contexto sob teste e expoe seu estado. */
function Harness({ api }: { api: any }) {
  api.auth = React.useContext(AuthContext);
  return null;
}

let rendererAtual: any = null;

/** Monta o AuthProvider e aguarda a verificacao inicial da sessao terminar. */
async function montarProvider() {
  const api: any = {};
  let renderer: any;
  await act(async () => {
    renderer = create(
      <AuthProvider>
        <Harness api={api} />
      </AuthProvider>,
    );
  });

  // Espera o efeito de reautenticação (carregarSessao, assíncrono) concluir.
  for (
    let tentativas = 0;
    tentativas < 20 && api.auth?.isInitializing;
    tentativas += 1
  ) {
    await act(async () => {
      await Promise.resolve();
    });
  }

  rendererAtual = renderer;
  return { api, renderer };
}

/**
 * Chama auth.login(...) avançando manualmente o delay de 500ms simulado
 * para os usuários mockados, tudo dentro do MESMO `act(async () => ...)`,
 * para que o React flushe os `setState` disparados após o timer.
 * Retorna o resultado (ou propaga o erro) do login.
 */
async function chamarLogin(
  auth: any,
  email: string,
  senha: string,
): Promise<any> {
  let resultado: any;
  let erro: any;
  await act(async () => {
    const promise = auth.login(email, senha);
    jest.advanceTimersByTime(500);
    try {
      resultado = await promise;
    } catch (e) {
      erro = e;
    }
  });
  if (erro) throw erro;
  return resultado;
}

/**
 * Login que NÃO passa pelo delay dos mocks (caminho da API real ou
 * validações que rejeitam antes do timer). Captura o erro dentro do act
 * e o relança depois, evitando rejeição não tratada dentro do act().
 */
async function chamarLoginSemTimer(
  auth: any,
  email: string,
  senha: string,
): Promise<any> {
  let resultado: any;
  let erro: any;
  await act(async () => {
    try {
      resultado = await auth.login(email, senha);
    } catch (e) {
      erro = e;
    }
  });
  if (erro) throw erro;
  return resultado;
}

beforeEach(async () => {
  await AsyncStorage.clear();
  (globalThis as any).fetch = undefined;
});

afterEach(() => {
  if (rendererAtual) {
    act(() => rendererAtual.unmount());
    rendererAtual = null;
  }
  jest.clearAllTimers();
});

afterAll(() => {
  jest.useRealTimers();
});

describe("AuthProvider — estado inicial", () => {
  it("inicia sem usuário autenticado e isAuthenticated=false", async () => {
    const { api } = await montarProvider();
    expect(api.auth.usuario).toBeNull();
    expect(api.auth.isAuthenticated).toBe(false);
  });

  it("isInitializing vira false depois de checar o AsyncStorage", async () => {
    const { api } = await montarProvider();
    expect(api.auth.isInitializing).toBe(false);
  });

  it("reautentica automaticamente quando há uma sessão salva no AsyncStorage", async () => {
    await AsyncStorage.setItem(SESSAO_KEY, JSON.stringify(usuarioLocatario));

    const { api } = await montarProvider();

    expect(api.auth.usuario).toEqual(usuarioLocatario);
    expect(api.auth.isAuthenticated).toBe(true);
  });
});

describe("login — usuários mockados (USUARIOS_MOCK)", () => {
  it("autentica com sucesso um usuário mockado com a senha correta", async () => {
    const { api } = await montarProvider();

    const usuarioRetornado = await chamarLogin(
      api.auth,
      usuarioLocador.email,
      usuarioLocador.senha,
    );

    expect(usuarioRetornado).toEqual(usuarioLocador);
    expect(api.auth.usuario).toEqual(usuarioLocador);
    expect(api.auth.isAuthenticated).toBe(true);
  });

  it("normaliza o e-mail (trim + lowercase) ao autenticar", async () => {
    const { api } = await montarProvider();

    await chamarLogin(
      api.auth,
      `  ${usuarioLocador.email.toUpperCase()}  `,
      usuarioLocador.senha,
    );

    expect(api.auth.usuario?.email).toBe(usuarioLocador.email);
  });

  it("rejeita com senha incorreta para um usuário mockado existente", async () => {
    const { api } = await montarProvider();

    await expect(
      chamarLogin(api.auth, usuarioLocador.email, "senha-errada"),
    ).rejects.toThrow("E-mail ou senha inválidos.");

    expect(api.auth.usuario).toBeNull();
  });

  it("rejeita quando e-mail ou senha estão vazios", async () => {
    const { api } = await montarProvider();

    await expect(chamarLoginSemTimer(api.auth, "", "")).rejects.toThrow(
      "Informe e-mail e senha para continuar.",
    );
  });

  it("persiste a sessão no AsyncStorage após login bem-sucedido", async () => {
    const { api } = await montarProvider();

    await chamarLogin(api.auth, usuarioLocatario.email, usuarioLocatario.senha);

    const salvo = await AsyncStorage.getItem(SESSAO_KEY);
    expect(JSON.parse(salvo!)).toEqual(usuarioLocatario);
  });

  it("isAuthenticating fica true durante o login e volta a false ao final", async () => {
    const { api } = await montarProvider();

    let promise!: Promise<any>;
    await act(async () => {
      promise = api.auth.login(usuarioLocador.email, usuarioLocador.senha);
      // Deixa o setState síncrono do início do login ser flushado sem avançar o timer.
      await Promise.resolve();
    });

    expect(api.auth.isAuthenticating).toBe(true);

    await act(async () => {
      jest.advanceTimersByTime(500);
      await promise;
    });

    expect(api.auth.isAuthenticating).toBe(false);
  });
});

describe("login — fallback via API real (e-mail fora de USUARIOS_MOCK)", () => {
  it("autentica com sucesso quando a API retorna 200 com token e perfil", async () => {
    const perfil = {
      id: 99,
      nome: "Novo Usuário",
      email: "novo@exemplo.com",
      tipoUsuario: "Locatario",
      telefone: "11999998888",
      documento: "12345678900",
      endereco: "Rua X, 1",
      fotoUrl: "",
      desde: 2026,
      reputacao: {
        rating: 0,
        totalAvaliacoes: 0,
        locacoesConcluidas: 0,
        entregasNoPrazoPercentual: 0,
      },
    };

    mockFetch(
      { ok: true, json: async () => ({ token: "abc123" }) },
      { ok: true, json: async () => perfil },
    );

    const { api } = await montarProvider();

    const usuarioRetornado = await chamarLoginSemTimer(
      api.auth,
      "novo@exemplo.com",
      "qualquer-senha",
    );

    expect(usuarioRetornado.id).toBe("99");
    expect(usuarioRetornado.nome).toBe("Novo Usuário");
    expect(usuarioRetornado.token).toBe("abc123");
    expect(usuarioRetornado.tipo).toBe("locatario");
    expect(api.auth.isAuthenticated).toBe(true);
  });

  it("rejeita quando a API de login retorna erro (ok: false)", async () => {
    mockFetch({
      ok: false,
      json: async () => ({ mensagem: "Credenciais inválidas" }),
    });

    const { api } = await montarProvider();

    await expect(
      chamarLoginSemTimer(api.auth, "outro@exemplo.com", "senha123"),
    ).rejects.toThrow("Credenciais inválidas");

    expect(api.auth.usuario).toBeNull();
  });

  it("rejeita quando a API de login falha sem mensagem específica", async () => {
    mockFetch({ ok: false, json: async () => ({}) });

    const { api } = await montarProvider();

    await expect(
      chamarLoginSemTimer(api.auth, "outro@exemplo.com", "senha123"),
    ).rejects.toThrow("E-mail ou senha inválidos.");
  });

  it("rejeita quando o perfil do usuário não pode ser carregado após o login", async () => {
    mockFetch(
      { ok: true, json: async () => ({ token: "abc123" }) },
      { ok: false, json: async () => ({}) },
    );

    const { api } = await montarProvider();

    await expect(
      chamarLoginSemTimer(api.auth, "outro@exemplo.com", "senha123"),
    ).rejects.toThrow("Não foi possível carregar os dados do usuário.");
  });

  it("propaga um erro genérico quando a rede falha (fetch rejeita)", async () => {
    mockFetchRejeitado(new Error("Network request failed"));

    const { api } = await montarProvider();

    await expect(
      chamarLoginSemTimer(api.auth, "outro@exemplo.com", "senha123"),
    ).rejects.toThrow("Network request failed");
  });
});

describe("logout", () => {
  it("limpa o usuário autenticado e a sessão persistida", async () => {
    const { api } = await montarProvider();

    await chamarLogin(api.auth, usuarioLocador.email, usuarioLocador.senha);
    expect(api.auth.isAuthenticated).toBe(true);

    await act(async () => {
      api.auth.logout();
      await Promise.resolve();
    });

    expect(api.auth.usuario).toBeNull();
    expect(api.auth.isAuthenticated).toBe(false);

    const salvo = await AsyncStorage.getItem(SESSAO_KEY);
    expect(salvo).toBeNull();
  });
});

describe("atualizarUsuario", () => {
  it("não faz nada quando não há usuário autenticado", async () => {
    const { api } = await montarProvider();

    await act(async () => {
      await api.auth.atualizarUsuario({ nome: "Novo Nome" });
    });

    expect(api.auth.usuario).toBeNull();
  });

  it("atualiza o usuário no estado e na sessão persistida com os dados retornados pela API", async () => {
    const { api } = await montarProvider();

    await chamarLogin(api.auth, usuarioLocador.email, usuarioLocador.senha);

    const perfilAtualizado = {
      id: usuarioLocador.id.replace(/\D/g, "") || "1",
      nome: "João Atualizado",
      email: usuarioLocador.email,
      telefone: "11900001111",
      documento: usuarioLocador.documento,
      endereco: "Novo Endereço, 500",
      tipoUsuario: "Locador",
      fotoUrl: "",
      desde: 2026,
      reputacao: usuarioLocador.reputacao,
    };

    mockFetch(
      { ok: true, json: async () => ({}) },
      { ok: true, json: async () => perfilAtualizado },
    );

    await act(async () => {
      await api.auth.atualizarUsuario({ nome: "João Atualizado" });
    });

    expect(api.auth.usuario?.nome).toBe("João Atualizado");
    expect(api.auth.usuario?.endereco).toBe("Novo Endereço, 500");
    expect(api.auth.usuario?.telefone).toBe("11900001111");

    const salvo = await AsyncStorage.getItem(SESSAO_KEY);
    expect(JSON.parse(salvo!).nome).toBe("João Atualizado");
  });

  it("rejeita quando a atualização falha na API", async () => {
    const { api } = await montarProvider();

    await chamarLogin(api.auth, usuarioLocador.email, usuarioLocador.senha);

    mockFetch({
      ok: false,
      json: async () => ({ mensagem: "Não foi possível atualizar o perfil." }),
    });

    let erro: any;
    await act(async () => {
      try {
        await api.auth.atualizarUsuario({ nome: "Falha" });
      } catch (e) {
        erro = e;
      }
    });

    expect(erro).toBeInstanceOf(Error);
    expect(erro.message).toBe("Não foi possível atualizar o perfil.");
  });
});
