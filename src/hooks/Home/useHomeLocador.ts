// Portado de LOCATEM-WEB-REACT/src/hooks/Home/useHomeLocador.ts, adaptado às
// fontes de dados do Mobile:
//  - ferramentas do locador: `useFerramentas()` (FerramentasContext);
//  - locações do locador: `useLocacaoStore()` (mesmo store das demais telas).

import { useMemo } from 'react';

import { useAuth } from '../Auth/useAuth';
import { useLocacaoStore } from '../Locacoes/useLocacaoStore';
import { useFerramentas } from '../../context/Ferramentas/FerramentasContext';

import { paraDataBr } from '../../utils/Formatacao/formatoDataBr';
import { paraNumero } from '../../utils/Formatacao/valorMonetario';

import type { StatusLocacao } from '../../pages/Locacoes/MinhasLocacoes/MinhasLocacoes.types';
import type { LocacaoHistoricoData } from '../../pages/Locacoes/HistoricoLocacoes/HistoricoLocacoes.types';
import type {
  AgendaSemanaLocadorItem,
  ResumoHomeLocador,
  SolicitacaoRecenteLocador,
} from '../../pages/home/HomeLocador/HomeLocador.types';

// Limite único de ferramentas mostradas no carrossel (a página não repete o slice).
const LIMITE_MINHAS_FERRAMENTAS = 4;
const LIMITE_SOLICITACOES_RECENTES = 4;
const LIMITE_AGENDA_SEMANA = 4;

// A Web também considera 'confirmada' aqui, mas esse status ainda não existe
// em `StatusLocacao` no Mobile.
const STATUS_COLETA_PARA_ENTREGA: StatusLocacao[] = ['preparandoEntrega', 'emTransporte'];
const STATUS_RETORNO_AO_LOCADOR: StatusLocacao[] = ['aguardandoDevolucao', 'devolucaoEmTransporte'];

/**
 * Chave numérica para ordenar da mais recente para a mais antiga.
 * Assume os ids gerados pelo LocacaoContext (`r-<timestamp>-<n>`); ids
 * puramente numéricos (mocks) são usados como estão.
 */
function chaveRecencia(id: string): number {
  const numerico = Number(id);
  if (!Number.isNaN(numerico)) return numerico;

  const digitos = Number(id.replace(/\D/g, ''));
  return Number.isNaN(digitos) ? 0 : digitos;
}

/** "R$ 45,00" -> 45 */
function valorLocacaoParaNumero(valor: string): number {
  return paraNumero(valor.replace('R$', '').trim());
}

/** Data em "dd/mm/aaaa" (formato das locacoes). */
function estaNoMes(dataBr: string | undefined, mes: number, ano: number): boolean {
  if (!dataBr) return false;

  const data = paraDataBr(dataBr);
  return !!data && data.getMonth() === mes && data.getFullYear() === ano;
}

/** Data em ISO (formato de `criadoEm` das ferramentas) — `estaNoMes` não serve para ela. */
function estaNoMesIso(dataIso: string, mes: number, ano: number): boolean {
  const data = new Date(dataIso);
  return data.getMonth() === mes && data.getFullYear() === ano;
}

export function useHomeLocador() {
  const { usuario } = useAuth();
  const { ferramentas } = useFerramentas();
  const { locacoes } = useLocacaoStore();

  // `locadorId` ainda não existe no tipo `Usuario` do Mobile (só na Web) —
  // mesmo cast usado em HistoricoLocacoes.
  const locadorIdAtual = (
    usuario as (typeof usuario & { locadorId?: string }) | null
  )?.locadorId;

  // O FerramentasContext já guarda só as ferramentas do usuário atual, então
  // não há filtro por locador aqui (na Web o catálogo é global).
  const minhasFerramentas = ferramentas;

  // Sem `locadorId` no usuário, não filtra (mesmo comportamento de HistoricoLocacoes).
  const minhasLocacoes = useMemo<LocacaoHistoricoData[]>(() => {
    const todas = locacoes as LocacaoHistoricoData[];

    if (!locadorIdAtual) {
      return todas;
    }

    return todas.filter((l) => l.locadorId && l.locadorId === locadorIdAtual);
  }, [locacoes, locadorIdAtual]);

  const resumo = useMemo<ResumoHomeLocador>(() => {
    const agora = new Date();
    const mesAtual = agora.getMonth();
    const anoAtual = agora.getFullYear();

    const primeiroDiaMesAnterior = new Date(anoAtual, mesAtual - 1, 1);
    const mesAnterior = primeiroDiaMesAnterior.getMonth();
    const anoDoMesAnterior = primeiroDiaMesAnterior.getFullYear();

    const faturamentoDoMes = (mes: number, ano: number) =>
      minhasLocacoes
        .filter((l) => l.status === 'finalizada' && estaNoMes(l.dataInicio, mes, ano))
        .reduce((total, l) => total + valorLocacaoParaNumero(l.valor), 0);

    return {
      ferramentasAtivas: minhasFerramentas.filter((f) => f.status === 'ativa').length,
      ferramentasCadastradasEsteMes: minhasFerramentas.filter((f) =>
        estaNoMesIso(f.criadoEm, mesAtual, anoAtual)
      ).length,
      locacoesEmAndamento: minhasLocacoes.filter((l) => l.status === 'emAndamento').length,
      solicitacoesPendentes: minhasLocacoes.filter((l) => l.status === 'pendente').length,
      faturamentoMesAtual: faturamentoDoMes(mesAtual, anoAtual),
      faturamentoMesAnterior: faturamentoDoMes(mesAnterior, anoDoMesAnterior),
    };
  }, [minhasFerramentas, minhasLocacoes]);

  const solicitacoesRecentes = useMemo<SolicitacaoRecenteLocador[]>(
    () =>
      [...minhasLocacoes]
        .sort((a, b) => chaveRecencia(b.id) - chaveRecencia(a.id))
        .slice(0, LIMITE_SOLICITACOES_RECENTES),
    [minhasLocacoes]
  );

  const agendaSemana = useMemo<AgendaSemanaLocadorItem[]>(() => {
    const eventos: AgendaSemanaLocadorItem[] = [];

    minhasLocacoes.forEach((l) => {
      if (STATUS_COLETA_PARA_ENTREGA.includes(l.status)) {
        eventos.push({
          id: `${l.id}-coleta`,
          locacaoId: l.id,
          data: l.dataInicio,
          hora: l.horaInicio,
          ferramenta: l.produto,
          imagem: l.imagem,
          locatario: l.locatario,
          tipoMovimento: 'coletaParaEntrega',
        });
      }

      if (STATUS_RETORNO_AO_LOCADOR.includes(l.status)) {
        eventos.push({
          id: `${l.id}-retorno`,
          locacaoId: l.id,
          data: l.dataFim,
          hora: l.horaFim,
          ferramenta: l.produto,
          imagem: l.imagem,
          locatario: l.locatario,
          tipoMovimento: 'retornoAoLocador',
        });
      }
    });

    return eventos
      .sort((a, b) => (paraDataBr(a.data)?.getTime() ?? 0) - (paraDataBr(b.data)?.getTime() ?? 0))
      .slice(0, LIMITE_AGENDA_SEMANA);
  }, [minhasLocacoes]);

  return {
    usuario,
    resumo,
    solicitacoesRecentes,
    agendaSemana,
    minhasFerramentas: minhasFerramentas.slice(0, LIMITE_MINHAS_FERRAMENTAS),
  };
}
