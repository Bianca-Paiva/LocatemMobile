import React from 'react';
import { act, create } from 'react-test-renderer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext, AuthProvider } from '../../../src/context/Auth/AuthContext';
import { USUARIOS_MOCK } from '../../../src/mocks/usuarios.mock';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

// O login para usuários mockados tem um delay artificial de 500ms
// (setTimeout) simulando uma chamada de rede. Usamos fake timers e
// avançamos esse delay explicitamente em vez de depender de timers reais —
// aguardar 500ms de verdade em cada teste é lento e, dentro de `act()`,
// mostrou-se não-determinístico neste ambiente (o scheduler do React chegou
// a resolver o timer quase instantaneamente em algumas execuções).
jest.useFakeTimers();

const usuarioLocador = USUARIOS_MOCK.find((u) => u.tipo === 'locador')!;
const usuarioLocatario = USUARIOS_MOCK.find((u) => u.tipo === 'locatario')!;

function Harness({ api }: { api: any }) {
  api.auth = React.useContext(AuthContext);
  return null;
}

let rendererAtual: any = null;

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
  for (let tentativas = 0; tentativas < 20 && api.auth?.isInitializing; tentativas += 1) {
    await act(async () => {
      await Promise.resolve();
    });
  }

  rendererAtual = renderer;
  return { api, renderer };
}

/**
 * Chama auth.login(...) avançando manualmente o delay de 500ms simulado
 * para os usuários mockados, tudo dentro do MESMO `act(async () => ...)` —
 * essencial para que o React flushe os `setState` disparados após o timer
 * antes de act() resolver (senão o próximo `read` do contexto ainda vê o
 * estado antigo). Retorna o resultado (ou propaga o erro) do login.
 */
async function chamarLogin(auth: any, email: string, senha: string): Promise<any> {
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

beforeEach(async () => {
  await AsyncStorage.clear();
  // @ts-ignore
  global.fetch = undefined;
});

afterEach(() => {
  if (rendererAtual) {
    act(() => rendererAtual.unmount());
    rendererAtual = null;
  }
});

describe('AuthProvider — estado inicial', () => {
  it('inicia sem usuário autenticado e isAuthenticated=false', async () => {
    const { api } = await montarProvider();
    expect(api.auth.usuario).toBeNull();
    expect(api.auth.isAuthenticated).toBe(false);
  });

  it('isInitializing vira false depois de checar o AsyncStorage', async () => {
    const { api } = await montarProvider();
    expect(api.auth.isInitializing).toBe(false);
  });

  it('reautentica automaticamente quando há uma sessão salva no AsyncStorage', async () => {
    await AsyncStorage.setItem('@locatemMobile:sessaoUsuario', JSON.stringify(usuarioLocatario));

    const { api } = await montarProvider();

    expect(api.auth.usuario).toEqual(usuarioLocatario);
    expect(api.auth.isAuthenticated).toBe(true);
  });
});

describe('login — usuários mockados (USUARIOS_MOCK)', () => {
  it('autentica com sucesso um usuário mockado com a senha correta', async () => {
    const { api } = await montarProvider();

    const usuarioRetornado = await chamarLogin(api.auth, usuarioLocador.email, usuarioLocador.senha);

    expect(usuarioRetornado).toEqual(usuarioLocador);
    expect(api.auth.usuario).toEqual(usuarioLocador);
    expect(api.auth.isAuthenticated).toBe(true);
  });

  it('normaliza o e-mail (trim + lowercase) ao autenticar', async () => {
    const { api } = await montarProvider();

    await chamarLogin(api.auth, `  ${usuarioLocador.email.toUpperCase()}  `, usuarioLocador.senha);

    expect(api.auth.usuario?.email).toBe(usuarioLocador.email);
  });

  it('rejeita com senha incorreta para um usuário mockado existente', async () => {
    const { api } = await montarProvider();

    await expect(chamarLogin(api.auth, usuarioLocador.email, 'senha-errada')).rejects.toThrow(
      'E-mail ou senha inválidos.',
    );

    expect(api.auth.usuario).toBeNull();
  });

  it('rejeita quando e-mail ou senha estão vazios', async () => {
    const { api } = await montarProvider();

    await expect(
      act(async () => {
        await api.auth.login('', '');
      }),
    ).rejects.toThrow('Informe e-mail e senha para continuar.');
  });

  it('persiste a sessão no AsyncStorage após login bem-sucedido', async () => {
    const { api } = await montarProvider();

    await chamarLogin(api.auth, usuarioLocatario.email, usuarioLocatario.senha);

    const salvo = await AsyncStorage.getItem('@locatemMobile:sessaoUsuario');
    expect(JSON.parse(salvo!)).toEqual(usuarioLocatario);
  });

  it('isAuthenticating fica true durante o login e volta a false ao final', async () => {
    const { api } = await montarProvider();

    let promise!: Promise<any>;
    act(() => {
      promise = api.auth.login(usuarioLocador.email, usuarioLocador.senha);
    });

    expect(api.auth.isAuthenticating).toBe(true);

    await act(async () => {
      jest.advanceTimersByTime(500);
      await promise;
    });

    expect(api.auth.isAuthenticating).toBe(false);
  });
});

describe('login — fallback via API real (e-mail fora de USUARIOS_MOCK)', () => {
  it('autentica com sucesso quando a API retorna 200 com token e perfil', async () => {
    const perfil = {
      id: 99,
      nome: 'Novo Usuário',
      email: 'novo@exemplo.com',
      tipoUsuario: 'Locatario',
      telefone: '11999998888',
      documento: '12345678900',
      endereco: 'Rua X, 1',
      fotoUrl: '',
      desde: 2026,
      reputacao: { rating: 0, totalAvaliacoes: 0, locacoesConcluidas: 0, entregasNoPrazoPercentual: 0 },
    };

    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => ({ token: 'abc123' }) })
      .mockResolvedValueOnce({ ok: true, json: async () => perfil });

    const { api } = await montarProvider();

    let usuarioRetornado: any;
    await act(async () => {
      usuarioRetornado = await api.auth.login('novo@exemplo.com', 'qualquer-senha');
    });

    expect(usuarioRetornado.id).toBe('99');
    expect(usuarioRetornado.nome).toBe('Novo Usuário');
    expect(usuarioRetornado.token).toBe('abc123');
    expect(usuarioRetornado.tipo).toBe('locatario');
    expect(api.auth.isAuthenticated).toBe(true);
  });

  it('rejeita quando a API de login retorna erro (ok: false)', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      json: async () => ({ mensagem: 'Credenciais inválidas' }),
    });

    const { api } = await montarProvider();

    await expect(
      act(async () => {
        await api.auth.login('outro@exemplo.com', 'senha123');
      }),
    ).rejects.toThrow('Credenciais inválidas');

    expect(api.auth.usuario).toBeNull();
  });

  it('rejeita quando a API de login falha sem mensagem específica', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    });

    const { api } = await montarProvider();

    await expect(
      act(async () => {
        await api.auth.login('outro@exemplo.com', 'senha123');
      }),
    ).rejects.toThrow('E-mail ou senha inválidos.');
  });

  it('rejeita quando o perfil do usuário não pode ser carregado após o login', async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => ({ token: 'abc123' }) })
      .mockResolvedValueOnce({ ok: false, json: async () => ({}) });

    const { api } = await montarProvider();

    await expect(
      act(async () => {
        await api.auth.login('outro@exemplo.com', 'senha123');
      }),
    ).rejects.toThrow('Não foi possível carregar os dados do usuário.');
  });

  it('propaga um erro genérico quando a rede falha (fetch rejeita)', async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error('Network request failed'));

    const { api } = await montarProvider();

    await expect(
      act(async () => {
        await api.auth.login('outro@exemplo.com', 'senha123');
      }),
    ).rejects.toThrow('Network request failed');
  });
});

