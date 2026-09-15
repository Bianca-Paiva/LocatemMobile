import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
  /* Container principal do Banner */
  container: {
    width: '100%',
    paddingHorizontal: 16, // Herdando o padding do CSS original
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
