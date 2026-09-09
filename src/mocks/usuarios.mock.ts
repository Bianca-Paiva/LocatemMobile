import type { Usuario } from "../types/usuario.types";

/**
 * Catálogo de usuários utilizado durante o desenvolvimento do aplicativo.
 *
 * Enquanto a API de autenticação não estiver disponível,
 * este arquivo funciona como fonte de dados para testes.
 *
 * Usuários disponíveis:
 *
 * 1. Locador:
 *    - Sem foto
 *    - E-mail não verificado
 *    - Dados quase completos
 *    - Perfil parcialmente incompleto
 *
 * 2. Locatário:
 *    - Com foto
 *    - E-mail verificado
 *    - Perfil 100% completo
 *
 * 3. Outros e-mails:
 *    - Utilizam o usuário de fallback
 *    - Simulam um usuário recém-cadastrado
 */
export const USUARIOS_MOCK: Usuario[] = [
  {
    id: "u-locador-1",
    nome: "João da Silva",
    email: "joao.silva@exemplo.com",
    telefone: "(11) 98765-4321",
    documento: "12.345.678/0001-90",
    endereco:
      "Rua das Acácias, 247 – Apto 32, São Paulo, SP · 01310-100",

    tipo: "locador",

    emailVerificado: false,

    desde: 2026,

    reputacao: {
      rating: 4.5,
      totalAvaliacoes: 145,
      locacoesConcluidas: 212,
      entregasNoPrazoPercentual: 98,
    },
  },

  {
    id: "u-locataria-1",
    nome: "Maria Oliveira",
    email: "maria.oliveira@exemplo.com",
    telefone: "(11) 91234-5678",
    documento: "987.654.321-00",
    endereco:
      "Av. Sapopemba, 1500, São Paulo, SP · 03988-000",

    tipo: "locatario",

    fotoUrl:
      "https://i.pravatar.cc/150?u=maria.oliveira",

    emailVerificado: true,

    desde: 2026,

    reputacao: {
      rating: 4.8,
      totalAvaliacoes: 38,
      locacoesConcluidas: 20,
    },
  },
];

/**
 * Procura um usuário no catálogo pelo endereço de e-mail.
 *
 * A comparação ignora:
 * - letras maiúsculas/minúsculas
 * - espaços extras antes ou depois do e-mail
 */
export function buscarUsuarioPorEmail(
  email: string
): Usuario | undefined {
  return USUARIOS_MOCK.find(
    (usuario) =>
      usuario.email.toLowerCase() ===
      email.trim().toLowerCase()
  );
}

/**
 * Cria um usuário provisório quando o e-mail
 * não existe no catálogo de usuários.
 *
 * O nome é gerado utilizando a parte do e-mail
 * que aparece antes do "@"
 *
 * Exemplo:
 *
 * gustavo.silva@email.com
 *        ↓
 * Gustavo Silva
 */
export function criarUsuarioFallback(
  email: string
): Usuario {
  const nomeBase =
    email
      .split("@")[0]
      ?.replace(/[._]/g, " ")
      .trim() || "Usuário";

  const nomeFormatado = nomeBase.replace(
    /\b\w/g,
    (letra) => letra.toUpperCase()
  );

  return {
    id: `u-${Date.now()}`,

    nome: nomeFormatado,

    email,

    telefone: "",

    documento: "",

    endereco: "",

    // Usuários criados pelo fallback
    // começam como locatários.
    tipo: "locatario",

    emailVerificado: false,

    desde: new Date().getFullYear(),

    reputacao: {
      rating: 0,
      totalAvaliacoes: 0,
      locacoesConcluidas: 0,
    },
  };
}