describe('logout', () => {
  it('limpa o usuário autenticado e a sessão persistida', async () => {
    const { api } = await montarProvider();

    await chamarLogin(api.auth, usuarioLocador.email, usuarioLocador.senha);
    expect(api.auth.isAuthenticated).toBe(true);

    await act(async () => {
      api.auth.logout();
      await Promise.resolve();
    });

    expect(api.auth.usuario).toBeNull();
    expect(api.auth.isAuthenticated).toBe(false);

    const salvo = await AsyncStorage.getItem('@locatemMobile:sessaoUsuario');
    expect(salvo).toBeNull();
  });
});

describe('atualizarUsuario', () => {
  it('não faz nada quando não há usuário autenticado', async () => {
    const { api } = await montarProvider();

    await act(async () => {
      await api.auth.atualizarUsuario({ nome: 'Novo Nome' });
    });

    expect(api.auth.usuario).toBeNull();
  });

  it('atualiza o usuário no estado e na sessão persistida com os dados retornados pela API', async () => {
    const { api } = await montarProvider();

    await chamarLogin(api.auth, usuarioLocador.email, usuarioLocador.senha);

    const perfilAtualizado = {
      id: usuarioLocador.id.replace(/\D/g, '') || '1',
      nome: 'João Atualizado',
      email: usuarioLocador.email,
      telefone: '11900001111',
      documento: usuarioLocador.documento,
      endereco: 'Novo Endereço, 500',
      tipoUsuario: 'Locador',
      fotoUrl: '',
      desde: 2026,
      reputacao: usuarioLocador.reputacao,
    };

    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => ({}) })
      .mockResolvedValueOnce({ ok: true, json: async () => perfilAtualizado });

    await act(async () => {
      await api.auth.atualizarUsuario({ nome: 'João Atualizado' });
    });

    expect(api.auth.usuario?.nome).toBe('João Atualizado');
    expect(api.auth.usuario?.endereco).toBe('Novo Endereço, 500');
    expect(api.auth.usuario?.telefone).toBe('11900001111');

    const salvo = await AsyncStorage.getItem('@locatemMobile:sessaoUsuario');
    expect(JSON.parse(salvo!).nome).toBe('João Atualizado');
  });

  it('rejeita quando a atualização falha na API', async () => {
    const { api } = await montarProvider();

    await chamarLogin(api.auth, usuarioLocador.email, usuarioLocador.senha);

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      json: async () => ({ mensagem: 'Não foi possível atualizar o perfil.' }),
    });

    await expect(
      act(async () => {
        await api.auth.atualizarUsuario({ nome: 'Falha' });
      }),
    ).rejects.toThrow('Não foi possível atualizar o perfil.');
  });
});
