import React from 'react';
import { TouchableOpacity, Image, Text, View } from 'react-native';
import { ProductCardProps } from './types';
import styles from './styles';

// Importação dos elementos de navegação
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/AppRoutes';

export const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  const { imageUrl, title, storeName, price, period } = product;

  // Formata o preço de número (18) para a moeda local (R$ 18,00)
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={ (event) => {
                 onPress?.(event);
                 navigation.navigate('ProductScreen');
                }}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
      <Image 
       source={
        typeof imageUrl === "string"
          ? { uri: imageUrl }
          : imageUrl
      }
        style={styles.image} 
        resizeMode="cover"
      />
      </View>
      
      <View style={styles.contentContainer}>
        {/* Limita o título a 2 linhas */}
        {/* Adiciona "..." caso ultrapasse o limite */}
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
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