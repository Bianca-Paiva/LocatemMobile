import React from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';

import { ImageOff } from 'lucide-react-native';

import type { LojaProduto } from '../../../pages/Avaliacao/Avaliacao.types';

import { styles } from './styles';

interface BadgeLojaProps {
  loja: LojaProduto;
}

export function BadgeLoja({
  loja,
}: BadgeLojaProps) {
  return (
    <View style={styles.badge}>
      <View
        style={[
          styles.logoContainer,
          !loja.logo &&
            styles.logoAusente,
        ]}
      >
        {loja.logo ? (
          <Image
            source={loja.logo}
            style={styles.logo}
            resizeMode="contain"
          />
        ) : (
          <ImageOff
            size={16}
            color="#A09E99"
          />
        )}
      </View>

      <View style={styles.container}>
        <Text style={styles.texto}>
          Loja oficial{' '}
        </Text>

        <Text style={styles.link}>
          {loja.nome}
        </Text>

        <Image
          source={require('../../../assets/verificadoAzul.png')}
          style={styles.verificado}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}