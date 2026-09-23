import React from 'react';

import {
  View,
  Text,
} from 'react-native';

import type {
  StatusLocacao,
} from '../../../../pages/Locacoes/MinhasLocacoes/MinhasLocacoes.types';

import {
  STATUS_CONFIG,
} from './statusConfig';

import { styles } from './styles';

interface EtiquetaStatusProps {
  status: StatusLocacao;
}

export default function EtiquetaStatus({
  status,
}: EtiquetaStatusProps) {
  const config =
    STATUS_CONFIG[status];

  const Icone =
    config.icon;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            config.fundo,

          borderColor:
            config.borda,
        },
      ]}
    >
      <Icone
        size={14}
        color={config.cor}
      />

      <Text
        style={[
          styles.label,
          {
            color: config.cor,
          },
        ]}
      >
        {config.label}
      </Text>
    </View>
  );
}