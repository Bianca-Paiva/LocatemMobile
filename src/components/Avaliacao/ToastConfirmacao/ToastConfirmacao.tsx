/**
 * Componente de avaliacao: exibe notas, formularios, estados vazios ou confirmacoes de avaliacao.
 */
import React from 'react';

import {
  View,
  Text,
} from 'react-native';

import { styles } from './styles';

interface ToastConfirmacaoProps {
  visivel: boolean;
  mensagem?: string;
}

/**
 * Notificação flutuante de sucesso.
 */
export function ToastConfirmacao({
  visivel,
  mensagem = 'Avaliação enviada com sucesso!',
}: ToastConfirmacaoProps) {
  if (!visivel) {
    return null;
  }

  return (
    <View style={styles.toast}>
      <Text style={styles.texto}>
        {mensagem}
      </Text>
    </View>
  );
}