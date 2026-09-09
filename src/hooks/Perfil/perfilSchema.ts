import type { PerfilFormData } from '../../types/usuario.types';

export function validarPerfil(data: PerfilFormData, isCNPJ: boolean) {
  const digits = (v: string) => v.replace(/\D/g, '');
  const errors: Partial<Record<keyof PerfilFormData, string>> = {};
  if (!data.nome.trim()) errors.nome = 'O nome é obrigatório';
  else if (data.nome.trim().split(/\s+/).length < 2) errors.nome = 'Digite seu nome completo';
  if (![10, 11].includes(digits(data.telefone).length)) errors.telefone = 'Digite um telefone válido com DDD';
  if (digits(data.documento).length !== (isCNPJ ? 14 : 11)) errors.documento = 'Documento inválido';
  if (digits(data.cep).length !== 8) errors.cep = 'Digite um CEP válido';
  if (!data.logradouro.trim()) errors.logradouro = 'O endereço é obrigatório';
  if (!data.numero.trim()) errors.numero = 'O número é obrigatório';
  return errors;
}
