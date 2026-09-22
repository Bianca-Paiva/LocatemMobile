import type { ImageSourcePropType } from 'react-native';

import type { LocacaoHistoricoData } from '../../Reservas/HistoricoLocacoes/HistoricoLocacoes.types';

/**
 * 'coletaParaEntrega': transportadora indo buscar a ferramenta COM O LOCADOR para entregar ao locatário.
 * 'retornoAoLocador': transportadora trazendo a ferramenta de volta do locatário ao locador.
 * (Nunca usar "Retirada"/"Devolução": ambíguo, pois a entrega é terceirizada.)
 */
export type TipoMovimentoLogisticoLocador = 'coletaParaEntrega' | 'retornoAoLocador';

export interface AgendaSemanaLocadorItem {
  /** Único por evento (uma locação gera até 2: coleta e retorno). */
  id: string;
  locacaoId: string;
  /** "dd/mm/aaaa" */
  data: string;
  /** "09:00" */
  hora: string;
  ferramenta: string;
  imagem: ImageSourcePropType;
  /** Opcional no Mobile (ver LocacaoHistoricoData) — a linha some quando ausente. */
  locatario?: string;
  tipoMovimento: TipoMovimentoLogisticoLocador;
}

export interface ResumoHomeLocador {
  ferramentasAtivas: number;
  ferramentasCadastradasEsteMes: number;
  locacoesEmAndamento: number;
  solicitacoesPendentes: number;
  /** Soma das locações 'finalizada' com dataInicio no mês atual. */
  faturamentoMesAtual: number;
  faturamentoMesAnterior: number;
}

export type SolicitacaoRecenteLocador = LocacaoHistoricoData;
