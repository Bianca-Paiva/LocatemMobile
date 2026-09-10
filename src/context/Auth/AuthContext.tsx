import { createContext, useState } from "react";
import type { ReactNode } from "react";

import type { Usuario } from "../../types/usuario.types";
import {
  buscarUsuarioPorEmail,
  criarUsuarioFallback,
} from "../../mocks/usuarios.mock";

interface AuthContextType {
  /** Usuário autenticado ou null quando não existe uma sessão. */
  usuario: Usuario | null;

  /** Indica se existe um usuário autenticado. */
  isAuthenticated: boolean;

  /** Indica se uma tentativa de login está em andamento. */
  isAuthenticating: boolean;

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
  // Nenhum usuário fica autenticado inicialmente.
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

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
  const login: AuthContextType["login"] = async (email, senha) => {
    setIsAuthenticating(true);

    try {
      // Simula a latência de uma chamada real ao backend.
      await new Promise((resolve) => setTimeout(resolve, 800));

      const emailNormalizado = email.trim().toLowerCase();

      if (!emailNormalizado || !senha) {
        throw new Error("Informe e-mail e senha para continuar.");
      }

      const usuarioEncontrado = buscarUsuarioPorEmail(emailNormalizado);

      if (usuarioEncontrado) {
        // E-mail já existe no catálogo: a senha precisa ser validada.
        if (usuarioEncontrado.senha !== senha) {
          throw new Error("E-mail ou senha inválidos.");
        }

        setUsuario(usuarioEncontrado);
        return usuarioEncontrado;
      }

      // E-mail novo: cria um usuário de fallback (ver usuarios.mock.ts).
      const novoUsuario = criarUsuarioFallback(emailNormalizado);
      setUsuario(novoUsuario);
      return novoUsuario;
    } finally {
      setIsAuthenticating(false);
    }
  };

  /**
   * Encerra a sessão do usuário.
   */
  const logout = () => {
    setUsuario(null);
  };

  /**
   * Atualiza os dados do usuário autenticado.
   *
   * O Partial<Usuario> permite alterar somente
   * os campos necessários.
   */
  const atualizarUsuario: AuthContextType["atualizarUsuario"] = (
    dados
  ) => {
    setUsuario((usuarioAtual) =>
      usuarioAtual
        ? {
            ...usuarioAtual,
            ...dados,
          }
        : usuarioAtual
    );
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        isAuthenticated: usuario !== null,
        isAuthenticating,
        login,
        logout,
        atualizarUsuario,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
