// React e hooks
import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Image,
  Dimensions,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ImageSourcePropType,
} from 'react-native';

import {styles} from './styles'; // Importa os estilos do arquivo styles.ts


// ==========================================
// INTERFACES
// ==========================================

interface BannerData {
  id: number;
  image: ImageSourcePropType; // <-- Altere para este tipo
  altText: string;
  link?: string;
}

// ==========================================
// BANNERS MOCK
// ==========================================

// Array com os dados dos seus banners (substitua os caminhos pelas suas imagens reais depois)
const BANNERS_MOCK: BannerData[] = [
  {
    id: 1,
    image: require('../../../../assets/images/banner1.png'), // Caminho da sua imagem na pasta assets
    altText: 'Promoção de Julho - 25% OFF em ferramentas',
    link: '/promocao',
  },
  {
    id: 2,
    image: require('../../../../assets/images/banner2.png'),
    altText: 'As melhores parafusadeiras com desconto',
    link: '',
  },
  
 
    {
    id: 3,
    image: require('../../../../assets/images/banner4.png'),
    altText: 'Alugue a partir de 29,90',
    link: '',
  },
     {
    id: 4,
    image: require('../../../../assets/images/banner0.png'),
    altText: 'Alugue a partir de 29,90',
    link: '',
  },

];



// ==========================================
// COMPONENTE
// ==========================================

export default function Banner() {
  // Índice do slide atualmente ativo (para as bolinhas indicadoras)
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Referência ao ScrollView para controlar o scroll programaticamente
  const scrollRef = useRef<ScrollView>(null);

  // Referência mutável ao índice ativo (evita closure stale no setInterval)
  const activeIndexRef = useRef<number>(0);

  // Largura total da tela para tornar o banner responsivo
  const { width: screenWidth } = Dimensions.get('window');

  // Largura de cada slide (tela inteira menos o padding horizontal do container)
  const slideWidth = screenWidth - 16 * 2;

  // Altura proporcional ao layout original (369/1428 ≈ 0.258)
  
  // const bannerHeight = slideWidth * 0.258;
   const bannerHeight = slideWidth * 0.558;

  // ==========================================
  // AUTOPLAY — troca sozinho a cada 4 segundos
  // ==========================================
  useEffect(() => {
    const interval = setInterval(() => {
      // Calcula o próximo índice com loop infinito
      const nextIndex = (activeIndexRef.current + 1) % BANNERS_MOCK.length;

      // Rola o ScrollView para o slide seguinte
      scrollRef.current?.scrollTo({
        x: nextIndex * slideWidth,
        animated: true,
      });

      // Atualiza a referência e o estado
      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
    }, 4000); // Passa sozinho a cada 4 segundos

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar
  }, [slideWidth]);

  // ==========================================
  // HANDLER DE SCROLL MANUAL (swipe do usuário)
  // ==========================================

  // Detecta em qual slide o usuário parou após o swipe
  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = e.nativeEvent.contentOffset.x;

    // Calcula o índice com base na posição de scroll
    const index = Math.round(offsetX / slideWidth);
    const clampedIndex = Math.max(0, Math.min(index, BANNERS_MOCK.length - 1));

    activeIndexRef.current = clampedIndex;
    setActiveIndex(clampedIndex);
  };

  return (
    <View style={styles.container}>
      {/* ==========================================
          CAROUSEL — ScrollView horizontal com paginação
          Substitui o Swiper, sem dependências externas
          ========================================== */}
      <View style={[styles.bannerWrapper, { height: bannerHeight }]}>
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled              // Snap automático entre slides (1 por vez)
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScrollEnd} // Detecta o fim do swipe
          scrollEventThrottle={16}
        >
          {/* Mostra apenas 1 banner por vez */}
          {BANNERS_MOCK.map((banner) => (
            <View
              key={banner.id}
              style={[
                styles.bannerSlide,
                { width: slideWidth, height: bannerHeight },
              ]}
            >
              <Image
                source={banner.image}
                accessibilityLabel={banner.altText}
                style={styles.bannerImage}
                resizeMode="cover"
              />
            </View>
          ))}
        </ScrollView>
      </View>

      {/* ==========================================
          ELEMENTO DAS BOLINHAS
          Renderizado fora do ScrollView, abaixo do banner
          ========================================== */}
      <View style={styles.paginationContainer}>
        {BANNERS_MOCK.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              // Bolinha ativa: maior e com cor primária
              activeIndex === index && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

