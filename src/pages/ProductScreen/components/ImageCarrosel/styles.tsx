import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  carrosselWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    width: '100%',
  },
  imagemPrincipalContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 1, // Mantém a proporção quadrada original
    maxHeight: 340,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  imagemPrincipal: {
    width: '100%',
    height: '100%',
  },
  navBtn: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -17 }], // Metade da altura (34/2) para centralizar
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    // Sombra no React Native (iOS e Android)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  navBtnText: {
    fontSize: 22,
    color: '#333',
    lineHeight: 24, // Ajustado para não cortar verticalmente no Android
    textAlign: 'center',
  },
  navBtnLeft: {
    left: 8,
  },
  navBtnRight: {
    right: 8,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ddd',
  },
  dotAtivo: {
    backgroundColor: '#F9C01A', // Usando o hex que estava na var(--color-secondary)
    width: 20,
  },
  thumbnailsContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingBottom: 4,
    paddingHorizontal: 2, // Adicionado pequeno respiro lateral
  },
  thumbnail: {
    width: 56,
    height: 56,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  thumbnailAtivo: {
    borderColor: '#F9C01A',
  },
  thumbnailImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Cover costuma ser melhor para miniaturas quadradas
  },
});