import { useState } from 'react';
import type { FormaPagamento } from '../../types/cartao.types';
import { usePagamentoStore } from '../usePagamentoStore';

// Formas de pagamento que utilizam um cartão salvo e, por isso, seguem para a tela "Selecionar Cartão".
const FORMAS_COM_CARTAO: FormaPagamento[] = ['credito', 'debito'];

interface UseMetodoPagamentoReturn {
  /** Total da compra, definido pelo Carrinho ao tocar em "Continuar para Pagamento". */
  total: number;
  /** Forma de pagamento marcada no momento, ou null se nenhuma foi escolhida. */
  formaSelecionada: FormaPagamento | null;
  /** Marca a forma de pagamento selecionada; o avanço de tela só ocorre em `continuarPagamento`. */
  selecionarForma: (forma: FormaPagamento) => void;
  /** Usado pelo botão "Continuar Pagamento" do resumo — único ponto que avança para a próxima tela, para qualquer forma de pagamento. */
  continuarPagamento: () => void;
}

export function useMetodoPagamento(navigate: (route: string) => void): UseMetodoPagamentoReturn {
  const { valor: total, setMetodoPagamento } = usePagamentoStore();
  const [formaSelecionada, setFormaSelecionada] = useState<FormaPagamento | null>(null);

  function irParaProximaTela(forma: FormaPagamento) {
    // Guarda a forma escolhida no contexto para a próxima tela (Selecionar Cartão/Pix já leem daqui).
    setMetodoPagamento(forma);

    if (FORMAS_COM_CARTAO.includes(forma)) {
      navigate('selecionarCartao');
      return;
    }

    navigate('pagamentoPix');
  }

  function selecionarForma(forma: FormaPagamento) {
    // Apenas marca a forma escolhida — o avanço para a próxima tela (Selecionar Cartão/Pix)
    // só acontece ao tocar em "Continuar Pagamento", para qualquer forma de pagamento.
    setFormaSelecionada(forma);
  }

  function continuarPagamento() {
    if (!formaSelecionada) return;

    irParaProximaTela(formaSelecionada);
  }

  return {
    total,
    formaSelecionada,
    selecionarForma,
    continuarPagamento,
  };
}
