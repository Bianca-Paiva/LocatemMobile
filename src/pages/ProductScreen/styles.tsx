import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  // ── 1. CONTAINERS PRINCIPAIS ───────────────────────────────────────
  
  // Substitui a .produtoDetalheContainer
  // Garante que o fundo seja branco e ocupe a tela toda, respeitando o entalhe do celular
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  
  // Substitui a .produtoDetalheMain
  // O flexGrow garante que a rolagem funcione corretamente caso o conteúdo seja menor que a tela
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 40, // Respiro final para não colar no rodapé (Home Indicator do iPhone)
  },

  // Um container invisível para agrupar as seções, caso precise de cor de fundo global
  contentContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  // ── 2. SEÇÃO HERO (Imagem + Infos) ───────────────────────────────
  
  // Substitui a .produtoHeroSection
  // No mobile, a imagem e os botões ficam empilhados em coluna (flexDirection: 'column')
  heroSection: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1, // Substitui o border-bottom: 1px solid
    borderBottomColor: '#f3f4f6',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    flexDirection: 'column',
    gap: 20, // Espaçamento entre o Carrossel de Imagens e o bloco de Título/Preço
  },

  // ── 3. GRID INFERIOR (Descrição, Vendedor, Avaliações) ───────────
  
  // Substitui a .produtoGridInferior e .produtoDescVendedorRow
  // Agrupa os cards de informação abaixo dos produtos semelhantes
  gridInferior: {
    flexDirection: 'column',
    gap: 16, // Mantém o espaçamento exato do CSS original entre os blocos
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24, // Dá um respiro final antes de acabar o scroll
  },
});