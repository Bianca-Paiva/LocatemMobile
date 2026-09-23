import React, { useEffect } from 'react';
import {
  View,
  ScrollView,
} from 'react-native';

import Header from '../../../components/Layout/Header';
// TEM QUE CORRIGIR O CABEÇALHO DA PÁGINA PARA RECEBER A AÇÃO DE STATUS, POIS ELE ESTÁ SENDO USADO EM OUTRAS TELAS TAMBÉM
import CabecalhoPagina from '../../../components/Layout/CabecalhoPagina/CabecalhoPagina';

import EtiquetaStatus from '../../../components/Locacoes/MinhasLocacoes/EtiquetaStatus/EtiquetaStatus';
import LocacaoResumoCard from '../../../components/Locacoes/DetalhesLocacao/LocacaoResumoCard/LocacaoResumoCard';
import PainelStatusLocacao from '../../../components/Locacoes/DetalhesLocacao/PainelStatusLocacao/PainelStatusLocacao';
import AcoesLocacao from '../../../components/Locacoes/DetalhesLocacao/AcoesLocacao/AcoesLocacao';

import { useLocacaoStore } from '../../../hooks/Locacoes/useLocacaoStore';

import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';

interface DetalhesLocacaoProps {
  navigate: (route: string) => void;
}

export default function DetalhesLocacao({
  navigate,
}: DetalhesLocacaoProps) {
  const {
    locacaoSelecionada,
    atualizarLocacao,
  } = useLocacaoStore();

  useEffect(() => {
    if (!locacaoSelecionada) {
      navigate('minhasLocacoes');
    }
  }, [locacaoSelecionada]);

  if (!locacaoSelecionada) {
    return null;
  }

  const {
    status,
    motivoRecusa,
    motivoCancelamento,
    horaInicio,
    horaFim,
  } = locacaoSelecionada;

  const handleCancelarSolicitacao = () => {
    const mensagem =
      'Esta locacao foi cancelada por você.';

    atualizarLocacao(
      locacaoSelecionada.id,
      {
        status: 'cancelada',
        mensagemStatus: mensagem,
        motivoCancelamento: mensagem,
      }
    );
  };

  const handleVerLocacoes = () => {
    navigate('minhasLocacoes');
  };

  const handleProsseguirAluguel = () => {
    // Fluxo de pagamento
  };

  const handleVoltarLocacoes = () => {
    navigate('minhasLocacoes');
  };

  const handleAvaliacao = () => {
    navigate('avaliacao');
  };

  const handleSolicitarNovaLocacao = () => {
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
           titulo="Detalhes da Locacao"
           acao={
             <EtiquetaStatus
               status={status}
             />
           }
         />
         <LocacaoResumoCard
           locacao={locacaoSelecionada}
         />
         <PainelStatusLocacao
           status={status}
           motivoRecusa={motivoRecusa}
           motivoCancelamento={
             motivoCancelamento
           }
           horaInicio={horaInicio}
           horaFim={horaFim}
         />
         <AcoesLocacao
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
           onVoltarLocacoes={
             handleVoltarLocacoes
           }
           onSolicitarNovaLocacao={
             handleSolicitarNovaLocacao
           }
         />
      </View>
      </ScrollView>
      </SafeAreaView>
    </>
  );
}