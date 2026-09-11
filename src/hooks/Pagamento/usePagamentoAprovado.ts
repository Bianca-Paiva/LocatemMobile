import { useEffect, useRef, useState } from 'react';
import type { ImageSourcePropType } from 'react-native';

import { useCarrinhoStore } from '../useCarrinhoStore';
import { usePagamentoStore } from '../usePagamentoStore';
import { useReservaStore } from '../Reservas/useReservaStore';
import { calcularResumoAvaliacoes } from '../../utils/avaliacoesResumo';
import {
  adicionarDias,
  formatarDataBr,
  formatarDataCurta,
  getHojeIso,
  parseDataIso,
} from '../../utils/dataLocacao';
import type { ItemCarrinho } from '../../context/CarrinhoContext';
import type { ReservaData } from '../../pages/Reservas/MinhasReservas/MinhasReservas.types';
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

function formatarMoeda(valor: number): string {
  return `R$ ${valor.toFixed(2).replace('.', ',')}`;
}

// Mesma mensagem usada em MinhasReservas.mock.ts para reservas com pagamento
// já confirmado — mantém o texto consistente com o restante da tela "Minhas Reservas".
const MENSAGEM_PAGAMENTO_CONFIRMADO = 'O pagamento foi confirmado e a entrega está sendo preparada';

/**
 * Converte um item pago do carrinho em uma ReservaData, para que ele passe a
 * aparecer em "Minhas Reservas" assim que o pagamento é aprovado. O fluxo de
 * Carrinho não coleta data/horário de entrega (diferente de "Solicitar
 * Reserva"), então o período é contado a partir de hoje pelos `dias` de
 * locação escolhidos no carrinho.
 */
function montarDadosReservaPago(item: ItemCarrinho): Omit<ReservaData, 'id'> {
  const hojeIso = getHojeIso();
  const fimIso = adicionarDias(hojeIso, item.dias);
  const anoFim = parseDataIso(fimIso)?.getFullYear() ?? new Date().getFullYear();

  const precoDiaria = Number(String(item.produto.price).replace(',', '.')) || 0;
  const valorTotal = precoDiaria * item.quantidade * item.dias;

  // Média/quantidade de avaliações sempre calculadas a partir das avaliações
  // reais do produto, nunca de `rating`/`reviewCount` fixos — mesma regra
  // usada em useSolicitarReserva.ts e ProductScreen.
  const resumoAvaliacoes = calcularResumoAvaliacoes(item.produto.avaliacoes);

  // Sem horário de entrega escolhido neste fluxo (diferente de "Solicitar
  // Reserva"): usa a hora atual como início da janela, coerente com o aviso
  // "Seu aluguel será entregue em até 3 horas" exibido na tela.
  const horaAtual = `${String(new Date().getHours()).padStart(2, '0')}:00`;

  return {
    produto: item.produto.title,
    imagem: item.produto.images[0],
    periodo: `${formatarDataCurta(hojeIso)} – ${formatarDataCurta(fimIso)} ${anoFim}`,
    locador: item.produto.locador,
    status: 'preparandoEntrega',
    mensagemStatus: MENSAGEM_PAGAMENTO_CONFIRMADO,
    categoria: item.produto.categoria,
    avaliacaoLocador: resumoAvaliacoes.media,
    numeroAvaliacoes: resumoAvaliacoes.quantidade,
    localizacao: item.produto.localizacao,
    dataInicio: formatarDataBr(hojeIso),
    horaInicio: horaAtual,
    dataFim: formatarDataBr(fimIso),
    horaFim: horaAtual,
    quantidade: item.quantidade,
    valor: formatarMoeda(valorTotal),
  };
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
  const { adicionarReserva } = useReservaStore();

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
  // quando a limpeza abaixo remover os itens do contexto, nem duplicar/perder reservas
  // caso o carrinho mude enquanto esta tela estiver montada.
  const [itensPagos] = useState<ItemCarrinho[]>(() => itens.filter((item) => item.selecionado));

  const [produtos] = useState<ProdutoConfirmado[]>(() =>
    itensPagos.map((item) => ({
      id: item.id,
      nome: item.produto.title,
      imagem: item.produto.images[0],
      dias: item.dias,
      unidades: item.quantidade,
    })),
  );

  // CORREÇÃO: nenhum lugar do fluxo de Carrinho -> Pagamento criava uma
  // ReservaData ao final da compra, então o produto pago nunca chegava a
  // aparecer em "Minhas Reservas" (a tela só lê do ReservaContext). Cria uma
  // reserva por item pago assim que o acesso a esta tela é validado — só uma
  // vez por sessão de pagamento (guard via ref, já que "acessoValido" não
  // muda depois de montado e o efeito não deve repetir a criação em re-renders).
  const reservasCriadasRef = useRef(false);

  useEffect(() => {
    if (!acessoValido || reservasCriadasRef.current) return;
    reservasCriadasRef.current = true;

    itensPagos.forEach((item) => {
      adicionarReserva(montarDadosReservaPago(item));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acessoValido]);

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
    // Usa a chave dedicada 'minhasReservasPosPagamento' (resolvida em AppRoutes.tsx
    // para a rota real "MinhasReservas" com reset de pilha), e não 'MinhasFerramentasScreen'
    // (tela de gerenciamento de anúncios do locador, tela errada) nem a chave genérica
    // 'minhasReservas' (que apenas empilha e fica sujeita ao redirecionamento indevido
    // para o Carrinho — ver comentário em AppRoutes.tsx).
    navigate('minhasReservasPosPagamento');
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
