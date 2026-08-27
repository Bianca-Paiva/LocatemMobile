import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import ResumoSolicitacaoCard from '../../../components/SolicitacaoEnviada/ResumoSolicitacaoCard';
import { useReservaStore } from '../../../hooks/Reservas/useReservaStore';

import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';

interface SolicitacaoEnviadaProps {
  navigate: (route: string) => void;
}

export default function SolicitacaoEnviada({
  navigate,
}: SolicitacaoEnviadaProps) {
  const { reservaSelecionada } =
    useReservaStore();

  useEffect(() => {
    if (!reservaSelecionada) {
      navigate('home');
    }
  }, [reservaSelecionada]);

  const handleVerMinhasReservas = () => {
    navigate('minhasReservas');
  };

  const handleVoltarAoInicio = () => {
    navigate('home');
  };

  if (!reservaSelecionada) {
    return null;
  }

  return (
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
      <View style={styles.iconCircle}>
        <Image
          source={require('../../../../assets/images/icons/checkIcon.png')}
          style={styles.icon}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.title}>
        Solicitação enviada!
      </Text>

      <Text style={styles.description}>
        O locador analisará sua
        solicitação e você será
        notificado assim que ela
        for aceita ou recusada.
      </Text>

      <View style={styles.alert}>
        <Text style={styles.alertIcon}>
          🔔
        </Text>

        <Text style={styles.alertText}>
          O locador tem até 24 horas
          para responder.
        </Text>
      </View>

      <ResumoSolicitacaoCard
        reserva={reservaSelecionada}
      />

      <View style={styles.actions}>
        <Pressable
          style={styles.primaryButton}
          onPress={
            handleVerMinhasReservas
          }
        >
          <Text
            style={
              styles.primaryButtonText
            }
          >
            Ir para Minhas Reservas
          </Text>
        </Pressable>

        <Pressable
          style={
            styles.secondaryButton
          }
          onPress={
            handleVoltarAoInicio
          }
        >
          <Text
            style={
              styles.secondaryButtonText
            }
          >
            Voltar ao início
          </Text>
        </Pressable>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}