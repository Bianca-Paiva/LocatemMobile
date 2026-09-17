import React, { useEffect, useMemo, useState } from 'react';

import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '../../../components/Layout/Header';
import CabecalhoPagina from '../../../components/Layout/CabecalhoPagina/CabecalhoPagina';
import EstadoVazio from '../../../components/Reservas/MinhasReservas/EstadoVazio/EstadoVazio';
import Abas from '../../../components/Ferramentas/MinhasFerramentas/Abas/Abas';
import LocacaoHistoricoCard from '../../../components/Ferramentas/MinhasFerramentas/HistoricosLocacoes/LocacaoHistoricoCard/LocacaoHistoricoCard';

import type { AbaItem } from '../../../components/Ferramentas/MinhasFerramentas/Abas/types';
import type {
  FiltroHistorico,
  LocacaoHistoricoData,
  StatusHistorico,
} from './HistoricoLocacoes.types';

import { useAuth } from '../../../hooks/Auth/useAuth';
import { useReservaStore } from '../../../hooks/Reservas/useReservaStore';

import { styles } from './styles';

interface HistoricoLocacoesProps {
  navigate: (route: string) => void;
}

const ABAS: AbaItem<FiltroHistorico>[] = [
  { key: 'todas', label: 'Todas' },
  { key: 'finalizada', label: 'Finalizadas' },
  { key: 'recusada', label: 'Recusadas' },
  { key: 'cancelada', label: 'Canceladas' },
];

const STATUS_ENCERRADOS: StatusHistorico[] = [
  'finalizada',
  'recusada',
  'cancelada',
];

export default function HistoricoLocacoes({navigate,}: HistoricoLocacoesProps) {
  const { usuario } = useAuth();
  const { reservas, setReservaSelecionada } = useReservaStore();

  const [filtro, setFiltro] = useState<FiltroHistorico>('todas');
  const [expandidos, setExpandidos] = useState<Set<string>>(new Set());

  // Tela exclusiva do locador — mesma guarda da Web.
  useEffect(() => {
    if (!usuario || usuario.tipo !== 'locador') {
      navigate('home');
    }
  }, [usuario, navigate]);

  // `locadorId` ainda não existe no tipo `Usuario` do Mobile (só na Web).
  // Quando o fluxo do locador for ligado à API, adicione o campo em
  // types/Auth/usuario.types.ts e remova este cast.
  const locadorIdAtual = (
    usuario as (typeof usuario & { locadorId?: string }) | null
  )?.locadorId;

  /**
   * Só o histórico das ferramentas do locador logado, e só locações já
   * encerradas (finalizada, recusada ou cancelada) — locações em andamento
   * ficam em Gerenciar Locações.
   *
   * Enquanto as reservas do mock não trouxerem `locadorId`, o filtro por
   * locador é ignorado e a tela mostra todas as locações encerradas.
   */
  const historicoCompleto = useMemo<LocacaoHistoricoData[]>(() => {
    const encerradas = (reservas as LocacaoHistoricoData[]).filter((l) =>
      STATUS_ENCERRADOS.includes(l.status as StatusHistorico)
    );

    if (!locadorIdAtual) {
      return encerradas;
    }

    return encerradas.filter(
      (l) => l.locadorId && l.locadorId === locadorIdAtual
    );
  }, [reservas, locadorIdAtual]);

  const contagem = useMemo(() => {
    const base: Record<FiltroHistorico, number> = {
      todas: historicoCompleto.length,
      finalizada: 0,
      recusada: 0,
      cancelada: 0,
    };

    historicoCompleto.forEach((l) => {
      base[l.status as StatusHistorico] += 1;
    });

    return base;
  }, [historicoCompleto]);

  const historicoFiltrado = useMemo(
    () =>
      filtro === 'todas'
        ? historicoCompleto
        : historicoCompleto.filter((l) => l.status === filtro),
    [historicoCompleto, filtro]
  );

  if (!usuario || usuario.tipo !== 'locador') {
    return null;
  }

  // Alterna o card expandido/recolhido (múltiplos cards podem ficar abertos ao mesmo tempo)
  const alternarExpansao = (id: string) => {
    setExpandidos((atual) => {
      const proximo = new Set(atual);

      if (proximo.has(id)) {
        proximo.delete(id);
      } else {
        proximo.add(id);
      }

      return proximo;
    });
  };

  const handleVerDetalhes = (id: string) => {
    const locacaoClicada = historicoFiltrado.find((l) => l.id === id);

    if (locacaoClicada) {
      setReservaSelecionada(locacaoClicada);
      navigate('detalhesReserva');
    }
  };

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['bottom', 'left', 'right']}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Header />

        <View style={styles.containerCont}>
          <CabecalhoPagina
            titulo="Histórico de Locações"
            subtitulo="Acompanhe todas as locações encerradas das suas ferramentas."
            style={styles.cabecalho}
          />

          <Abas
            abas={ABAS}
            ativo={filtro}
            onChange={setFiltro}
            contagem={contagem}
          />

          {historicoFiltrado.length === 0 ? (
            <EstadoVazio
              titulo="Nenhuma locação no histórico"
              descricao="Locações finalizadas, recusadas ou canceladas aparecerão aqui."
            />
          ) : (
            <View style={styles.lista}>
              {historicoFiltrado.map((locacao) => (
                <LocacaoHistoricoCard
                  key={locacao.id}
                  locacao={locacao}
                  expandido={expandidos.has(locacao.id)}
                  onToggle={alternarExpansao}
                  onVerDetalhes={handleVerDetalhes}
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
