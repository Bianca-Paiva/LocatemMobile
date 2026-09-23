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
  // o menu em si é posicionado dinamicamente (veja `menuPosition` no componente),
  // logo abaixo do botão que o abriu.
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
  },

menu: {
  position: 'absolute',

  width: 170,

  backgroundColor: '#FFF',
  borderRadius: 16,
  padding: 8,

  elevation: 8,
  zIndex: 9999,
},

  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
