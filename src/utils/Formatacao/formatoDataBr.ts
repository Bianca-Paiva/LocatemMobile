// Portado de LOCATEM-WEB-REACT/src/utils/Formatacao/formatoDataBr.ts para
// manter o mesmo comportamento entre as plataformas.

const MESES_ABREV = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

/** Converte "dd/mm/aaaa" em Date, sem depender de fuso horário. Retorna null se vazia/malformada. */
export function paraDataBr(dataBr: string): Date | null {
  if (!dataBr) return null;

  const [dia, mes, ano] = dataBr.split('/').map(Number);
  if (!dia || !mes || !ano) return null;

  return new Date(ano, mes - 1, dia);
}

/** "dd/mm/aaaa" -> "dd Mon", ex: "23 Jul". */
export function formatarDiaMes(dataBr: string): string {
  const data = paraDataBr(dataBr);
  if (!data) return '';

  return `${String(data.getDate()).padStart(2, '0')} ${MESES_ABREV[data.getMonth()]}`;
}

/** "dd/mm/aaaa" -> "dd Mon aaaa". */
export function formatarDiaMesAno(dataBr: string): string {
  const data = paraDataBr(dataBr);
  if (!data) return '';

  return `${formatarDiaMes(dataBr)} ${data.getFullYear()}`;
}

/** Ex: "15 Jul – 18 Jul 2025". */
export function formatarPeriodoBr(dataInicioBr: string, dataFimBr: string): string {
  const inicio = paraDataBr(dataInicioBr);
  const fim = paraDataBr(dataFimBr);
  if (!inicio || !fim) return '';

  return `${formatarDiaMes(dataInicioBr)} – ${formatarDiaMes(dataFimBr)} ${fim.getFullYear()}`;
}
