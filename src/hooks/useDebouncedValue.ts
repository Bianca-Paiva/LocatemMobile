import { useEffect, useState } from 'react';

/**
 * Retorna uma versão "atrasada" (debounced) do valor recebido: só atualiza
 * depois que o valor parar de mudar por `delayMs` milissegundos.
 *
 * Uso típico: digitação em um campo de busca. Mantém o `TextInput`
 * respondendo a cada tecla normalmente (via o estado "cru"), mas só dispara
 * a busca/filtragem pesada depois que o usuário parar de digitar — evita
 * refiltrar a lista inteira a cada caractere.
 *
 * @param value valor "cru", que muda a cada digitação
 * @param delayMs tempo de espera sem mudanças antes de propagar o valor (padrão: 300ms)
 */
export function useDebouncedValue<T>(value: T, delayMs: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    // Se `value` mudar de novo antes do tempo passar, cancela o timeout
    // anterior — só o último valor digitado "sobrevive".
    return () => clearTimeout(timeoutId);
  }, [value, delayMs]);

  return debouncedValue;
}
