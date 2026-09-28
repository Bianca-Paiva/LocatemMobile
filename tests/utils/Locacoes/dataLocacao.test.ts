/** Cenarios cobertos pelos testes de dataLocacao. */
import {
  parseDataIso,
  formatarIso,
  formatarDataBr,
  getHojeIso,
  formatarDataCurta,
  adicionarHorasAPartirDeAgora,
  adicionarDias,
  compararDatasIso,
} from '../../../src/utils/Locacoes/dataLocacao';

describe('parseDataIso', () => {
  it('converte "yyyy-mm-dd" em Date sem fuso horário', () => {
    const data = parseDataIso('2025-07-23');
    expect(data!.getFullYear()).toBe(2025);
    expect(data!.getMonth()).toBe(6);
    expect(data!.getDate()).toBe(23);
  });

  it('retorna null para string vazia ou malformada', () => {
    expect(parseDataIso('')).toBeNull();
    expect(parseDataIso('0000-00-00')).toBeNull();
  });
});

describe('formatarIso', () => {
  it('converte Date em "yyyy-mm-dd" com zero à esquerda', () => {
    expect(formatarIso(new Date(2025, 0, 5))).toBe('2025-01-05');
  });
});

describe('formatarDataBr', () => {
  it('formata "yyyy-mm-dd" para "dd/mm/aaaa"', () => {
    expect(formatarDataBr('2025-07-23')).toBe('23/07/2025');
  });

  it('retorna string vazia para entrada inválida', () => {
    expect(formatarDataBr('')).toBe('');
  });
});

describe('getHojeIso', () => {
  it('retorna a data de hoje no formato ISO', () => {
    const hoje = new Date();
    const esperado = formatarIso(hoje);
    expect(getHojeIso()).toBe(esperado);
  });
});

describe('formatarDataCurta', () => {
  it('formata "yyyy-mm-dd" para "dd Mmm"', () => {
    expect(formatarDataCurta('2025-08-10')).toBe('10 Ago');
  });

  it('retorna string vazia para entrada inválida', () => {
    expect(formatarDataCurta('')).toBe('');
  });
});

describe('adicionarHorasAPartirDeAgora', () => {
  it('retorna uma data ISO com a hora zerada', () => {
    const resultado = adicionarHorasAPartirDeAgora(0);
    expect(resultado).toBe(getHojeIso());
  });

  it('avança para o dia seguinte quando as horas ultrapassam a meia-noite', () => {
    jest.useFakeTimers().setSystemTime(new Date(2025, 5, 10, 23, 0, 0));
    expect(adicionarHorasAPartirDeAgora(2)).toBe('2025-06-11');
    jest.useRealTimers();
  });

  it('mantém o mesmo dia quando o horário resultante ainda está no mesmo dia', () => {
    jest.useFakeTimers().setSystemTime(new Date(2025, 5, 10, 8, 0, 0));
    expect(adicionarHorasAPartirDeAgora(2)).toBe('2025-06-10');
    jest.useRealTimers();
  });
});

describe('adicionarDias', () => {
  it('soma dias a uma data ISO', () => {
    expect(adicionarDias('2025-07-23', 5)).toBe('2025-07-28');
  });

  it('subtrai dias quando o valor é negativo', () => {
    expect(adicionarDias('2025-07-23', -5)).toBe('2025-07-18');
  });

  it('avança corretamente entre meses', () => {
    expect(adicionarDias('2025-01-30', 5)).toBe('2025-02-04');
  });

  it('avança corretamente entre anos', () => {
    expect(adicionarDias('2025-12-30', 5)).toBe('2026-01-04');
  });

  it('retorna string vazia para data inválida', () => {
    expect(adicionarDias('', 5)).toBe('');
  });
});

describe('compararDatasIso', () => {
  it('retorna -1 quando a primeira data é anterior', () => {
    expect(compararDatasIso('2025-01-01', '2025-01-02')).toBe(-1);
  });

  it('retorna 1 quando a primeira data é posterior', () => {
    expect(compararDatasIso('2025-01-02', '2025-01-01')).toBe(1);
  });

  it('retorna 0 quando as datas são iguais', () => {
    expect(compararDatasIso('2025-01-01', '2025-01-01')).toBe(0);
  });

  it('compara corretamente datas em anos diferentes', () => {
    expect(compararDatasIso('2024-12-31', '2025-01-01')).toBe(-1);
  });
});
