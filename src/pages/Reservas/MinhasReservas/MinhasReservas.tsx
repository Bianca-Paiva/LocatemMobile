import React from 'react';
import {
  ScrollView,
  View,
} from 'react-native';

import Header from '../../../components/Header';
import CabecalhoPagina from '../../../components/CabecalhoPagina/CabecalhoPagina';
import ReservaAbas from '../../../components/MinhasReservas/ReservaAbas/ReservaAbas';
import ReservaCard from '../../../components/MinhasReservas/ReservaCard/ReservaCard';
import EstadoVazio from '../../../components/MinhasReservas/EstadoVazio/EstadoVazio';

import { useMinhasReservas } from '../../../hooks/Reservas/useMinhasReservas';
import { useReservaStore } from '../../../hooks/Reservas/useReservaStore';

import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';

interface MinhasReservasProps {
  navigate: (route: string) => void;
}

const ESTADO_VAZIO_TEXTO = {
  todas: {
    titulo: 'Nenhuma reserva por aqui',
    descricao:
      'Assim que você solicitar uma locação, ela aparecerá nesta tela.',
  },

  pendente: {
    titulo:
      'Nenhuma reserva aguardando aprovação',
    descricao:
      'Você não possui solicitações aguardando aprovação do locador.',
  },

  aguardandoPagamento: {
    titulo:
      'Nenhuma reserva aguardando pagamento',
    descricao:
      'Assim que uma reserva for aceita pelo locador, ela aparecerá aqui.',
  },

  preparandoEntrega: {
    titulo:
      'Nenhuma reserva em preparação',
    descricao:
      'Reservas com pagamento confirmado aparecerão aqui.',
  },

  emTransporte: {
    titulo:
      'Nenhuma reserva em transporte',
    descricao:
      'Ferramentas a caminho do seu endereço aparecerão aqui.',
  },

  emAndamento: {
    titulo:
      'Nenhuma reserva em andamento',
    descricao:
      'Locações que você já recebeu aparecerão aqui.',
  },

  aguardandoDevolucao: {
    titulo:
      'Nenhuma reserva aguardando devolução',
    descricao:
      'Reservas próximas da devolução aparecerão aqui.',
  },

  devolucaoEmTransporte: {
    titulo:
      'Nenhuma devolução em transporte',
    descricao:
      'Ferramentas retornando ao locador aparecerão aqui.',
  },

  finalizada: {
    titulo:
      'Nenhuma reserva finalizada',
    descricao:
      'Locações concluídas aparecerão aqui.',
  },

  recusada: {
    titulo:
      'Nenhuma reserva recusada',
    descricao:
      'Você não possui solicitações recusadas.',
  },

  cancelada: {
    titulo:
      'Nenhuma reserva cancelada',
    descricao:
      'Reservas canceladas aparecerão aqui.',
  },
};

export default function MinhasReservas({
  navigate,
}: MinhasReservasProps) {
  const {
    reservasFiltradas,
    filtro,
    setFiltro,
    contagem,
  } = useMinhasReservas();

  const {
    setReservaSelecionada,
  } = useReservaStore();

  const handleVerDetalhes = (
    id: string
  ) => {
    const reservaClicada =
      reservasFiltradas.find(
        (reserva) =>
          reserva.id === id
      );

    if (reservaClicada) {
      setReservaSelecionada(
        reservaClicada
      );

      navigate(
        'detalhesReserva'
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
          titulo="Minhas Reservas"
          subtitulo="Acompanhe todas as suas solicitações de reserva."
        /> */}

        <View  style={styles.containerCont}>

        <ReservaAbas
          filtro={filtro}
          onChange={setFiltro}
          contagem={contagem}
        />

        {reservasFiltradas.length ===
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
            {reservasFiltradas.map(
              (reserva) => (
                <ReservaCard
                  key={reserva.id}
                  reserva={reserva}
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