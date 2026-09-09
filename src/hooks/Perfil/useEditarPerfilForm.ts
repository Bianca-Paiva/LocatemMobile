import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { PerfilFormData, Usuario } from '../../types/usuario.types';

const onlyDigits = (value: string) => value.replace(/\D/g, '');
const validPhone = (value: string) => onlyDigits(value).length === 10 || onlyDigits(value).length === 11;
const validCEP = (value: string) => onlyDigits(value).length === 8;
const validDocument = (value: string, isCNPJ: boolean) => onlyDigits(value).length === (isCNPJ ? 14 : 11);

export function useEditarPerfilForm(usuario: Usuario) {
  const [alerta, setAlerta] = useState<{ titulo: string; mensagem?: string } | null>(null);
  const isCNPJ = usuario.tipo === 'locador';

  const defaultValues = useMemo<PerfilFormData>(() => ({
    nome: usuario.nome,
    telefone: usuario.telefone,
    documento: usuario.documento,
    cep: '',
    logradouro: usuario.endereco || '',
    numero: '',
  }), [usuario]);

  const form = useForm<PerfilFormData>({ defaultValues, mode: 'onBlur' });

  const validar = (data: PerfilFormData) => {
    const errors: Partial<Record<keyof PerfilFormData, string>> = {};
    if (!data.nome.trim()) errors.nome = 'O nome é obrigatório';
    if (data.nome.trim() && data.nome.trim().split(/\s+/).length < 2) errors.nome = 'Digite seu nome completo';
    if (!validPhone(data.telefone)) errors.telefone = 'Digite um telefone válido com DDD';
    if (!validDocument(data.documento, isCNPJ)) errors.documento = isCNPJ ? 'CNPJ inválido' : 'CPF inválido';
    if (!validCEP(data.cep)) errors.cep = 'Digite um CEP válido';
    if (!data.logradouro.trim()) errors.logradouro = 'O endereço é obrigatório';
    if (!data.numero.trim()) errors.numero = 'O número é obrigatório';
    return errors;
  };

  const submit = (onValid: (data: PerfilFormData) => void) =>
    form.handleSubmit(data => {
      const errors = validar(data);
      if (Object.keys(errors).length) {
        Object.entries(errors).forEach(([field, message]) => form.setError(field as keyof PerfilFormData, { type: 'manual', message }));
        setAlerta({ titulo: 'Confira seus dados', mensagem: Object.values(errors)[0] });
        return;
      }
      setAlerta(null);
      onValid(data);
    })();

  return { ...form, isCNPJ, alerta, setAlerta, submit };
}
