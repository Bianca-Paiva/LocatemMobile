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
   * (AsyncStorage) na inicialização.
   */
  isInitializing: boolean;

  /**
   * Realiza o login validando e-mail e senha.
   */
  login: (email: string, senha: string) => Promise<Usuario>;

  /** Encerra a sessão atual. */
  logout: () => void;

  /** Atualiza os dados do usuário atualmente autenticado. */
  atualizarUsuario: (dados: Partial<Usuario>) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  const API_URL = "http://10.0.2.2:5033";

  /**
   * Reautenticação automática no carregamento inicial.
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
   * Login.
   */
  const login: AuthContextType["login"] = async (email, senha) => {
    setIsAuthenticating(true);

    try {
      const emailNormalizado = email.trim().toLowerCase();

      if (!emailNormalizado || !senha) {
        throw new Error("Informe e-mail e senha para continuar.");
      }

      // ============================================================
      // USUÁRIOS MOCKADOS
      // ============================================================

      const usuarioMock = buscarUsuarioPorEmail(emailNormalizado);

      if (usuarioMock) {
        await new Promise((resolve) => setTimeout(resolve, 500));

        if (senha !== usuarioMock.senha) {
          throw new Error("E-mail ou senha inválidos.");
        }

        setUsuario(usuarioMock);
        await salvarSessao(usuarioMock);

        return usuarioMock;
      }

      // ============================================================
      // FALLBACK MOCK
      // ============================================================

      const USAR_API_REAL = true;

      if (!USAR_API_REAL) {
        await new Promise((resolve) => setTimeout(resolve, 500));

        const usuarioFallback =
          criarUsuarioFallback(emailNormalizado);

        if (senha !== usuarioFallback.senha) {
          throw new Error(
            "Para usuários de teste, a senha deve ser 123456."
          );
        }

        setUsuario(usuarioFallback);
        await salvarSessao(usuarioFallback);

        return usuarioFallback;
      }

      // ============================================================
      // LOGIN REAL - API .NET
      // ============================================================

      const response = await fetch(
        `${API_URL}/api/Login/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailNormalizado,
            senha: senha,
          }),
        }
      );

      const resultado = await response.json();

      if (!response.ok) {
        throw new Error(
          resultado.mensagem ||
            "E-mail ou senha inválidos."
        );
      }

      // ============================================================
      // BUSCA DADOS COMPLETOS DO USUÁRIO
      // ============================================================

      const perfilResponse = await fetch(
        `${API_URL}/api/Usuarios/me`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${resultado.token}`,
            Accept: "application/json",
          },
        }
      );

      const perfil = await perfilResponse.json();

      if (!perfilResponse.ok) {
        throw new Error(
          "Não foi possível carregar os dados do usuário."
        );
      }

      // ============================================================
      // MONTA USUÁRIO DO MOBILE
      // ============================================================
const usuarioApi: Usuario = {
    tipoUsuario: perfil.tipoUsuario,
    token: resultado.token,
    id: String(perfil.id),
    nome: perfil.nome || "Usuário",
    email: perfil.email || emailNormalizado,
    senha: "",
    telefone: perfil.telefone || "",
    documento: perfil.documento || "",
    endereco: perfil.endereco || "",
    tipo: perfil.tipoUsuario.toLowerCase() as "locatario" | "locador",
    fotoUrl: perfil.fotoUrl || "",
    emailVerificado: false,
    desde: perfil.desde || 0,
    reputacao: perfil.reputacao || {
    rating: 0,
    totalAvaliacoes: 0,
    locacoesConcluidas: 0,
    entregasNoPrazoPercentual: 0,
        },
      } as Usuario;

      setUsuario(usuarioApi);
      await salvarSessao(usuarioApi);

      return usuarioApi;
    } catch (error: any) {
      throw new Error(
        error.message ||
          "Não foi possível conectar ao servidor."
      );
    } finally {
      setIsAuthenticating(false);
    }
  };

  /**
   * Logout.
   */
  const logout = () => {
    setUsuario(null);
    limparSessao();
  };

  /**
   * Atualiza o perfil no Backend e depois atualiza
   * o estado local + sessão persistida.
   */
  const atualizarUsuario: AuthContextType["atualizarUsuario"] =
    async (dados) => {
      const usuarioAtual = usuario;

      if (!usuarioAtual) {
        return;
      }

      const response = await fetch(
        `${API_URL}/api/Usuarios/me`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${usuarioAtual.token}`,
          },
          body: JSON.stringify({
            nome: dados.nome,
            telefone: dados.telefone,
            documento: dados.documento?.replace(/\D/g, ""),
            endereco: dados.endereco,
          }),
        }
      );

      const resultado = await response.json();

      if (!response.ok) {
        throw new Error(
          resultado.mensagem ||
            "Não foi possível atualizar o perfil."
        );
      }
      const perfilResponse = await fetch(
  `${API_URL}/api/Usuarios/me`,
  {
    method: "GET",
    headers: {
      Authorization: `Bearer ${usuarioAtual.token}`,
      Accept: "application/json",
    },
  }
);

const perfilAtualizado = await perfilResponse.json();

if (!perfilResponse.ok) {
  throw new Error(
    "Perfil atualizado, mas não foi possível recarregar os dados."
  );
}

    const usuarioAtualizado: Usuario = {
  ...usuarioAtual,
  id: String(perfilAtualizado.id),
  nome: perfilAtualizado.nome || usuarioAtual.nome,
  email: perfilAtualizado.email || usuarioAtual.email,
  telefone: perfilAtualizado.telefone || "",
  documento: perfilAtualizado.documento || "",
  endereco: perfilAtualizado.endereco || "",
  tipo: perfilAtualizado.tipoUsuario
    ?.toLowerCase() as "locatario" | "locador",
  fotoUrl: perfilAtualizado.fotoUrl || "",
  desde: perfilAtualizado.desde || 0,
  reputacao: perfilAtualizado.reputacao || usuarioAtual.reputacao,
  token: usuarioAtual.token,
};

      setUsuario(usuarioAtualizado);
      await salvarSessao(usuarioAtualizado);

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