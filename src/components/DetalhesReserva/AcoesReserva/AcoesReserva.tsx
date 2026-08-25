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

 // Reserva aguardando aprovação do locador
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

  // Reserva aprovada, aguardando o pagamento dentro do prazo
  if (status === 'aguardandoPagamento') {
    return (
      <View style={styles.grupoBotoes}>

        {/* Segue para o pagamento */}
        <Pressable
          style={styles.botaoPrimario}
          onPress={onProsseguirAluguel}
        >
          <Text style={styles.textoBotao}>
            Efetuar pagamento
          </Text>
        </Pressable>

        {/* Cancela a solicitação antes do pagamento */}
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

  // Etapas intermediárias da locação: pagamento já confirmado, sem ação de
  // cancelamento disponível, apenas navegação de volta para a listagem
  if (
    status === 'preparandoEntrega' ||
    status === 'emTransporte' ||
    status === 'emAndamento' ||
    status === 'aguardandoDevolucao' ||
    status === 'devolucaoEmTransporte'
  ) {
    return (
      <View style={styles.grupoBotoes}>
        <Pressable
          style={styles.botaoSecundario}
          onPress={onVerLocacoes}
        >
          <Text style={styles.textoBotao}>
            Voltar para minhas reservas
          </Text>
        </Pressable>
      </View>
    );
  }

  // Locação concluída: incentiva a avaliação do locador
  if (status === 'finalizada') {
    return (
      <View style={styles.grupoBotoes}>
        <Pressable
          style={styles.botaoPrimario}
          onPress={onAvaliacao}
        >
          <Text style={styles.textoBotao}>
            Avaliar locação
          </Text>
        </Pressable>

        <Pressable
          style={styles.botaoSecundario}
          onPress={onVerLocacoes}
        >
          <Text style={styles.textoBotao}>
            Voltar para minhas reservas
          </Text>
        </Pressable>
      </View>
    );
  }

  // Recusada ou cancelada: oferece iniciar uma nova solicitação
  if (status === 'recusada' || status === 'cancelada') {
    return (
      <View style={styles.grupoBotoes}>
        <Pressable
          style={styles.botaoPrimario}
          onPress={onSolicitarNovaReserva}
        >
          <Text style={styles.textoBotao}>
            Solicitar nova reserva
          </Text>
        </Pressable>

        <Pressable
          style={styles.botaoSecundario}
          onPress={onVerLocacoes}
        >
          <Text style={styles.textoBotao}>
            Voltar para minhas reservas
          </Text>
        </Pressable>
      </View>
    );
  }

  return null;
}