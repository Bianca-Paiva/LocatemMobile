import { formatarIntervaloHorario } from '../../../src/utils/Formatacao/horario';

describe('formatarIntervaloHorario', () => {
  it('converte um horário de início na janela de 3 horas', () => {
    expect(formatarIntervaloHorario('09:00')).toBe('09:00 às 12:00');
  });

  it('funciona para horários próximos da virada do dia (soma sem normalizar 24h)', () => {
    // A função apenas soma 3 horas numericamente — não normaliza para o dia
    // seguinte. Documentamos o comportamento atual (23 + 3 = "26:00").
    expect(formatarIntervaloHorario('23:00')).toBe('23:00 às 26:00');
  });

  it('preenche a hora final com zero à esquerda quando necessário', () => {
    expect(formatarIntervaloHorario('05:30')).toBe('05:30 às 08:00');
  });

  it('retorna string vazia quando o horário é vazio', () => {
    expect(formatarIntervaloHorario('')).toBe('');
  });

  it('retorna o valor original quando a hora não é um número válido', () => {
    expect(formatarIntervaloHorario('abc')).toBe('abc');
  });

  it('ignora os minutos e usa apenas a hora de início', () => {
    expect(formatarIntervaloHorario('14:45')).toBe('14:45 às 17:00');
  });
});
