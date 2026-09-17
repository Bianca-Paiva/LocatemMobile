import type { ReservaData } from '../MinhasReservas/MinhasReservas.types';

/**
 * Status que aparecem no Histórico do locador — apenas locações já encerradas.
 * Locações em andamento ficam em "Gerenciar Locações".
 */
export type StatusHistorico = 'finalizada' | 'recusada' | 'cancelada';

/** Aba selecionada no filtro do histórico ('todas' + cada status encerrado) */
export type FiltroHistorico = 'todas' | StatusHistorico;

/**
 * Locação vista pela perspectiva do LOCADOR.
 *
 * Na Web esses dois campos já existem em `LocacaoData`
 * (pages/Locacoes/MinhasLocacoes/MinhasLocacoes.types.ts). No Mobile o
 * `ReservaData` foi escrito só para a perspectiva do locatário, então eles
 * entram aqui como opcionais até o fluxo do locador ser ligado ao contexto.
 *
 * Quando a API do locador entrar, o ideal é mover `locadorId` e `locatario`
 * direto para `ReservaData` e apagar esta interface.
 */
export interface LocacaoHistoricoData extends ReservaData {
  /** Identificador do locador dono da ferramenta — usado para filtrar o histórico pelo locador autenticado. */
  locadorId?: string;
  /** Nome do locatário que fez a solicitação — exibido nas telas do locador. */
  locatario?: string;
}
