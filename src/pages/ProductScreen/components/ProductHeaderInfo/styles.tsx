import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FAFAFA', // Background base do seu app
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
    lineHeight: 28,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 4,
    fontWeight: '500',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline', // Alinha o texto grande com o pequeno pela base
  },
  priceValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
  },
  priceSuffix: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 4,
    fontWeight: '600',
  }
});