import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../../../routes/AppRoutes";
import { useAuth } from "../../../hooks/Auth/useAuth";

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

export function useLogin(navigationParam?: LoginNavigation) {
  const globalNavigation = useNavigation<LoginNavigation>();
  const navigation = navigationParam || globalNavigation;

  // Pegamos a função login do seu AuthContext
  const { login } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState<string | null>(null);
  const [loginSuccessMessage, setLoginSuccessMessage] = useState<string | null>(null);

  const dismissLoginError = () => setLoginErrorMessage(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const handleSignIn = async (data: LoginFormData) => {
    setLoginErrorMessage(null);
    setLoginSuccessMessage(null);
    clearErrors();
    setIsLoading(true);

    try {
      // Chama a função login do contexto. 
      // Ela já valida com os mocks, salva a sessão no AsyncStorage e atualiza o estado global.
      await login(data.email, data.password);

      setLoginSuccessMessage("Logado com Sucesso!!");
      
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "HomeScreen" }],
        });
      }, 1200);
      
    } catch (error: any) {
      console.error("Erro ao fazer login:", error);
      // Exibe a mensagem amigável tratada pelo contexto (ex: "E-mail ou senha inválidos.")
      setLoginErrorMessage(error.message || "Não foi possível realizar o login.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    control,
    errors,
    isLoading,
    loginErrorMessage,
    dismissLoginError,
    loginSuccessMessage,
    handleSignIn: handleSubmit(handleSignIn),
  };
}
