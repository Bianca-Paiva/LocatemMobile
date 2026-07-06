import React from 'react';
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { styles } from './styles';
import { ProductHeaderInfoProps } from './types';

export function ProductHeaderInfo({ 
  title, 
  rating, 
  reviewsCount, 
  price 
}: ProductHeaderInfoProps) {
  
  // Função auxiliar para formatar o preço de forma elegante
  const formatPrice = (value: number) => {
    return value.toLocaleString('pt-BR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title} numberOfLines={3}>
        {title}
      </Text>

      <View style={styles.ratingContainer}>
        {/* Ícone de estrela preto conforme layout */}
        <MaterialIcons name="star" size={16} color="#000000" />
        <Text style={styles.ratingText}>
          {rating} ({reviewsCount} avaliações)
        </Text>
      </View>

      <View style={styles.priceContainer}>
        <Text style={styles.priceValue}>R${formatPrice(price)}</Text>
        <Text style={styles.priceSuffix}>/dia</Text>
      </View>
    </View>
  );
}