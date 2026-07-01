import React from 'react';
import { TouchableOpacity, Image, Text, View } from 'react-native';
import { ProductCardProps } from './types';
import styles from './styles';

export const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  const { imageUrl, title, storeName, price, period } = product;

  // Formata o preço de número (18) para a moeda local (R$ 18,00)
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Image 
        source={{ uri: imageUrl }} 
        style={styles.image} 
        resizeMode="cover"
      />
      
      <View style={styles.contentContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        
        <Text style={styles.storeName} numberOfLines={1}>
          {storeName}
        </Text>
        
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{formattedPrice}</Text>
          <Text style={styles.period}>/{period}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};