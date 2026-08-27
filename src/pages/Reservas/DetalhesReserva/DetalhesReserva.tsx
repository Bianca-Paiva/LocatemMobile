import React, { useEffect } from 'react';
import {
  View,
  ScrollView,
} from 'react-native';

import Header from '../../../components/Header';
// TEM QUE CORRIGIR O CABEÇALHO DA PÁGINA PARA RECEBER A AÇÃO DE STATUS, POIS ELE ESTÁ SENDO USADO EM OUTRAS TELAS TAMBÉM
import CabecalhoPagina from '../../../components/CabecalhoPagina/CabecalhoPagina';

import EtiquetaStatus from '../../../components/MinhasReservas/EtiquetaStatus/EtiquetaStatus';
import ReservaResumoCard from '../../../components/DetalhesReserva/ReservaResumoCard/ReservaResumoCard';
import PainelStatusReserva from '../../../components/DetalhesReserva/PainelStatusReserva/PainelStatusReserva';
import AcoesReserva from '../../../components/DetalhesReserva/AcoesReserva/AcoesReserva';

import { useReservaStore } from '../../../hooks/Reservas/useReservaStore';

import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';

interface DetalhesReservaProps {
  navigate: (route: string) => void;
}

export default function DetalhesReserva({
  navigate,
}: DetalhesReservaProps) {
  const {
    reservaSelecionada,
    atualizarReserva,
  } = useReservaStore();

  useEffect(() => {
    if (!reservaSelecionada) {
      navigate('minhasReservas');
    }
  }, [reservaSelecionada]);

  if (!reservaSelecionada) {
    return null;
  }

  const {
    status,
    motivoRecusa,
    motivoCancelamento,
    horaInicio,
    horaFim,
  } = reservaSelecionada;

  const handleCancelarSolicitacao = () => {
    const mensagem =
      'Esta reserva foi cancelada por você.';

    atualizarReserva(
      reservaSelecionada.id,
      {
        status: 'cancelada',
        mensagemStatus: mensagem,
        motivoCancelamento: mensagem,
      }
    );
  };

  const handleVerLocacoes = () => {
    navigate('minhasReservas');
  };

  const handleProsseguirAluguel = () => {
    // Fluxo de pagamento
  };

  const handleVoltarReservas = () => {
    navigate('minhasReservas');
  };

  const handleAvaliacao = () => {
    navigate('avaliacao');
  };

  const handleSolicitarNovaReserva = () => {
    navigate('busca');
  };

  return (
    <>
     <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
     

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
       <Header />
      <View style={styles.containerCont}>
        
         <CabecalhoPagina
           titulo="Detalhes da Reserva"
           acao={
             <EtiquetaStatus
               status={status}
             />
           }
         />
         <ReservaResumoCard
           reserva={reservaSelecionada}
         />
         <PainelStatusReserva
           status={status}
           motivoRecusa={motivoRecusa}
           motivoCancelamento={
             motivoCancelamento
           }
           horaInicio={horaInicio}
           horaFim={horaFim}
         />
         <AcoesReserva
           status={status}
           onCancelarSolicitacao={
             handleCancelarSolicitacao
           }
           onVerLocacoes={
             handleVerLocacoes
           }
           onAvaliacao={
             handleAvaliacao
           }
           onProsseguirAluguel={
             handleProsseguirAluguel
           }
           onVoltarReservas={
             handleVoltarReservas
           }
           onSolicitarNovaReserva={
             handleSolicitarNovaReserva
           }
         />
      </View>
      </ScrollView>
      </SafeAreaView>
    </>
  );
}