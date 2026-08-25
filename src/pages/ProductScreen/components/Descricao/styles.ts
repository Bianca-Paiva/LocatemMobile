import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  descricaoWrapper: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  titulo: {
    fontSize: 16, // Tamanho adaptado para excelente legibilidade mobile
    fontWeight: '700',
    color: '#0a0a0a',
    marginBottom: 12,
  },
  texto: {
    fontSize: 14, // Adaptado do clamp web
    color: '#4b5563',
    lineHeight: 24, // Equivalente aproximado do 1.7 da web (14 * 1.7 = 23.8)
  },
});