import { z } from 'zod';
import { cpf, cnpj } from 'cpf-cnpj-validator';
import { validateFullName, validatePhone, validateCEP } from '../masks';

/**
 * Schema de validação do formulário de Editar Perfil.
 *
 * Espelha 1:1 hooks/Perfil/perfilSchema.ts da Web: usa zod + as mesmas
 * validações reais de CPF/CNPJ (cpf-cnpj-validator) e nome/telefone/CEP
 * (utils já existentes em hooks/masks.ts) em vez das checagens ingênuas
 * de "quantidade de dígitos" que existiam aqui antes.
 *
 * Diferença consciente em relação à Web: a Web valida telefone com
 * libphonenumber-js; essa lib não está nas dependências do app Mobile,
 * então mantemos aqui a validação por quantidade de dígitos (10 ou 11)
 * já usada em hooks/masks.ts — mesmo critério do resto do app.
 */
export const perfilSchema = z
  .object({
    tipo: z.enum(['locatario', 'locador']),

    nome: z
      .string()
      .min(1, 'O nome é obrigatório')
      .refine(validateFullName, 'Por favor, digite seu nome completo'),

    telefone: z
      .string()
      .min(1, 'O telefone é obrigatório')
      .refine(validatePhone, 'Digite um telefone válido com DDD'),

    documento: z.string().min(1, 'O documento é obrigatório'),

    cep: z
      .string()
      .min(1, 'O CEP é obrigatório')
      .refine(validateCEP, 'Digite um CEP válido'),

    logradouro: z.string().min(1, 'O endereço é obrigatório'),

    numero: z.string().min(1, 'O número é obrigatório'),
  })
  .refine(
    (data) => {
      const cleanDoc = data.documento.replace(/\D/g, '');
      const isCNPJ = data.tipo === 'locador';
      return isCNPJ ? cnpj.isValid(cleanDoc) : cpf.isValid(cleanDoc);
    },
    {
      message: 'Documento inválido',
      path: ['documento'],
    }
  );

export type PerfilFormData = z.infer<typeof perfilSchema>;
