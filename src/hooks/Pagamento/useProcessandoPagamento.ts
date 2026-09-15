import { useEffect, useRef } from 'react';
import { usePagamentoStore } from '../usePagamentoStore';
import { useCarrinhoStore } from '../useCarrinhoStore';
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

const TEMPO_PROCESSAMENTO_MS = 5000;

// Mesma mensagem usada em MinhasReservas.mock.ts para reservas com pagamento
// já confirmado — mantém o texto consistente com o restante da tela "Minhas Reservas".
const MENSAGEM_PAGAMENTO_CONFIRMADO = 'O pagamento foi confirmado e a entrega está sendo preparada';

function formatarMoeda(valor: number): string {
  return `R$ ${valor.toFixed(2).replace('.', ',')}`;
}

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
  // "Seu aluguel será entregue em até 3 horas" exibido na tela de sucesso.
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

interface UseProcessandoPagamentoReturn {
  /** false enquanto a tela redireciona por método ausente/inválido (mesma regra usada em Selecionar Cartão/Pix). */
  metodoValido: boolean;
}

export function useProcessandoPagamento(navigate: (route: string) => void): UseProcessandoPagamentoReturn {
  // Método de pagamento já deve ter sido escolhido (Carrinho -> Método de Pagamento) antes de chegar aqui — sem ele, não há o que processar.
  const { metodo, marcarPagamentoProcessado } = usePagamentoStore();
  const { itens } = useCarrinhoStore();
  const { adicionarReserva } = useReservaStore();
  const metodoValido = metodo !== null;

  // Itens pagos = os que estavam selecionados no carrinho ao continuar para o
  // pagamento. Lido em ref (não em estado) porque só precisa do valor no
  // instante em que o timer de processamento dispara lá embaixo — não deve
  // disparar nenhum re-render nem recriar o timer se o carrinho mudar
  // enquanto esta tela estiver em exibição.
  const itensPagosRef = useRef<ItemCarrinho[]>(itens.filter((item) => item.selecionado));

  // Redireciona caso o método seja ausente/inválido — mesma regra usada em Selecionar Cartão/Pix.
  useEffect(() => {
    if (!metodoValido) {
      navigate('carrinho');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metodoValido]);

  // CORREÇÃO: a reserva/aluguel de cada item pago não era criada em nenhum
  // ponto do fluxo Carrinho -> Pagamento, então a ferramenta paga nunca
  // chegava a existir em "Minhas Reservas" (a tela só lê do ReservaContext,
  // via useReservaStore). Este é o único lugar do funil onde "pagamento
  // aprovado" é, de fato, decidido — por isso a reserva é criada exatamente
  // aqui, junto com marcarPagamentoProcessado(), e não como efeito colateral
  // da tela de sucesso (PagamentoAprovado é apenas exibição: sua montagem não
  // deveria ser a responsável por gravar dados de negócio).
  useEffect(() => {
    if (!metodoValido) return;

    const timer = setTimeout(() => {
      itensPagosRef.current.forEach((item) => {
        adicionarReserva(montarDadosReservaPago(item));
      });

      marcarPagamentoProcessado();
      navigate('pagamentoAprovado');
    }, TEMPO_PROCESSAMENTO_MS);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metodoValido]);

  return { metodoValido };
}
