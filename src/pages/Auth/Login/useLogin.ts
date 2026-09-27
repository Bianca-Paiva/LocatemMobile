import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../../../routes/AppRoutes";
import { useAuth } from "../../../hooks/Auth/useAuth";

// ============================================================================
// useLogin
// ----------------------------------------------------------------------------
// Custom Hook que concentra TODA a lógica da tela de Login (padrão "Container/
// ViewModel"): validação de formulário, chamada ao contexto de autenticação,
// navegação após sucesso e controle dos estados de loading/erro/sucesso.
// A tela (index.tsx) fica só com a parte visual e consome o que este hook
// retorna.
// ============================================================================

// Schema de validação do formulário de login (Zod).
// Cada regra já vem com a mensagem de erro em português que será exibida
// abaixo do campo correspondente.
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

// Tipo TypeScript inferido automaticamente a partir do schema acima.
// Garante que o formulário (React Hook Form) e a validação (Zod) usem
// exatamente os mesmos campos/tipos.
export type LoginFormData = z.infer<typeof loginSchema>;

type LoginNavigation = StackNavigationProp<RootStackParamList>;

// navigationParam é opcional: permite injetar uma navegação customizada
// (útil em testes) e, se não for passado, usa a navegação padrão do
// React Navigation via useNavigation().
export function useLogin(navigationParam?: LoginNavigation) {
  const globalNavigation = useNavigation<LoginNavigation>();
  const navigation = navigationParam || globalNavigation;

  // Pegamos a função login do AuthContext (hooks/Auth/useAuth).
  // É ela quem realmente valida as credenciais, persiste a sessão
  // (AsyncStorage) e atualiza o estado global do usuário logado.
  const { login } = useAuth();

  // Estado de carregamento: desabilita o botão e troca o texto para "Carregando..."
  const [isLoading, setIsLoading] = useState(false);
  // Mensagem de erro exibida no card "Dados inválidos" da tela.
  const [loginErrorMessage, setLoginErrorMessage] = useState<string | null>(null);
  // Mensagem de sucesso exibida no card verde antes do redirecionamento.
  const [loginSuccessMessage, setLoginSuccessMessage] = useState<string | null>(null);

  // Permite ao usuário fechar manualmente o card de erro (botão "X").
  const dismissLoginError = () => setLoginErrorMessage(null);

  // Configuração do React Hook Form:
  // - resolver: liga o Zod ao RHF para validar automaticamente no submit.
  // - defaultValues: campos começam vazios.
  // - mode "onSubmit": só valida quando o usuário aperta o botão de entrar.
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

  // Função executada somente quando o formulário passa na validação do Zod
  // (handleSubmit garante isso — veja o "return" no final do arquivo).
  const handleSignIn = async (data: LoginFormData) => {
    // Reseta mensagens/erros de tentativas anteriores antes de tentar de novo.
    setLoginErrorMessage(null);
    setLoginSuccessMessage(null);
    clearErrors();
    setIsLoading(true);

    try {
      // Chama a função login do contexto.
      // Ela já valida com os mocks, salva a sessão no AsyncStorage e atualiza o estado global.
      const usuario = await login(data.email, data.password);

      setLoginSuccessMessage("Logado com Sucesso!!");

      // Pequeno delay (1.2s) só para o usuário ver o card de sucesso
      // antes de trocar de tela.
      setTimeout(() => {
        navigation.reset({
          index: 0,
          // Locador entra na Home própria (mesma regra da Web); os demais na HomeScreen.
          routes: [{ name: usuario.tipo === "locador" ? "HomeLocadorScreen" : "HomeScreen" }],
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
    // handleSubmit(handleSignIn) é o que a tela realmente chama no onPress do
    // botão: primeiro valida com o Zod, e só executa handleSignIn se passar.
    handleSignIn: handleSubmit(handleSignIn),
  };
}
