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
 * Uso:
 *   <Stack.Screen name="MinhasReservas" component={withAuthGuard(MinhasReservasScreen)} />
 */
export function withAuthGuard<P extends object>(
  Component: React.ComponentType<P>
) {
  function GuardedScreen(props: P) {
    const { isAuthenticated } = useAuth();
    const navigation =
      useNavigation<StackNavigationProp<RootStackParamList>>();

    useFocusEffect(
      useCallback(() => {
        if (!isAuthenticated) {
          navigation.reset({
            index: 0,
            routes: [{ name: "LoginScreen" }],
          });
        }
      }, [isAuthenticated, navigation])
    );

    // Enquanto não autenticado, evita renderizar (mesmo que por um
    // instante) a tela protegida com dados que ela espera de um usuário
    // logado — o redirecionamento acima acontece em seguida.
    if (!isAuthenticated) {
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
