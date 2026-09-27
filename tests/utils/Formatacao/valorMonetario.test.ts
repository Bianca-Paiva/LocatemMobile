import { paraNumero, formatarValorMonetario } from '../../../src/utils/Formatacao/valorMonetario';

describe('valorMonetario', () => {
  describe('paraNumero', () => {
    it('converte string com vírgula decimal em número', () => {
      expect(paraNumero('45,00')).toBe(45);
      expect(paraNumero('89,90')).toBe(89.9);
    });

    it('converte string com ponto decimal em número', () => {
      expect(paraNumero('45.00')).toBe(4500); // ponto é tratado como separador de milhar
    });

    it('remove separador de milhar (ponto) antes de aplicar a vírgula decimal', () => {
      expect(paraNumero('1.234,56')).toBe(1234.56);
    });

    it('retorna 0 para valores não numéricos', () => {
      expect(paraNumero('abc')).toBe(0);
    });

    it('retorna 0 para string vazia', () => {
      expect(paraNumero('')).toBe(0);
    });
  });

  describe('formatarValorMonetario', () => {
    it('formata número inteiro com "R$" e duas casas decimais', () => {
      expect(formatarValorMonetario(45)).toBe('R$ 45,00');
    });

    it('formata número com casas decimais trocando ponto por vírgula', () => {
      expect(formatarValorMonetario(89.9)).toBe('R$ 89,90');
    });

    it('arredonda para duas casas decimais', () => {
      expect(formatarValorMonetario(10.005)).toBe('R$ 10,01');
    });

    it('formata zero corretamente', () => {
      expect(formatarValorMonetario(0)).toBe('R$ 0,00');
    });

    it('não usa separador de milhar (mesmo comportamento da Web)', () => {
      expect(formatarValorMonetario(1234.5)).toBe('R$ 1234,50');
    });
  });

  describe('round-trip', () => {
    it('paraNumero(formatarValorMonetario(x)) preserva o valor para números "redondos"', () => {
      const valores = [0, 45, 89.9, 150];
      valores.forEach((valor) => {
        const formatado = formatarValorMonetario(valor).replace('R$ ', '');
        expect(paraNumero(formatado)).toBeCloseTo(valor, 2);
      });
    });
  });
});
