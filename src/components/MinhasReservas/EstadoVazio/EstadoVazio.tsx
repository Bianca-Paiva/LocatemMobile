import React from 'react';

import {
  View,
  Text,
  Image,
} from 'react-native';

const calendarioIcon = require(
  '../../../assets/iconCalendarioReservas.png'
);

import { styles } from './styles';

interface EstadoVazioProps {
  titulo: string;
  descricao: string;
}

export default function EstadoVazio({
  titulo,
  descricao,
}: EstadoVazioProps) {
  return (
    <View style={styles.container}>
      <Image
        source={calendarioIcon}
        style={styles.icon}
        resizeMode="contain"
      />

      <Text style={styles.title}>
        {titulo}
      </Text>

      <Text style={styles.description}>
        {descricao}
      </Text>
    </View>
  );
}
