import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// ============================================================================
// 1. O CONTRATO DE DADOS (ZOD SCHEMA)
// ============================================================================
// Aqui definimos as regras estritas de validação do formulário.
// Usamos o Zod para evitar dezenas de "if/else" espalhados pelo código.
const loginSchema = z.object({
  email: z
    .string()
    // .min(1) garante que o campo não seja enviado vazio (uma string ""), 
    // o que é essencial já que nossos defaultValues começam como "".
    .min(1, "O e-mail é obrigatório.") 
    // Usamos o .pipe() no Zod v4 para encadear validações isoladas. 
    // Só valida o formato (@, .com) se a string não for vazia.
    .pipe(z.email("Digite um e-mail válido.")), 
    
  password: z
    .string()
    .min(1, "A senha é obrigatória.") 
    .min(6, "A senha deve ter pelo menos 6 caracteres."), // Regra de negócio
});

// ============================================================================
// 2. TIPAGEM AUTOMÁTICA (TYPESCRIPT)
// ============================================================================
// Em vez de criarmos uma "interface LoginData" manualmente e corrermos o risco 
// de esquecer de atualizá-la, o z.infer extrai os tipos diretamente do schema acima.
// Se adicionarmos "CPF" no schema, o TypeScript atualiza essa tipagem automaticamente.
export type LoginFormData = z.infer<typeof loginSchema>;

// ============================================================================
// 3. O CUSTOM HOOK (A INTELIGÊNCIA DA TELA)
// ============================================================================
// Este hook isola toda a regra de negócio da interface visual (a View).
export function useLogin() {
  // Estado simples para controlar o loading do botão/tela durante a chamada da API.
  const [isLoading, setIsLoading] = useState(false);

  // INICIALIZAÇÃO DO REACT HOOK FORM
  // Usamos desestruturação { } para extrair apenas as ferramentas que precisamos 
  // de dentro do objeto gigante retornado pelo useForm.
  const {
    control, // O "espião" que conectamos aos Inputs para rastrear digitação sem re-renderizar a tela inteira.
    handleSubmit, // A função que intercepta o clique do botão e dispara o Zod.
    formState: { errors }, // A gaveta onde o Hook Form guarda os erros caso o Zod barre a entrada.
  } = useForm<LoginFormData>({
    // zodResolver é o "tradutor" que faz o React Hook Form entender as regras do Zod.
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
    setIsLoading(true); // Bloqueia o botão/inicia o spinner

    try {
      // Mock: Simulando o tempo de resposta de um servidor real (2 segundos)
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // TODO: Substituir pela chamada real da API no futuro:
      // const response = await api.post('/login', data);

      console.log("Dados validados com sucesso e prontos para envio ao Back-end:", data);
      alert("Login efetuado com sucesso!"); 
    } catch (error) {
      // Aqui tratamos erros devolvidos pelo servidor (ex: 401 - Senha incorreta)
      console.error("Erro ao fazer login:", error);
    } finally {
      // O bloco "finally" executa sempre, dando erro ou sucesso, 
      // garantindo que o loading seja desligado no final do processo.
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
    // Envolvemos nossa função de ação dentro do handleSubmit do Hook Form.
    // Assim, o Hook Form faz a validação primeiro e só depois chama o handleSignIn.
    handleSignIn: handleSubmit(handleSignIn),
  };
}