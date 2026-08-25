import React from 'react';

import {
  View,
  Text,
  Pressable,
} from 'react-native';

import type {
  StatusReserva,
} from '../../../pages/Reservas/MinhasReservas/MinhasReservas.types';

import { styles } from './styles';

interface AcoesReservaProps {
  status: StatusReserva;

  onCancelarSolicitacao?: () => void;

  onVerLocacoes?: () => void;

  onAvaliacao?: () => void;

  onProsseguirAluguel?: () => void;

  onVoltarReservas?: () => void;

  onSolicitarNovaReserva?: () => void;
}

export default function AcoesReserva({
  status,
  onCancelarSolicitacao,
  onVerLocacoes,
  onAvaliacao,
  onProsseguirAluguel,
  onVoltarReservas,
  onSolicitarNovaReserva,
}: AcoesReservaProps) {

 // Reserva aguardando aprovação
if (status === 'pendente') {
  return (
    <View style={styles.grupoBotoes}>

      {/* Volta para a tela de reservas */}
      <Pressable
        style={styles.botaoSecundario}
        onPress={onVoltarReservas}
      >
        <Text style={styles.textoBotao}>
          Voltar para minhas reservas
        </Text>
      </Pressable>

      {/* Cancela a solicitação */}
      <Pressable
        style={styles.botaoPerigo}
        onPress={onCancelarSolicitacao}
      >
        <Text style={styles.textoBotaoPerigo}>
          Cancelar solicitação
        </Text>
      </Pressable>

    </View>
  );
}
}