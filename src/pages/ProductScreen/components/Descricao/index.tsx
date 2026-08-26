import React from 'react';
import { View, Text } from 'react-native';

import { DescricaoProps } from './types';
import { styles } from './styles';

export function Descricao({ texto }: DescricaoProps) {
  return (
    <View style={styles.descricaoWrapper}>
      <Text style={styles.titulo}>Descrição</Text>
      <Text style={styles.texto}>{texto}</Text>
    </View>
  );
}