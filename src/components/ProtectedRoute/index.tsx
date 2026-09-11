import React, { useCallback } from "react";
import { ActivityIndicator, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";

import { useAuth } from "../../hooks/Auth/useAuth";
import type { RootStackParamList } from "../../routes/AppRoutes";

/**
 * HOC (Higher Order Component) que protege uma tela contra acesso de
 * usuários não autenticados.
 *
 * Toda vez que a tela envolvida ganha foco, verificamos `isAuthenticated`.
 * Se não houver sessão, a pilha de navegação é resetada para a tela de
 * Login — o usuário não consegue "voltar" para a tela protegida, e a
 * tela protegida nunca chega a renderizar dados de outro usuário.
 *
 * BUG CORRIGIDO: como o `AuthContext` agora lê a sessão salva do
 * AsyncStorage de forma assíncrona (`isInitializing`), esse guard
 * esperava `isAuthenticated` ficar `true` de forma síncrona — e como
 * isso nunca acontecia a tempo, o usuário era redirecionado para o
 * Login mesmo tendo uma sessão válida salva (ex.: ao dar refresh numa
 * tela protegida). Agora aguardamos `isInitializing` terminar antes de
 * decidir se redireciona.
 *
 * Uso:
 *   <Stack.Screen name="MinhasReservas" component={withAuthGuard(MinhasReservasScreen)} />
 */
export function withAuthGuard<P extends object>(
  Component: React.ComponentType<P>
) {
  function GuardedScreen(props: P) {
    const { isAuthenticated, isInitializing } = useAuth();
    const navigation =
      useNavigation<StackNavigationProp<RootStackParamList>>();

    useFocusEffect(
      useCallback(() => {
        // Ainda checando se existe sessão salva: não decide nada ainda.
        if (isInitializing) return;

        if (!isAuthenticated) {
          navigation.reset({
            index: 0,
            routes: [{ name: "LoginScreen" }],
          });
        }
      }, [isAuthenticated, isInitializing, navigation])
    );

    // Enquanto ainda inicializando ou não autenticado, evita renderizar
    // (mesmo que por um instante) a tela protegida com dados que ela
    // espera de um usuário logado — o redirecionamento acima acontece em
    // seguida, quando aplicável.
    if (isInitializing || !isAuthenticated) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator />
        </View>
      );
    }

    return <Component {...props} />;
  }

  GuardedScreen.displayName = `withAuthGuard(${
    Component.displayName || Component.name || "Component"
  })`;

  return GuardedScreen;
}
