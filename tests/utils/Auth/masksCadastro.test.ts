import { formatDocument } from '../../../src/utils/Auth/masksCadastro';

describe('formatDocument', () => {
  describe('userType = locatario (CPF)', () => {
    it('formata CPF completo', () => {
      expect(formatDocument('12345678910', 'locatario')).toBe('123.456.789-10');
    });

    it('formata progressivamente enquanto digita', () => {
      expect(formatDocument('123', 'locatario')).toBe('123');
      expect(formatDocument('1234', 'locatario')).toBe('123.4');
      expect(formatDocument('123456', 'locatario')).toBe('123.456');
    });

    it('limita a 14 caracteres (tamanho do CPF formatado)', () => {
      expect(formatDocument('123456789109999', 'locatario')).toBe('123.456.789-10');
    });

    it('remove caracteres não numéricos antes de formatar', () => {
      expect(formatDocument('123.456.789-10', 'locatario')).toBe('123.456.789-10');
    });
  });

  describe('userType = locador (CNPJ)', () => {
    it('formata CNPJ completo', () => {
      expect(formatDocument('12345678000199', 'locador')).toBe('12.345.678/0001-99');
    });

    it('formata progressivamente enquanto digita', () => {
      expect(formatDocument('12', 'locador')).toBe('12');
      expect(formatDocument('123', 'locador')).toBe('12.3');
      expect(formatDocument('123456', 'locador')).toBe('12.345.6');
    });

    it('limita a 18 caracteres (tamanho do CNPJ formatado)', () => {
      expect(formatDocument('123456780001999999', 'locador')).toBe('12.345.678/0001-99');
    });
  });

  it('o mesmo número bruto gera formatações diferentes conforme o userType', () => {
    const numero = '12345678910';
    expect(formatDocument(numero, 'locatario')).toBe('123.456.789-10');
    expect(formatDocument(numero, 'locador')).not.toBe(formatDocument(numero, 'locatario'));
  });
});
