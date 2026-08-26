import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    gap: 8,
    width: '100%',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#141D23',
  },
  required: {
    color: '#E11D48',
    fontSize: 14,
  },
  estoque: {
    fontSize: 12,
    color: '#6b7280', // Fallback para var(--color-text-muted)
    fontWeight: 'normal',
  },
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  controle: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    backgroundColor: '#FFFFFF', // Fallback para var(--color-bg-input)
    overflow: 'hidden',
  },
  botao: {
    width: 44,
    height: 43,
    justifyContent: 'center', // Centraliza o + e o - no mobile
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  botaoText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#141D23',
  },
  botaoTextDisabled: {
    color: '#c4c4c4',
  },
  valorContainer: {
    flex: 1,
    minWidth: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  valor: {
    fontSize: 13,
    color: '#141D23',
  },
}); 