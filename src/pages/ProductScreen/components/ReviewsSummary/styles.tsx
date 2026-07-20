import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    marginHorizontal: 20,
    marginBottom: 24, // Espaço antes de começar a lista de comentários
  },
  leftColumn: {
    alignItems: 'center',
    marginRight: 24,
  },
  averageText: {
    fontSize: 48,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  starsRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  totalReviewsText: {
    fontSize: 14,
    color: '#999999',
  },
  rightColumn: {
    flex: 1, // Faz a coluna das barras ocupar o resto do espaço
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  starNumber: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666666',
    width: 12, // Tamanho fixo para alinhar todas as barras
  },
  barBackground: {
    flex: 1,
    height: 6,
    backgroundColor: '#F0F0F5',
    borderRadius: 3,
    marginHorizontal: 8,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: '#FFC107', // Amarelinho das estrelas
    borderRadius: 3,
  },
});