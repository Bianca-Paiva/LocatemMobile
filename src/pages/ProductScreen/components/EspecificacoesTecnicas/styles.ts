import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  titulo: {
    fontSize: 16, // Ajustado do clamp() web para o tamanho ideal no mobile
    fontWeight: '700',
    color: '#0a0a0a',
    marginBottom: 14,
  },
  tabela: {
    flexDirection: 'column',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 11,
    paddingHorizontal: 16,
    gap: 16,
  },
  linhaClara: {
    backgroundColor: '#fff',
  },
  linhaEscura: {
    backgroundColor: '#f9fafb',
  },
  label: {
    fontSize: 13,
    color: '#6b7280',
    fontWeight: '400',
    minWidth: 120, // Garante que rótulos maiores não quebrem o layout
  },
  valor: {
    flex: 1, // Permite que valores muito longos quebrem a linha corretamente
    fontSize: 13,
    color: '#0a0a0a',
    fontWeight: '500',
    textAlign: 'right',
  },
});