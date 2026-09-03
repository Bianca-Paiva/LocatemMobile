import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigation } from "@react-navigation/native";

// Importamos as funções utilitárias antigas. 
// Isso mostra que não precisamos descartar regras de negócio que já funcionam, 
// apenas as integramos dentro de um fluxo mais moderno (Zod).
import { validateCpf, validateCnpj, validatePassword } from "../../utils/validationsCadastro";

// ============================================================================
// 1. O CONTRATO BASE (ZOD SCHEMA)
// ============================================================================
// Aqui definimos a estrutura inicial e as validações simples de cada campo.
const cadastroSchemaBase = z.object({
  // z.enum: Garante tipagem estrita. O usuário SÓ pode ser "locador" ou "locatario".
  // Previne bugs causados por erros de digitação soltos no código.
  userType: z.enum(["locador", "locatario"]), 
  
  name: z.string().min(1, "O nome é obrigatório."),
  
  // Encadeamento com .pipe(): Primeiro garante que o campo não está vazio, 
  // depois verifica se o formato do e-mail é válido.
  email: z.string().min(1, "O e-mail é obrigatório.").pipe(z.email("Digite um e-mail válido.")),
  telefone: z.string().min(1, "O telefone é obrigatório."),
  password: z.string().min(1, "A senha é obrigatória."),
  confirmPassword: z.string().min(1, "Confirme a sua senha."),
  
  // Unificamos CPF e CNPJ num único campo chamado 'document'. 
  // A validação de qual documento usar será feita dinamicamente abaixo.
  document: z.string().min(1, "O documento é obrigatório."),
  address: z.string().min(1, "O endereço é obrigatório."),
});

// ============================================================================
// 2. AUDITORIA FINAL (REGRAS COMPLEXAS E CONDICIONAIS)
// ============================================================================
// Usamos o .superRefine() quando a validação de um campo depende de outro campo.
// Ele recebe 'data' (todos os campos preenchidos) e 'ctx' (contexto para injetar o erro).
const cadastroSchema = cadastroSchemaBase.superRefine((data, ctx) => {
  
  // Regra A: Validação de Segurança da Senha
  if (!validatePassword(data.password)) {
    ctx.addIssue({
      code: "custom",
      path: ["password"], // Aponta exatamente em qual input o erro deve aparecer
      message: "Mínimo 8 caracteres, uma letra e um número.",
    });
  }

  // Regra B: Comparação de Senhas
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: "custom",
      path: ["confirmPassword"], // O erro vai aparecer apenas no input "Confirmar Senha"
      message: "As senhas não coincidem.",
    });
  }

  // Regra C: Validação Condicional do Documento (A grande mágica!)
  // O Zod olha para o 'userType' escolhido para decidir como validar o 'document'.
  if (data.userType === "locatario") {
    if (!validateCpf(data.document)) {
      ctx.addIssue({
        code: "custom",
        path: ["document"],
        message: "CPF inválido.",
      });
    }
  } else if (data.userType === "locador") {
    if (!validateCnpj(data.document)) {
      ctx.addIssue({
        code: "custom",
        path: ["document"],
        message: "CNPJ inválido.",
      });
    }
  }
});

// ============================================================================
// 3. TIPAGEM AUTOMÁTICA (TYPESCRIPT)
// ============================================================================
// O z.infer extrai os tipos do schema automaticamente. Se adicionarmos um campo 
// novo no schema, o TypeScript atualiza essa interface sem precisarmos digitar nada.
export type CadastroFormData = z.infer<typeof cadastroSchema>;

// ============================================================================
// 4. O CUSTOM HOOK (CÉREBRO DO COMPONENTE)
// ============================================================================
// Este hook encapsula toda a lógica, deixando o index.tsx (View) totalmente limpo.
export function useCadastro() {
  const navigation = useNavigation<any>();
  const [isLoading, setIsLoading] = useState(false);

  // Mensagem do card verde "Conta Criada com Sucesso!!". null = nenhum sucesso pra mostrar.
  const [cadastroSuccessMessage, setCadastroSuccessMessage] = useState<string | null>(null);

  const {
    control,      // "Espião" que conectamos aos Inputs visuais.
    handleSubmit, // Função que dispara a validação do Zod antes de enviar.
    watch,        // Permite ler o valor de um campo em tempo real sem usar useState.
    setValue,     // Permite alterar o valor de um campo via código (ex: limpar o CPF ao trocar o tipo).
    formState: { errors },
  } = useForm<CadastroFormData>({
    resolver: zodResolver(cadastroSchema),
    // Valores iniciais obrigatórios no React Native para evitar o erro de input não-controlado.
    defaultValues: {
      userType: "locatario", 
      name: "",
      email: "",
      telefone: "",
      password: "",
      confirmPassword: "",
      document: "",
      address: "",
    },
  });

  // Espiamos o tipo de usuário atual. A View vai usar isso para decidir
  // se o botão de "Locatário" ou "Locador" fica destacado e qual máscara usar.
  const currentUserType = watch("userType");

const API_URL = "http://localhost:5033";

  // ============================================================================
  // 5. FUNÇÃO DE SUBMISSÃO (AÇÃO)
  // ============================================================================
  // Esta função só roda se o formulário passar 100% no Zod Schema acima.
  const handleSignUp = async (data: CadastroFormData) => {
    // Toda nova tentativa começa limpa, sem o card de sucesso da tentativa anterior.
    setCadastroSuccessMessage(null);
    setIsLoading(true);

    try {
  const response = await fetch(`${API_URL}/api/Cadastro/CriarUsuario`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome: data.name,
      email: data.email,
      senha: data.password,
      confirmarSenha: data.confirmPassword,
      telefone: data.telefone,
      documento: data.document.replace(/\D/g, ""),
      tipoUsuario: data.userType === "locador" ? 2 : 1,
    }),
  });

  console.log(response.status);

  if (!response.ok) {
    // Cadastro não deu certo (e-mail já existe, documento inválido no back-end, etc).
    // Por enquanto só logamos; se quiser um card vermelho aqui também é só avisar.
    console.error("Erro ao criar conta. Status:", response.status);
    return;
  }

  // Mostra o card verde "Conta Criada com Sucesso!!" e só então navega
  // para a tela de Login, dando tempo do usuário ver a confirmação.
  setCadastroSuccessMessage("Conta Criada com Sucesso!!");
  setTimeout(() => {
    navigation.navigate("LoginScreen");
  }, 1200);
} catch (error) {
  console.error("Erro ao criar conta:", error);
} finally {
  setIsLoading(false);
}
  };

  // Expondo para a View (index.tsx) apenas as ferramentas estritamente necessárias.
  return {
    control,
    errors,
    isLoading,
    currentUserType,
    setValue, 
    cadastroSuccessMessage,
    handleSignUp: handleSubmit(handleSignUp),
  };
}
