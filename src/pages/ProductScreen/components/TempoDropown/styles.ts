import { StyleSheet } from 'react-native';

// Paleta espelhando o PeriodoLocacaoDropdown da Web e o HorarioDropdown mobile,
// mantendo a mesma identidade visual do seletor de período em todo o app.
export const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
  },

  // Essencial para Android (elevation) e iOS (zIndex): sem isso o menu pode
  // ficar por trás de outros cards (ex.: ProdutosSemelhantes) quando aberto.
  containerOpen: {
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
    backgroundColor: '#FFFFFF', // var(--color-bg-input) na Web
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 8,
  },

  triggerAtivo: {
    borderColor: '#F9C01A',
  },

  triggerText: {
    flex: 1,
    color: '#374151',
    fontSize: 14,
  },

  chevron: {
    marginLeft: 8,
    opacity: 0.75,
  },

  // Caixa flutuante ancorada logo abaixo do botão (mesma lógica do menu na Web)
  menu: {
    position: 'absolute',
    top: 48, // altura do trigger (44) + 4px de respiro
    left: 0,
    right: 0,
    zIndex: 9999,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 4,
    maxHeight: 220,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 10,
  },

  option: {
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 6,
  },

  optionText: {
    fontSize: 14,
    color: '#374151',
  },

  optionActive: {
    backgroundColor: '#F5E3B3',
  },

  optionTextActive: {
    color: '#6E5000',
    fontWeight: '600',
  },
});