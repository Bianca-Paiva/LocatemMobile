/**
 * Dicionário de mensagens padrão utilizadas no fluxo de cadastro/edição do
 * usuário. Centraliza os títulos e descrições exibidos no alerta do
 * EditarPerfilModal. Espelha 1:1 hooks/Cadastro/cadastroMessages.ts da Web.
 */
export const CADASTRO_MESSAGES = {
  REQUIRED: {
    titulo: 'Campos obrigatórios',
    mensagem: 'Preencha todos os campos obrigatórios para continuar.',
  },

  INVALID_NAME: {
    titulo: 'Nome inválido',
    mensagem: 'Por favor, digite seu nome completo.',
  },

  INVALID_PHONE: {
    titulo: 'Telefone inválido',
    mensagem: 'Digite um telefone válido com DDD.',
  },

  INVALID_CPF: {
    titulo: 'CPF inválido',
    mensagem: 'Digite seu CPF completo.',
  },

  INVALID_CNPJ: {
    titulo: 'CNPJ inválido',
    mensagem: 'Digite seu CNPJ completo.',
  },

  INVALID_CEP: {
    titulo: 'CEP inválido',
    mensagem: 'Digite um CEP válido.',
  },
} as const;
