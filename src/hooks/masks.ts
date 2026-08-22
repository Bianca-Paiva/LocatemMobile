// Máscaras reaproveitadas 1:1 da versão Web (são funções puras de string,
// não dependem de nada específico do DOM, então funcionam iguais no RN).

/** Formata "00000000" -> "00000-000" enquanto o usuário digita. */
export function maskCEP(valor: string): string {
  const apenasNumeros = valor.replace(/\D/g, '').slice(0, 8);

  if (apenasNumeros.length <= 5) return apenasNumeros;

  return `${apenasNumeros.slice(0, 5)}-${apenasNumeros.slice(5)}`;
}

/** Máscara simples de moeda: mantém apenas números e vírgula decimal (2 casas). */
export function maskMoeda(valor: string): string {
  const limpo = valor.replace(/[^\d,]/g, '');
  const partes = limpo.split(',');

  if (partes.length <= 1) return limpo;

  return `${partes[0]},${partes.slice(1).join('').slice(0, 2)}`;
}

/** Converte "45,00" -> 45.00 (number). Usado só na validação/soma, nunca pra exibir. */
export function moedaParaNumero(valor: string): number {
  if (!valor) return 0;
  return Number(valor.replace(/\./g, '').replace(',', '.')) || 0;
}
