// React e hooks
import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';

// ==========================================
// INTERFACES
// ==========================================

interface BannerData {
  id: number;
  image: ReturnType<typeof require>;
  altText: string;
  link?: string; // O link é opcional (por isso o '?')
}

// ==========================================
// BANNERS MOCK
// ==========================================

// Array com os dados dos seus banners (substitua os caminhos pelas suas imagens reais depois)
const BANNERS_MOCK: BannerData[] = [
  {
    id: 1,
    image: require('../../assets/images/banner1.png'), // Caminho da sua imagem na pasta assets
    altText: 'Promoção de Julho - 25% OFF em ferramentas',
    link: '/promocao',
  },
  {
    id: 2,
    image: require('../../assets/images/banner2.png'),
    altText: 'As melhores parafusadeiras com desconto',
    link: '',
  },
  {
    id: 3,
    image: require('../../assets/images/banner3.png'),
    altText: 'Alugue a partir de 29,90',
    link: '',
  },
    {
    id: 4,
    image: require('../../assets/images/banner4.png'),
    altText: 'Alugue a partir de 29,90',
    link: '',
  },
     {
    id: 5,
    image: require('../../assets/images/banner0.png'),
    altText: 'Alugue a partir de 29,90',
    link: '',
  },

];

// ==========================================
// CONSTANTES
// ==========================================

// Padding horizontal do container (equivalente ao padding: 0 var(--spacing-md))
const HORIZONTAL_PADDING = 16;

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
  const slideWidth = screenWidth - HORIZONTAL_PADDING * 2;

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

// ==========================================
// ESTILOS
// ==========================================

const styles = StyleSheet.create({
  /* Container principal do Banner */
  container: {
    width: '100%',
    paddingHorizontal: HORIZONTAL_PADDING,
    alignSelf: 'center',
    marginVertical: 0, // Zera margens superior/inferior
  },

  /* Wrapper do banner — aplica bordas arredondadas e sombra */
  bannerWrapper: {
    width: '100%',
    borderRadius: 20,   // Herdando o raio do CSS original
    overflow: 'hidden',
    // Sombra compatível com iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    // Sombra compatível com Android
    elevation: 6,
  },

  /* Slide individual */
  bannerSlide: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6', // Equivalente ao var(--color-banner-bg)
  },

  /* Garante que a imagem cubra todo o slide */
  bannerImage: {
    width: '100%',
    height: '100%',
  },

  /* ==========================================
     TRADUÇÃO DOS INDICADORES (PAGINATION)
     ========================================== */

  /* Posiciona o container das bolinhas centralizado abaixo do banner */
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 16, // Empurra a linha das bolinhas para baixo do banner
  },

  /* Bolinha padrão (inativa) */
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 50,
    backgroundColor: '#9CA3AF', // Equivalente ao var(--color-indicator)
    opacity: 0.6,
    marginHorizontal: 3,
  },

  /* Bolinha ativa: maior e com cor primária */
  paginationDotActive: {
    width: 20,
    height: 6,
    borderRadius: 999,           // Equivalente ao var(--radius-pill)
    backgroundColor: '#FFCA00', // Equivalente ao var(--color-primary)
    opacity: 1,
  },
});
