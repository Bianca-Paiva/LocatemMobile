import { useEffect, useState } from 'react';
import type { Cartao, MetodoPagamento } from '../../types/cartao.types';
import { usePagamentoStore } from '../usePagamentoStore';

interface UseSelecionarCartaoReturn {
  /** Método de pagamento ativo (lido do contexto), ou null enquanto redireciona. */
  metodoPagamento: MetodoPagamento | null;
  /** Título da página, já ajustado conforme o método ("Crédito"/"Débito"). */
  titulo: string;
  /** Cartões salvos compatíveis com o método de pagamento ativo. */
  cartoesFiltrados: Cartao[];
  /** Id do cartão atualmente selecionado, ou null. */
  cartaoSelecionadoId: number | null;
  /** Marca visualmente/logicamente um cartão como selecionado. */
  selecionarCartao: (id: number) => void;
  /** Guarda o tipo do novo cartão e navega para o formulário de cadastro. */
  adicionarNovoCartao: () => void;
  /** Valida a seleção, guarda o cartão escolhido e avança o pagamento. */
  confirmarPagamento: () => void;
  /** Mensagem de erro (ex: nenhum cartão selecionado), ou null. */
  erro: string | null;
}

export function useSelecionarCartao(navigate: (route: string) => void): UseSelecionarCartaoReturn {
  const { metodo: metodoBruto, cartoesSalvos, setCartaoPagamento } = usePagamentoStore();
  const [cartaoSelecionadoId, setCartaoSelecionadoId] = useState<number | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  // A tela de Selecionar Cartão só é válida para crédito/débito — PIX não passa por aqui.
  const metodoValido = metodoBruto === 'credito' || metodoBruto === 'debito';
  const metodoPagamento: MetodoPagamento | null = metodoValido ? metodoBruto : null;

  // Redireciona caso o método seja ausente ou inválido. Não existe, nesse app, uma tela
  // dedicada de "escolher método de pagamento" fora deste fluxo — o Carrinho é o ponto de
  // entrada mais próximo do checkout, então é para lá que o usuário volta.
  useEffect(() => {
    if (!metodoValido) {
      navigate('carrinho');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metodoValido]);

  const cartoesFiltrados = metodoPagamento
    ? cartoesSalvos.filter((cartao) => cartao.metodoPagamento === metodoPagamento)
    : [];

  const titulo =
    metodoPagamento === 'credito'
      ? 'Selecionar Cartão de Crédito'
      : metodoPagamento === 'debito'
        ? 'Selecionar Cartão de Débito'
        : 'Selecionar cartão';

  function selecionarCartao(id: number) {
    setCartaoSelecionadoId(id);
    setErro(null);
  }

  function adicionarNovoCartao() {
    if (!metodoPagamento) return;

    // O tipo do novo cartão (crédito/débito) já está no PagamentoContext;
    // as telas de cadastro (AdicionarCartaoCredito/AdicionarCartaoDebito) são
    // dedicadas por tipo e não precisam de nada adicional para isso.
    navigate(metodoPagamento === 'credito' ? 'adicionarCartaoCredito' : 'adicionarCartaoDebito');
  }

  function confirmarPagamento() {
    if (!cartaoSelecionadoId) {
      setErro('Selecione um cartão para continuar.');
      return;
    }

    const cartaoEscolhido = cartoesFiltrados.find((cartao) => cartao.id === cartaoSelecionadoId);

    if (cartaoEscolhido) {
      // Guarda apenas dados não sensíveis do cartão escolhido para o pagamento atual.
      setCartaoPagamento({
        id: String(cartaoEscolhido.id),
        bandeira: cartaoEscolhido.bandeira,
        ultimosDigitos: cartaoEscolhido.final,
      });
    }

    navigate('processandoPagamento');
  }

  return {
    metodoPagamento,
    titulo,
    cartoesFiltrados,
    cartaoSelecionadoId,
    selecionarCartao,
    adicionarNovoCartao,
    confirmarPagamento,
    erro,
  };
}
