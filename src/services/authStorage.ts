import AsyncStorage from '@react-native-async-storage/async-storage';

import type { Usuario } from '../types/usuario.types';

/**
 * Persistência da sessão do usuário autenticado.
 *
 * BUG CORRIGIDO: antes, o usuário logado só existia em memória
 * (`useState` dentro do `AuthContext`). Qualquer refresh da página,
 * fechamento do app ou navegação que remontasse o `AuthProvider` fazia
 * a sessão sumir, derrubando o usuário de volta para a tela de Login
 * (ver `ProtectedRoute`, que redireciona sempre que `isAuthenticated`
 * é `false`).
 *
 * Agora a sessão é espelhada no AsyncStorage sempre que muda (login,
 * atualização de dados do perfil, logout) e é recarregada uma única vez
 * na inicialização do app (`AuthContext` -> `useEffect`).
 */
const CHAVE_SESSAO = '@locatemMobile:sessaoUsuario';

/** Salva/atualiza o usuário autenticado no armazenamento local do dispositivo. */
export async function salvarSessao(usuario: Usuario): Promise<void> {
  try {
    await AsyncStorage.setItem(CHAVE_SESSAO, JSON.stringify(usuario));
  } catch (error) {
    // Falha ao persistir não deve derrubar o fluxo de login/edição —
    // o usuário continua autenticado nesta sessão em memória, só não
    // sobrevive a um reload. Registramos o erro para facilitar o debug.
    console.warn('[authStorage] Não foi possível salvar a sessão.', error);
  }
}

/** Recupera o usuário previamente autenticado, se existir. */
export async function carregarSessao(): Promise<Usuario | null> {
  try {
    const bruto = await AsyncStorage.getItem(CHAVE_SESSAO);
    return bruto ? (JSON.parse(bruto) as Usuario) : null;
  } catch (error) {
    console.warn('[authStorage] Não foi possível carregar a sessão.', error);
    return null;
  }
}

/** Remove a sessão persistida (chamado no logout). */
export async function limparSessao(): Promise<void> {
  try {
    await AsyncStorage.removeItem(CHAVE_SESSAO);
  } catch (error) {
    console.warn('[authStorage] Não foi possível limpar a sessão.', error);
  }
}
