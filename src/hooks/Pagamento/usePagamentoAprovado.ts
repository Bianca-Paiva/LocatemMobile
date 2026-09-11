import { useEffect, useState } from 'react';
import type { ImageSourcePropType } from 'react-native';

import { useCarrinhoStore } from '../useCarrinhoStore';
import { usePagamentoStore } from '../usePagamentoStore';
import type { FormaPagamento } from '../../types/cartao.types';

// Mesmos rótulos usados em SeletorFormaPagamento — mantém o texto consistente em toda a tela de checkout.
const ROTULOS_METODO: Record<FormaPagamento, string> = {
  credito: 'Cartão de Crédito',
  debito: 'Cartão de Débito',
  pix: 'PIX',
};

function formatarDataHoraAtual(): string {
  const agora = new Date();
  const data = agora.toLocaleDateString('pt-BR');
  const hora = agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  return `${data} - ${hora}`;
}

export interface ProdutoConfirmado {
  id: string;
  nome: string;
  imagem: ImageSourcePropType;
  dias: number;
  unidades: number;
}

interface UsePagamentoAprovadoReturn {
  /** false enquanto a tela redireciona por acesso direto/indevido (sem passar por "Processando Pagamento"). */
  acessoValido: boolean;
  total: number;
  /** Forma de pagamento "crua", para quem precisa decidir algo por tipo (ex.: qual ícone exibir). */
  metodo: FormaPagamento | null;
  metodoFormatado: string;
  dataHora: string;
  produtos: ProdutoConfirmado[];
  verDetalhesDoAluguel: () => void;
  voltarParaInicio: () => void;
}

export function usePagamentoAprovado(navigate: (route: string) => void): UsePagamentoAprovadoReturn {
  const { itens, removerItem } = useCarrinhoStore();
  const { valor: total, metodo, cartao, processado, limparDadosPagamento } = usePagamentoStore();

  // Só é um acesso válido se o método estiver salvo E a etapa de processamento já tiver concluído — bloqueia acessar a tela sem passar pelo fluxo.
  const acessoValidoAoEntrar = !!metodo && processado;

  // "Congela" o resultado da validação no momento em que a tela é montada, em vez de
  // recalculá-lo a cada render. Isso evita que a limpeza do funil (função mais abaixo,
  // disparada só quando o usuário sai da tela) derrube acessoValido depois que
  // "metodo"/"processado" forem zerados no Context.
  const [acessoValido] = useState(() => acessoValidoAoEntrar);

  useEffect(() => {
    if (!acessoValido) {
      navigate('carrinho');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acessoValido]);

  const [dataHora] = useState(() => formatarDataHoraAtual());

  const metodoFormatado = (() => {
    if (!metodo) return 'Não informado';
    const rotulo = ROTULOS_METODO[metodo];
    return cartao ? `${rotulo} •••• ${cartao.ultimosDigitos}` : rotulo;
  })();

  // Itens pagos = os que estavam selecionados no carrinho ao continuar para o pagamento.
  // Capturado em estado (não recalculado a partir do carrinho) para não sumir da tela
  // quando a limpeza abaixo remover os itens do contexto.
  const [produtos] = useState<ProdutoConfirmado[]>(() =>
    itens
      .filter((item) => item.selecionado)
      .map((item) => ({
        id: item.id,
        nome: item.produto.title,
        imagem: item.produto.images[0],
        dias: item.dias,
        unidades: item.quantidade,
      })),
  );

  // CORREÇÃO: a limpeza do funil (limparDadosPagamento + remover itens pagos do
  // carrinho) não roda mais sozinha assim que a tela monta. Ela reseta o
  // PagamentoContext, que é compartilhado, e as telas anteriores do fluxo
  // (Processando Pagamento, Selecionar Cartão, Pix) continuam montadas por baixo
  // na pilha de navegação e têm um guard que redireciona para o Carrinho quando
  // o método de pagamento fica inválido. Ao zerar o Context na hora que a tela
  // aparecia, esse guard das telas de baixo disparava de novo e navegava para o
  // Carrinho por cima da tela de sucesso — era isso que fazia a tela "sumir"
  // sozinha pouco depois de aparecer. Agora a limpeza só acontece quando o
  // usuário sai desta tela pela ação dele mesmo (um dos botões abaixo).
  function limparFunilDePagamento() {
    limparDadosPagamento();

    itens
      .filter((item) => item.selecionado)
      .forEach((item) => removerItem(item.id));
  }

  function verDetalhesDoAluguel() {
    limparFunilDePagamento();
    navigate('minhasReservas');
  }

  function voltarParaInicio() {
    limparFunilDePagamento();
    navigate('HomeScreen');
  }

  return {
    acessoValido,
    total,
    metodo,
    metodoFormatado,
    dataHora,
    produtos,
    verDetalhesDoAluguel,
    voltarParaInicio,
  };
}
