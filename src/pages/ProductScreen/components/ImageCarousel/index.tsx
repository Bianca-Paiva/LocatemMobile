import React, { useState } from 'react';
import { 
  View, 
  FlatList, 
  Image, 
  Dimensions, 
  NativeSyntheticEvent, 
  NativeScrollEvent,
  TouchableOpacity
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Assumindo que usa Expo ou react-native-vector-icons

import { styles } from './styles';
import { ImageCarouselProps } from './types';

const { width } = Dimensions.get('window');

export function ImageCarousel({ images }: ImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Função para calcular qual imagem está visível e atualizar o "dot"
  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    setActiveIndex(roundIndex);
  };

  const renderItem = ({ item }: { item: string }) => (
    <View style={styles.imageContainer}>
      <Image 
        source={{ uri: item }} 
        style={styles.image} 
        resizeMode="contain" // Mantém a proporção da imagem (ideal para produtos)
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        horizontal
        pagingEnabled // Faz o "snap" exato por foto
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16} // Garante a fluidez da leitura do scroll
      />

      {/* Indicadores de Paginação (Dots) */}
      <View style={styles.paginationContainer}>
        {images.map((_, index) => (
          <View
            key={index.toString()}
            style={[
              styles.dot,
              activeIndex === index && styles.activeDot
            ]}
          />
        ))}
      </View>

      {/* Botão de Favorito sobreposto (conforme layout) */}
      <TouchableOpacity style={styles.favoriteButton} activeOpacity={0.7}>
        <MaterialIcons name="favorite-border" size={24} color="#666" />
      </TouchableOpacity>
    </View>
  );
}