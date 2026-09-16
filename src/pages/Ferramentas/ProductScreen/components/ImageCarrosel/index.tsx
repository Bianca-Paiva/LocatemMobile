import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ViewToken,
  ScrollView,
  LayoutChangeEvent,
} from 'react-native';

//estilos
import { styles } from './styles';

// Tipagem
import { ImagemCarrosselProps } from './types';




export function ImagemCarrossel({ images }: ImagemCarrosselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const flatListRef = useRef<FlatList<string>>(null);

  // Captura a largura exata do container para definir a largura do slide
  const onLayout = (event: LayoutChangeEvent) => {
    setContainerWidth(event.nativeEvent.layout.width);
  };

  // Otimização: Atualiza o index apenas quando o item passa de 50% de visibilidade na tela
  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setCurrentIndex(viewableItems[0].index);
      }
    },
    []
  );

  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 50 }).current;

  // Navegação Programática
  const goToIndex = (index: number) => {
    setCurrentIndex(index);
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  const goNext = () => {
    if (currentIndex < images.length - 1) {
      goToIndex(currentIndex + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      goToIndex(currentIndex - 1);
    }
  };

  return (
    <View style={styles.carrosselWrapper}>
      {/* Container Principal */}
      <View style={styles.imagemPrincipalContainer} onLayout={onLayout}>
        {/* Botão Anterior (Só renderiza se não for o primeiro) */}
        {currentIndex > 0 && (
          <TouchableOpacity
            style={[styles.navBtn, styles.navBtnLeft]}
            onPress={goPrev}
            activeOpacity={0.8}
            accessibilityLabel="Imagem anterior"
          >
            <Text style={styles.navBtnText}>‹</Text>
          </TouchableOpacity>
        )}

        {/* Carrossel Nativo */}
        {containerWidth > 0 && (
          <FlatList
            ref={flatListRef}
            data={images}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            renderItem={({ item, index }) => (
              <View style={{ width: containerWidth, padding: 12 }}>
                <Image
                  source={item }
                  style={styles.imagemPrincipal}
                  resizeMode="contain"
                />
              </View>
            )}
          />
        )}

        {/* Botão Próximo (Só renderiza se não for o último) */}
        {currentIndex < images.length - 1 && (
          <TouchableOpacity
            style={[styles.navBtn, styles.navBtnRight]}
            onPress={goNext}
            activeOpacity={0.8}
            accessibilityLabel="Próxima imagem"
          >
            <Text style={styles.navBtnText}>›</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Dots Indicator */}
      <View style={styles.dotsContainer}>
        {images.map((_, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.dot, i === currentIndex && styles.dotAtivo]}
            onPress={() => goToIndex(i)}
            activeOpacity={0.8}
            accessibilityLabel={`Ir para imagem ${i + 1}`}
          />
        ))}
      </View>

      {/* Thumbnails (Miniaturas) */}
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.thumbnailsContainer}
        >
          {images.map((img, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.thumbnail,
                i === currentIndex && styles.thumbnailAtivo,
              ]}
              onPress={() => goToIndex(i)}
              activeOpacity={0.8}
            >
              <Image source={img} style={styles.thumbnailImg} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

