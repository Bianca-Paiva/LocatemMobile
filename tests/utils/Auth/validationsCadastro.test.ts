import {
  validateName,
  validateEmail,
  validatePassword,
  validateCpf,
  validateCnpj,
} from '../../../src/utils/Auth/validationsCadastro';

describe('validateName', () => {
  it('valida nome com 2+ palavras de 2+ letras', () => {
    expect(validateName('João Silva')).toBe(true);
  });

  it('invalida nome com apenas uma palavra', () => {
    expect(validateName('João')).toBe(false);
  });

  it('invalida quando alguma palavra tem menos de 2 letras', () => {
    expect(validateName('João A')).toBe(false);
  });

  it('ignora espaços nas pontas', () => {
    expect(validateName('  João Silva  ')).toBe(true);
  });

  it('invalida string vazia', () => {
    expect(validateName('')).toBe(false);
  });
});

describe('validateEmail', () => {
  it('aceita e-mails válidos', () => {
    expect(validateEmail('usuario@exemplo.com')).toBe(true);
    expect(validateEmail('nome.sobrenome@dominio.com.br')).toBe(true);
  });

  it('rejeita e-mails sem @', () => {
    expect(validateEmail('usuarioexemplo.com')).toBe(false);
  });

  it('rejeita e-mails sem domínio', () => {
    expect(validateEmail('usuario@')).toBe(false);
  });

  it('rejeita e-mails com espaço', () => {
    expect(validateEmail('usu ario@exemplo.com')).toBe(false);
  });

  it('ignora espaços nas pontas antes de validar', () => {
    expect(validateEmail('  usuario@exemplo.com  ')).toBe(true);
  });
});

describe('validatePassword', () => {
  it('aceita senha com letras e números e 8+ caracteres', () => {
    expect(validatePassword('abcd1234')).toBe(true);
  });

  it('rejeita senha só com letras', () => {
    expect(validatePassword('abcdefgh')).toBe(false);
  });

  it('rejeita senha só com números', () => {
    expect(validatePassword('12345678')).toBe(false);
  });

  it('rejeita senha com menos de 8 caracteres', () => {
    expect(validatePassword('abc123')).toBe(false);
  });

  it('aceita senha com caracteres especiais além de letras/números', () => {
    expect(validatePassword('abc123!@#')).toBe(true);
  });
});

describe('validateCpf', () => {
  it('valida um CPF correto', () => {
    expect(validateCpf('529.982.247-25')).toBe(true);
  });

  it('invalida um CPF com dígitos verificadores incorretos', () => {
    expect(validateCpf('529.982.247-00')).toBe(false);
  });

  it('invalida CPFs com todos os dígitos iguais', () => {
    expect(validateCpf('111.111.111-11')).toBe(false);
  });
});

describe('validateCnpj', () => {
  it('valida um CNPJ correto', () => {
    expect(validateCnpj('11.222.333/0001-81')).toBe(true);
  });

  it('invalida um CNPJ com dígitos verificadores incorretos', () => {
    expect(validateCnpj('11.222.333/0001-00')).toBe(false);
  });

  it('invalida CNPJs com todos os dígitos iguais', () => {
    expect(validateCnpj('11.111.111/1111-11')).toBe(false);
  });
});
