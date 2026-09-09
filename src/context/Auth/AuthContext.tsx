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

  /** Realiza o login utilizando o e-mail informado. */
  login: (email: string) => Usuario;

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

  /**
   * Realiza o login do usuário.
   *
   * Como a API ainda não está implementada,
   * o usuário é buscado nos mocks.
   *
   * Caso o e-mail não seja encontrado,
   * um usuário de fallback é criado.
   */
  const login: AuthContextType["login"] = (email) => {
    const usuarioEncontrado =
      buscarUsuarioPorEmail(email) ??
      criarUsuarioFallback(email);

    setUsuario(usuarioEncontrado);

    return usuarioEncontrado;
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
        login,
        logout,
        atualizarUsuario,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

