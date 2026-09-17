import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

import type { Usuario } from "../../types/Auth/usuario.types";
import {
  buscarUsuarioPorEmail,
  criarUsuarioFallback,
} from "../../mocks/usuarios.mock";
import {
  carregarSessao,
  limparSessao,
  salvarSessao,
} from "../../services/authStorage";

interface AuthContextType {
  /** Usuário autenticado ou null quando não existe uma sessão. */
  usuario: Usuario | null;

  /** Indica se existe um usuário autenticado. */
  isAuthenticated: boolean;

  /** Indica se uma tentativa de login está em andamento. */
  isAuthenticating: boolean;

  /**
   * Indica se o app ainda está checando se existe uma sessão salva
   * (AsyncStorage) na inicialização. Enquanto `true`, telas protegidas
   * (`ProtectedRoute`) NÃO devem redirecionar para o Login — senão o
   * usuário é jogado pra fora antes mesmo da sessão salva ser lida.
   */
  isInitializing: boolean;

  /**
   * Realiza o login validando e-mail e senha.
   *
   * Resolve com o usuário autenticado em caso de sucesso.
   * Rejeita com um `Error` com mensagem amigável em caso de falha
   * (credenciais inválidas, campos vazios, etc).
   */
  login: (email: string, senha: string) => Promise<Usuario>;

  /** Encerra a sessão atual. */
  logout: () => void;

  /** Atualiza os dados do usuário atualmente autenticado. */
  atualizarUsuario: (dados: Partial<Usuario>) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  // Nenhum usuário fica autenticado inicialmente — até a checagem de
  // sessão salva (abaixo) terminar e, possivelmente, repopular o estado.
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  /**
   * Reautenticação automática no carregamento inicial do app.
   *
   * Roda uma única vez: lê a sessão persistida no AsyncStorage e, se
   * existir, repopula `usuario` sem exigir novo login. É isso que faz o
   * usuário continuar logado depois de fechar/reabrir o app ou dar
   * refresh na versão Web.
   */
  useEffect(() => {
    let ativo = true;

    async function reautenticar() {
      const usuarioSalvo = await carregarSessao();

      if (ativo && usuarioSalvo) {
        setUsuario(usuarioSalvo);
      }

      if (ativo) {
        setIsInitializing(false);
      }
    }

    reautenticar();

    return () => {
      ativo = false;
    };
  }, []);

  /**
   * Realiza o login do usuário.
   *
   * Como a API ainda não está implementada, o usuário é buscado nos mocks:
   * - E-mail encontrado: a senha precisa bater com a senha do mock,
   *   caso contrário o login falha com "credenciais inválidas".
   * - E-mail não encontrado: um usuário de fallback é criado (simulando
   *   um cadastro implícito, comportamento já documentado em usuarios.mock).
   *
   * Esta função é a ÚNICA responsável por popular o estado de autenticação:
   * qualquer tela que faça login DEVE chamar `login` (via `useAuth`) em vez
   * de ler os mocks diretamente, ou o app nunca saberá que existe uma sessão.
   */
 const API_URL = "http://10.0.2.2:5033";

const login: AuthContextType["login"] = async (email, senha) => {
    setIsAuthenticating(true);

    try {
      const emailNormalizado = email.trim().toLowerCase();

      if (!emailNormalizado || !senha) {
        throw new Error("Informe e-mail e senha para continuar.");
      }

      // ======================================================================
      // 1. USUÁRIOS DE TESTE MOCKADOS (Locador e Locatária)
      // ======================================================================
      // Delega a busca para o seu arquivo mock
      const usuarioMock = buscarUsuarioPorEmail(emailNormalizado);

      if (usuarioMock) {
        await new Promise((resolve) => setTimeout(resolve, 500)); // Delay simulado

        if (senha !== usuarioMock.senha) {
          throw new Error("E-mail ou senha inválidos.");
        }

        // Se a senha bater, loga o usuário do mock
        setUsuario(usuarioMock);
        await salvarSessao(usuarioMock);
        return usuarioMock;
      }

      // ======================================================================
      // 1.1. (OPCIONAL) USUÁRIO DE FALLBACK
      // ======================================================================
      // Se você quiser testar o app offline sem bater na API do .NET,
      // você pode usar o seu fallback aqui. 
      // Para ativar o fluxo da API real, basta apagar ou comentar este bloco `if`.
      const USAR_API_REAL = false; // Mude para true quando a API estiver pronta

      if (!USAR_API_REAL) {
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Cria o usuário dinâmico (ex: teste@email.com vira "Teste")
        const usuarioFallback = criarUsuarioFallback(emailNormalizado);

        if (senha !== usuarioFallback.senha) {
          throw new Error("Para usuários de teste, a senha deve ser 123456.");
        }

        setUsuario(usuarioFallback);
        await salvarSessao(usuarioFallback);
        return usuarioFallback;
      }

      // ======================================================================
      // 2. FLUXO NORMAL (CHAMADA À API REAL DO .NET)
      // ======================================================================
      const response = await fetch(`${API_URL}/api/Login/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailNormalizado,
          senha: senha,
        }),
      });

      const resultado = await response.json();

      if (!response.ok) {
        throw new Error(resultado.mensagem || "E-mail ou senha inválidos.");
      }

      const usuarioApi: Usuario = {
        tipoUsuario: resultado.tipoUsuario,
        token: resultado.token,
        id: resultado.id || "1",
        nome: resultado.nome || "Usuário",
        email: emailNormalizado,
        senha: resultado.senha || "",
        telefone: resultado.telefone || "",
        documento: resultado.documento || "",
        endereco: resultado.endereco || "",
        tipo: resultado.tipoUsuario || "Cliente",
        fotoUrl: resultado.fotoUrl || "",
        emailVerificado: resultado.emailVerificado || false,
        desde: resultado.desde || 0,
        reputacao: resultado.reputacao || { rating: 0, totalAvaliacoes: 0, locacoesConcluidas: 0 },
      } as Usuario;

      setUsuario(usuarioApi);
      await salvarSessao(usuarioApi);
      return usuarioApi;

    } catch (error: any) {
      throw new Error(error.message || "Não foi possível conectar ao servidor.");
    } finally {
      setIsAuthenticating(false);
    }
  };

  /**
   * Encerra a sessão do usuário — tanto em memória quanto no
   * armazenamento persistido, para não ser "readotado" no próximo
   * carregamento do app.
   */
  const logout = () => {
    setUsuario(null);
    limparSessao();
  };

  /**
   * Atualiza os dados do usuário autenticado.
   *
   * O Partial<Usuario> permite alterar somente os campos necessários.
   * A versão atualizada também é persistida, senão uma edição de perfil
   * seria perdida no próximo carregamento do app.
   */
  const atualizarUsuario: AuthContextType["atualizarUsuario"] = (
    dados
  ) => {
    setUsuario((usuarioAtual) => {
      if (!usuarioAtual) {
        return usuarioAtual;
      }

      const usuarioAtualizado = { ...usuarioAtual, ...dados };
      salvarSessao(usuarioAtualizado);
      return usuarioAtualizado;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        isAuthenticated: usuario !== null,
        isAuthenticating,
        isInitializing,
        login,
        logout,
        atualizarUsuario,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
