import {
  paraDataBr,
  formatarDiaMes,
  formatarDiaMesAno,
  formatarPeriodoBr,
} from '../../../src/utils/Formatacao/formatoDataBr';

describe('formatoDataBr', () => {
  describe('paraDataBr', () => {
    it('converte "dd/mm/aaaa" em Date sem depender de fuso horário', () => {
      const data = paraDataBr('23/07/2025');
      expect(data).not.toBeNull();
      expect(data!.getFullYear()).toBe(2025);
      expect(data!.getMonth()).toBe(6); // Julho = índice 6
      expect(data!.getDate()).toBe(23);
    });

    it('retorna null para string vazia', () => {
      expect(paraDataBr('')).toBeNull();
    });

    it('retorna null para strings malformadas (partes ausentes/zero)', () => {
      expect(paraDataBr('00/00/0000')).toBeNull();
      expect(paraDataBr('23/07')).toBeNull();
      expect(paraDataBr('abc')).toBeNull();
    });
  });

  describe('formatarDiaMes', () => {
    it('formata "dd/mm/aaaa" em "dd Mon"', () => {
      expect(formatarDiaMes('23/07/2025')).toBe('23 Jul');
    });

    it('preenche o dia com zero à esquerda quando necessário', () => {
      expect(formatarDiaMes('05/01/2025')).toBe('05 Jan');
    });

    it('retorna string vazia para entrada inválida', () => {
      expect(formatarDiaMes('')).toBe('');
      expect(formatarDiaMes('data-invalida')).toBe('');
    });

    it('mapeia corretamente os 12 meses abreviados', () => {
      const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
      meses.forEach((mesAbrev, index) => {
        const mes = String(index + 1).padStart(2, '0');
        expect(formatarDiaMes(`01/${mes}/2025`)).toBe(`01 ${mesAbrev}`);
      });
    });
  });

  describe('formatarDiaMesAno', () => {
    it('formata "dd/mm/aaaa" em "dd Mon aaaa"', () => {
      expect(formatarDiaMesAno('23/07/2025')).toBe('23 Jul 2025');
    });

    it('retorna string vazia para entrada inválida', () => {
      expect(formatarDiaMesAno('')).toBe('');
    });
  });

  describe('formatarPeriodoBr', () => {
    it('formata período com datas no mesmo ano', () => {
      expect(formatarPeriodoBr('15/07/2025', '18/07/2025')).toBe('15 Jul – 18 Jul 2025');
    });

    it('usa o ano da data final mesmo quando o período cruza o ano', () => {
      expect(formatarPeriodoBr('29/12/2025', '02/01/2026')).toBe('29 Dez – 02 Jan 2026');
    });

    it('retorna string vazia quando a data de início é inválida', () => {
      expect(formatarPeriodoBr('', '18/07/2025')).toBe('');
    });

    it('retorna string vazia quando a data de fim é inválida', () => {
      expect(formatarPeriodoBr('15/07/2025', '')).toBe('');
    });
  });
});
