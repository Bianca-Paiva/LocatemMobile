import React from 'react';
import {
  View,
  Text,
} from 'react-native';

import type {
  StatusAvaliacao,
} from '../../../pages/Avaliacao/Avaliacao.types';

import { styles } from './styles';

interface EstadoVazioProps {
  status: StatusAvaliacao;
}

const TEXTOS_POR_STATUS: Record<
  StatusAvaliacao,
  {
    titulo: string;
    texto: string;
  }
> = {
  pendente: {
    titulo: 'Parabéns, você está em dia!',
    texto: 'Nenhuma avaliação pendente por aqui.',
  },

  realizada: {
    titulo: 'Ainda sem avaliações realizadas.',
    texto: 'Suas avaliações enviadas aparecerão aqui.',
  },
};

/**
 * Exibido quando a aba
 * (Pendentes ou Realizadas)
 * não possui nenhum item.
 */
export function EstadoVazio({
  status,
}: EstadoVazioProps) {
  const { titulo, texto } =
    TEXTOS_POR_STATUS[status];

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        {titulo}
      </Text>

      <Text style={styles.texto}>
        {texto}
      </Text>
    </View>
  );
}