import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const API_URL = "http://localhost:5033";
// ============================================================================
// 1. O CONTRATO DE DADOS (ZOD SCHEMA)
// ============================================================================
// Aqui definimos as regras estritas de validação do formulário.
// Usamos o Zod para evitar dezenas de "if/else" espalhados pelo código.
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

// ============================================================================
// 3. O CUSTOM HOOK (A INTELIGÊNCIA DA TELA)
// ============================================================================
// Este hook isola toda a regra de negócio da interface visual (a View).
export function useLogin() {
  const navigation = useNavigation<any>();
  // Estado simples para controlar o loading do botão/tela durante a chamada da API.
  const [isLoading, setIsLoading] = useState(false);

  // Estado que guarda a mensagem de erro de LOGIN (credenciais erradas, falha de rede, etc).
  // É null quando não há nenhum erro para mostrar.
  const [loginErrorMessage, setLoginErrorMessage] = useState<string | null>(null);

  // Estado que guarda a mensagem de SUCESSO. Quando preenchido, mostramos o
  // card verde por um instante antes de navegar para a Home.
  const [loginSuccessMessage, setLoginSuccessMessage] = useState<string | null>(null);

  // Função simples para o card de erro se fechar (usada no botão "X" do card).
  const dismissLoginError = () => setLoginErrorMessage(null);

  // INICIALIZAÇÃO DO REACT HOOK FORM
  // Usamos desestruturação { } para extrair apenas as ferramentas que precisamos 
  // de dentro do objeto gigante retornado pelo useForm.
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    // defaultValues previne o erro de "componente mudando de uncontrolled para controlled" no React Native.
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // ============================================================================
  // 4. FUNÇÃO DE SUBMISSÃO (AÇÃO)
  // ============================================================================
  // Esta função SÓ É EXECUTADA se o usuário passar por todas as regras do Zod.
  // Portanto, o parâmetro "data" já chega aqui 100% validado e seguro.
const handleSignIn = async (data: LoginFormData) => {

  // Toda nova tentativa começa "limpa", sem o card de erro/sucesso da tentativa anterior.
  setLoginErrorMessage(null);
  setLoginSuccessMessage(null);
  setIsLoading(true);

 

  try {
  const response = await fetch(`${API_URL}/api/Login/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: data.email,
      senha: data.password,
    }),
  });

const resultado = await response.json();

if (!response.ok) {
  console.error("Erro no login:", resultado.mensagem);
  // Card de "E-mail ou senha errados" (ou outra mensagem vinda da API, se existir).
  setLoginErrorMessage(resultado.mensagem || "E-mail ou senha inválidos.");
  return;
}

await AsyncStorage.setItem("token", resultado.token);

// Mostra o card verde "Logado com Sucesso!!" e só então navega,
// pra dar tempo do usuário ver a confirmação na tela.
setLoginSuccessMessage("Logado com Sucesso!!");
setTimeout(() => {
  navigation.navigate("HomeScreen");
}, 1200);

  console.log({
  mensagem: resultado.mensagem,
  nome: resultado.nome,
  tipoUsuario: resultado.tipoUsuario,
});
} catch (error) {
  console.error("Erro ao fazer login:", error);
  // Falha de rede/servidor fora do ar — mesmo card, mensagem diferente.
  setLoginErrorMessage("Não foi possível conectar. Verifique sua internet e tente novamente.");
} finally {
  setIsLoading(false);
}
};
  

  // ============================================================================
  // 5. EXPOSIÇÃO (RETORNO DO HOOK)
  // ============================================================================
  // Entregamos para a interface visual APENAS o que ela precisa para funcionar.
  return {
    control,
    errors,
    isLoading,
    loginErrorMessage,
    dismissLoginError,
    loginSuccessMessage,
    // Envolvemos nossa função de ação dentro do handleSubmit do Hook Form.
    // Assim, o Hook Form faz a validação primeiro e só depois chama o handleSignIn.
    handleSignIn: handleSubmit(handleSignIn),
  };
}
