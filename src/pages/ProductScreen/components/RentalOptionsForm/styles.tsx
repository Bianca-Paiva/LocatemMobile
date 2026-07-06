import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  voltageRow: {
    flexDirection: 'row',
    gap: 8, // Espaçamento entre os botões 
    marginBottom: 24,
  },
  chip: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  chipSelected: {
    borderColor: '#000000',
    backgroundColor: '#FAFAFA', // Um pequeno destaque no fundo
  },
  chipText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  chipTextSelected: {
    color: '#000000',
    fontWeight: 'bold',
  },
  selectorsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  selectorBox: {
    flex: 1, // Faz o "Tempo" e "Quantidade" ocuparem 50% da tela cada
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
    backgroundColor: '#FFFFFF',
  },
  inputText: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
  },
  actionBtn: {
    padding: 4,
  }
});