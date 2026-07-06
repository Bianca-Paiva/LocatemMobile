import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import BtnPrincipal from '../../../../components/BtnPrincipal';

import { styles } from './styles';
import { ActionButtonsProps } from './types';

export function ActionButtons({ onRent, onAddToCart }: ActionButtonsProps) {
  return (
    <View style={styles.container}>
        <BtnPrincipal
            title="Locar"
            onPress={onRent}
        />

        <BtnPrincipal
            title="Adicionar ao Carrinho"
            onPress={onAddToCart}
            variant="secondary"
        />
    </View>
  );
}