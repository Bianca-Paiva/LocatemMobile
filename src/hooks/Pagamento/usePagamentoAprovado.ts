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
  const acessoValido = !!metodo && processado;

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

  // Limpeza pós-confirmação: reseta o funil de pagamento e remove os itens pagos do
  // carrinho — evita que reapareçam numa compra futura ou que a tela quebre se o
  // usuário voltar para o Carrinho depois. Roda uma única vez, só quando o acesso é válido.
  useEffect(() => {
    if (!acessoValido) return;

    limparDadosPagamento();

    itens
      .filter((item) => item.selecionado)
      .forEach((item) => removerItem(item.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acessoValido]);

  function verDetalhesDoAluguel() {
    navigate('minhasReservas');
  }

  function voltarParaInicio() {
    navigate('home');
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
