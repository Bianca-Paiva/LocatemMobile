import React from 'react';
import {
  ScrollView,
  View,
} from 'react-native';

import Header from '../../../components/Layout/Header';
import CabecalhoPagina from '../../../components/Layout/CabecalhoPagina/CabecalhoPagina';
import LocacaoAbas from '../../../components/Locacoes/MinhasLocacoes/LocacaoAbas/LocacaoAbas';
import LocacaoCard from '../../../components/Locacoes/MinhasLocacoes/LocacaoCard/LocacaoCard';
import EstadoVazio from '../../../components/Locacoes/MinhasLocacoes/EstadoVazio/EstadoVazio';

import { useMinhasLocacoes } from '../../../hooks/Locacoes/useMinhasLocacoes';
import { useLocacaoStore } from '../../../hooks/Locacoes/useLocacaoStore';

import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';

interface MinhasLocacoesProps {
  navigate: (route: string) => void;
}

const ESTADO_VAZIO_TEXTO = {
  todas: {
    titulo: 'Nenhuma locacao por aqui',
    descricao:
      'Assim que você solicitar uma locação, ela aparecerá nesta tela.',
  },

  pendente: {
    titulo:
      'Nenhuma locacao aguardando aprovação',
    descricao:
      'Você não possui solicitações aguardando aprovação do locador.',
  },

  aguardandoPagamento: {
    titulo:
      'Nenhuma locacao aguardando pagamento',
    descricao:
      'Assim que uma locacao for aceita pelo locador, ela aparecerá aqui.',
  },

  preparandoEntrega: {
    titulo:
      'Nenhuma locacao em preparação',
    descricao:
      'Locacoes com pagamento confirmado aparecerão aqui.',
  },

  emTransporte: {
    titulo:
      'Nenhuma locacao em transporte',
    descricao:
      'Ferramentas a caminho do seu endereço aparecerão aqui.',
  },

  emAndamento: {
    titulo:
      'Nenhuma locacao em andamento',
    descricao:
      'Locações que você já recebeu aparecerão aqui.',
  },

  aguardandoDevolucao: {
    titulo:
      'Nenhuma locacao aguardando devolução',
    descricao:
      'Locacoes próximas da devolução aparecerão aqui.',
  },

  devolucaoEmTransporte: {
    titulo:
      'Nenhuma devolução em transporte',
    descricao:
      'Ferramentas retornando ao locador aparecerão aqui.',
  },

  finalizada: {
    titulo:
      'Nenhuma locacao finalizada',
    descricao:
      'Locações concluídas aparecerão aqui.',
  },

  recusada: {
    titulo:
      'Nenhuma locacao recusada',
    descricao:
      'Você não possui solicitações recusadas.',
  },

  cancelada: {
    titulo:
      'Nenhuma locacao cancelada',
    descricao:
      'Locacoes canceladas aparecerão aqui.',
  },
};

export default function MinhasLocacoes({
  navigate,
}: MinhasLocacoesProps) {
  const {
    locacoesFiltradas,
    filtro,
    setFiltro,
    contagem,
  } = useMinhasLocacoes();

  const {
    setLocacaoSelecionada,
  } = useLocacaoStore();

  const handleVerDetalhes = (
    id: string
  ) => {
    const locacaoClicada =
      locacoesFiltradas.find(
        (locacao) =>
          locacao.id === id
      );

    if (locacaoClicada) {
      setLocacaoSelecionada(
        locacaoClicada
      );

      navigate(
        'detalhesLocacao'
      );
    }
  };

  const estadoVazio =
    ESTADO_VAZIO_TEXTO[filtro];

  return (
    <>
     

    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
    
    
      <ScrollView
        style={styles.container}
        contentContainerStyle={
          styles.content
        }
        showsVerticalScrollIndicator={
          false
        }
      >
           <Header />
        {/* <CabecalhoPagina
          titulo="Minhas Locacoes"
          subtitulo="Acompanhe todas as suas solicitações de locacao."
        /> */}

        <View  style={styles.containerCont}>

        <LocacaoAbas
          filtro={filtro}
          onChange={setFiltro}
          contagem={contagem}
        />

        {locacoesFiltradas.length ===
        0 ? (
          <EstadoVazio
            titulo={
              estadoVazio.titulo
            }
            descricao={
              estadoVazio.descricao
            }
          />
        ) : (
          <View
            style={styles.lista}
          >
            {locacoesFiltradas.map(
              (locacao) => (
                <LocacaoCard
                  key={locacao.id}
                  locacao={locacao}
                  onVerDetalhes={
                    handleVerDetalhes
                  }
                />
              )
            )}
          </View>
        )}
        </View>
      </ScrollView>
    </SafeAreaView>
    </>
  );
}