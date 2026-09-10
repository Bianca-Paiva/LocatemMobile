import { useEffect } from 'react';
import { usePagamentoStore } from '../usePagamentoStore';

const TEMPO_PROCESSAMENTO_MS = 5000;

interface UseProcessandoPagamentoReturn {
  /** false enquanto a tela redireciona por método ausente/inválido (mesma regra usada em Selecionar Cartão/Pix). */
  metodoValido: boolean;
}

export function useProcessandoPagamento(navigate: (route: string) => void): UseProcessandoPagamentoReturn {
  // Método de pagamento já deve ter sido escolhido (Carrinho -> Método de Pagamento) antes de chegar aqui — sem ele, não há o que processar.
  const { metodo, marcarPagamentoProcessado } = usePagamentoStore();
  const metodoValido = metodo !== null;

  // Redireciona caso o método seja ausente/inválido — mesma regra usada em Selecionar Cartão/Pix.
  useEffect(() => {
    if (!metodoValido) {
      navigate('carrinho');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metodoValido]);

  // Agenda o avanço para "Pagamento Aprovado" após o tempo de processamento.
  useEffect(() => {
    if (!metodoValido) return;

    const timer = setTimeout(() => {
      marcarPagamentoProcessado();
      navigate('pagamentoAprovado');
    }, TEMPO_PROCESSAMENTO_MS);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metodoValido]);

  return { metodoValido };
}
