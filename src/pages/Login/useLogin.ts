import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { StackNavigationProp } from "@react-navigation/stack";

import { useAuth } from "../../hooks/Auth/useAuth";
import type { RootStackParamList } from "../../routes/AppRoutes";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "O e-mail é obrigatório.")
    .pipe(z.email("Digite um e-mail válido.")),
  password: z
    .string()
    .min(1, "A senha é obrigatória.")
    .min(6, "A senha deve ter pelo menos 6 caracteres."),
});

export type LoginFormData = z.infer<typeof loginSchema>;

type LoginNavigation = StackNavigationProp<RootStackParamList>;

export function useLogin(navigation: LoginNavigation) {
  // Estado de autenticação centralizado no AuthContext — é ele quem sabe
  // se o login deu certo e mantém o usuário disponível para o app todo
  // (inclusive a tela de Perfil).
  const { login, isAuthenticating } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const handleSignIn = async (data: LoginFormData) => {
    clearErrors();

    try {
      // Só chega aqui se o AuthContext confirmar e-mail + senha válidos.
      await login(data.email, data.password);

      // Login bem-sucedido: leva o usuário para a página de Perfil e
      // remove a tela de Login da pilha de navegação (reset), assim o
      // botão "voltar" do dispositivo não retorna para o login.
      navigation.reset({
        index: 0,
        routes: [{ name: "PerfilScreen" }],
      });
    } catch (error) {
      // Mensagem amigável tanto para credenciais inválidas quanto para
      // qualquer falha inesperada (ex.: futura falha de conexão com a API).
      const mensagem =
        error instanceof Error
          ? error.message
          : "Não foi possível entrar. Verifique sua conexão e tente novamente.";

      setError("password", {
        type: "manual",
        message: mensagem,
      });
    }
  };

  return {
    control,
    errors,
    isLoading: isAuthenticating,
    handleSignIn: handleSubmit(handleSignIn),
  };
}
