import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },

  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },

  triggerText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A1A',
  },

  // Overlay ocupa a tela toda só pra permitir fechar o menu tocando fora dele;
  // o menu em si fica ancorado próximo ao topo direito, logo abaixo do botão.
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    alignItems: 'flex-end',
    paddingTop: 110,
    paddingRight: 16,
  },

  menu: {
    width: 170,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 6,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },

  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  optionActive: {
    backgroundColor: '#FFF8DC',
  },

  optionText: {
    fontSize: 14,
    color: '#333333',
  },

  optionTextActive: {
    fontWeight: '700',
    color: '#1A1A1A',
  },
});
