/**
 * Helpers de data compartilhados pelo fluxo de locação (tela "Detalhes da
 * Locação" e o calendário de seleção de período).
 *
 * Portado de `web/src/utils/Locacao/dataLocacao.ts` para manter o mesmo
 * comportamento entre as plataformas. Todas as datas circulam como string
 * "yyyy-mm-dd", convertidas para `Date` "pura" (sem fuso horário) apenas
 * para cálculos.
 */

/** Converte "yyyy-mm-dd" em Date "pura", sem fuso horário. */
export function parseDataIso(dataIso: string): Date | null {
  if (!dataIso) return null;
  const [ano, mes, dia] = dataIso.split('-').map(Number);
  if (!ano || !mes || !dia) return null;
  return new Date(ano, mes - 1, dia);
}

/** Converte uma Date em string "yyyy-mm-dd". */
export function formatarIso(data: Date): string {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

/** Formata "yyyy-mm-dd" para "dd/mm/aaaa". */
export function formatarDataBr(dataIso: string): string {
  const data = parseDataIso(dataIso);
  if (!data) return '';
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  return `${dia}/${mes}/${data.getFullYear()}`;
}

/** Data de hoje como "yyyy-mm-dd". */
export function getHojeIso(): string {
  return formatarIso(new Date());
}

const MESES_ABREVIADOS = [
  'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
  'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez',
];

/** Formata "yyyy-mm-dd" para "dd Mmm" (ex: "10 Ago"), usado em resumos curtos de período (ex: ReservaData.periodo). */
export function formatarDataCurta(dataIso: string): string {
  const data = parseDataIso(dataIso);
  if (!data) return '';
  return `${String(data.getDate()).padStart(2, '0')} ${MESES_ABREVIADOS[data.getMonth()]}`;
}

/** Data (yyyy-mm-dd, hora zerada) resultante de somar `horas` a partir do momento atual. */
export function adicionarHorasAPartirDeAgora(horas: number): string {
  const data = new Date(Date.now() + horas * 60 * 60 * 1000);
  data.setHours(0, 0, 0, 0);
  return formatarIso(data);
}

/** Soma (ou subtrai, com valor negativo) dias a uma data ISO, retornando outra data ISO. */
export function adicionarDias(dataIso: string, dias: number): string {
  const data = parseDataIso(dataIso);
  if (!data) return '';
  data.setDate(data.getDate() + dias);
  return formatarIso(data);
}

/**
 * Compara duas datas ISO ("yyyy-mm-dd"). Como o formato é sempre zero-padded,
 * a comparação de strings já reflete a ordem cronológica — função existe só
 * para deixar as chamadas mais legíveis.
 */
export function compararDatasIso(a: string, b: string): number {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}
