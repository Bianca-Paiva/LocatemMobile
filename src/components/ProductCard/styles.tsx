import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: 180,        // largura fixa
    height: 260,       // altura fixa
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    marginRight: 10,   // espaçamento entre os cards
    // Garante que a imagem não mije para fora das bordas arredondadas do container
    overflow: 'hidden',
    
    // Sombra para Android
    elevation: 3,
    
    // Sombra para iOS
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  imageContainer: {
  height: 150,
  padding: 10,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#FFF",
},
  image: {
    width: '100%',
    height: 130,
    padding: 20,
    resizeMode: 'contain', // Mantém a imagem inteira visível sem cortar, ajustando ao espaço do card
    backgroundColor: '#F3F4F6', // Cor de fundo de carregamento caso a imagem demore
  },
  contentContainer: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937', // Tom de cinza escuro/quase preto para legibilidade
    lineHeight: 20,
    marginBottom: 4,

    flexShrink:1,
  },
  storeName: {
    fontSize: 12,
    fontWeight: '400',
    color: '#9CA3AF', // Cinza médio para criar hierarquia visual
    marginBottom: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline', // Alinha o texto do preço e do período pela linha de base do texto
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827', // Destaca o preço com um peso maior e cor mais escura
  },
  period: {
    fontSize: 12,
    fontWeight: '400',
    color: '#6B7280',
    marginLeft: 2,
  },
});

export default styles;