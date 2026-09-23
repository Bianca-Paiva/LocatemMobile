import { useEffect, useRef } from 'react';
import { usePagamentoStore } from './usePagamentoStore';
import { useCarrinhoStore } from '../../Carrinho/useCarrinhoStore';
import { useLocacaoStore } from '../../Locacoes/useLocacaoStore';
import { calcularResumoAvaliacoes } from '../../../utils/Avaliacao/avaliacoesResumo';
import {
  adicionarDias,
  formatarDataBr,
  formatarDataCurta,
  getHojeIso,
  parseDataIso,
} from '../../../utils/Locacoes/dataLocacao';
import type { ItemCarrinho } from '../../../context/Checkout/Carrinho/CarrinhoContext';
import type { LocacaoData } from '../../../pages/Locacoes/MinhasLocacoes/MinhasLocacoes.types';

const TEMPO_PROCESSAMENTO_MS = 5000;

// Mesma mensagem usada em MinhasLocacoes.mock.ts para locacoes com pagamento
// já confirmado — mantém o texto consistente com o restante da tela "Minhas Locacoes".
const MENSAGEM_PAGAMENTO_CONFIRMADO = 'O pagamento foi confirmado e a entrega está sendo preparada';

function formatarMoeda(valor: number): string {
  return `R$ ${valor.toFixed(2).replace('.', ',')}`;
}

/**
 * Converte um item pago do carrinho em uma LocacaoData, para que ele passe a
 * aparecer em "Minhas Locacoes" assim que o pagamento é aprovado. O fluxo de
 * Carrinho não coleta data/horário de entrega (diferente de "Solicitar
 * Locacao"), então o período é contado a partir de hoje pelos `dias` de
 * locação escolhidos no carrinho.
 */
function montarDadosLocacaoPago(item: ItemCarrinho): Omit<LocacaoData, 'id'> {
  const hojeIso = getHojeIso();
  const fimIso = adicionarDias(hojeIso, item.dias);
  const anoFim = parseDataIso(fimIso)?.getFullYear() ?? new Date().getFullYear();

  const precoDiaria = Number(String(item.produto.price).replace(',', '.')) || 0;
  const valorTotal = precoDiaria * item.quantidade * item.dias;

  // Média/quantidade de avaliações sempre calculadas a partir das avaliações
  // reais do produto, nunca de `rating`/`reviewCount` fixos — mesma regra
  // usada em useSolicitarLocacao.ts e ProductScreen.
  const resumoAvaliacoes = calcularResumoAvaliacoes(item.produto.avaliacoes);

  // Sem horário de entrega escolhido neste fluxo (diferente de "Solicitar
  // Locacao"): usa a hora atual como início da janela, coerente com o aviso
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
  const { adicionarLocacao } = useLocacaoStore();
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

  // CORREÇÃO: a locacao/aluguel de cada item pago não era criada em nenhum
  // ponto do fluxo Carrinho -> Pagamento, então a ferramenta paga nunca
  // chegava a existir em "Minhas Locacoes" (a tela só lê do LocacaoContext,
  // via useLocacaoStore). Este é o único lugar do funil onde "pagamento
  // aprovado" é, de fato, decidido — por isso a locacao é criada exatamente
  // aqui, junto com marcarPagamentoProcessado(), e não como efeito colateral
  // da tela de sucesso (PagamentoAprovado é apenas exibição: sua montagem não
  // deveria ser a responsável por gravar dados de negócio).
  useEffect(() => {
    if (!metodoValido) return;

    const timer = setTimeout(() => {
      itensPagosRef.current.forEach((item) => {
        adicionarLocacao(montarDadosLocacaoPago(item));
      });

      marcarPagamentoProcessado();
      navigate('pagamentoAprovado');
    }, TEMPO_PROCESSAMENTO_MS);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metodoValido]);

  return { metodoValido };
}
