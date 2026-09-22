// Portado de LOCATEM-WEB-REACT/src/utils/Formatacao/valorMonetario.ts para
// manter o mesmo comportamento entre as plataformas.

/** "45,00" -> 45. Aceita vírgula ou ponto como separador decimal. */
export function paraNumero(valorStr: string): number {
  const numero = Number(valorStr.replace(/\./g, '').replace(',', '.'));
  return Number.isFinite(numero) ? numero : 0;
}

/** 45 -> "R$ 45,00". (Sem separador de milhar, igual à Web.) */
export function formatarValorMonetario(valor: number): string {
  return `R$ ${valor.toFixed(2).replace('.', ',')}`;
}
