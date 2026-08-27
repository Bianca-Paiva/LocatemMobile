import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative', // Ancoragem para o menu absoluto
  },
  containerOpen: {
    // Essencial para Android (elevation) e iOS (zIndex) para o menu não ficar por trás de outros cards
    zIndex: 9999,
    elevation: 9999,
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 44,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
    borderRadius: 8,
  },
  triggerAtivo: {
    borderColor: '#F9C01A',
  },
  triggerText: {
    color: '#374151',
    fontSize: 14,
  },
  // --- Estilos do Menu Flutuante ---
  dropdownMenu: {
    position: 'absolute', // Flutua sobre a tela
    top: 48, // Altura do botão (44) + 4px de respiro
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    maxHeight: 220, // Trava a altura para a FlatList rolar internamente
    
    // Sombras nativas para destacar do fundo
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
    zIndex: 9999,
  },
  option: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6', // Linha sutil separando itens
  },
  optionActive: {
    backgroundColor: '#FDF7E6', // Amarelinho de seleção
  },
  optionText: {
    fontSize: 14,
    color: '#374151',
    textAlign: 'left', // Alinhado à esquerda como você pediu
  },
  optionTextActive: {
    color: '#6E5000',
    fontWeight: 'bold',
  },
});