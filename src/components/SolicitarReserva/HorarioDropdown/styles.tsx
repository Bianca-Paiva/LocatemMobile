import { StyleSheet } from 'react-native';
import colors from '../../../theme/colors';

export const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    gap: 6,
  },

  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#141D23',
  },

  // Envolve o botão e o menu de opções, servindo de âncora para o
  // `position: absolute` do menu (mesma lógica do `.container` na Web).
  container: {
    width: '100%',
    position: 'relative',
  },

  // Essencial para Android (elevation) e iOS (zIndex): sem isso o menu pode
  // ficar por trás dos campos seguintes da tela quando aberto.
  containerAberto: {
    zIndex: 9999,
    elevation: 9999,
  },

  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    width: '100%',
    height: 48,

    paddingHorizontal: 14,

    backgroundColor: '#FFFFFF', // var(--color-bg-input)

    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 10,
  },

  triggerText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },

  required: {
    color: '#E11D48',
    fontSize: 14,
    lineHeight: 14,
  },

  erro: {
    borderColor: '#E11D48',

    shadowColor: '#E11D48',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.16,
    shadowRadius: 4,

    elevation: 2,
  },

  error: {
    fontSize: 12,
    color: '#E11D48',
    fontWeight: '600',
  },

  // Caixa flutuante ancorada logo abaixo do botão — mesma lógica do menu na
  // Web (`HorarioDropdown.module.css`) e do `TempoDropdown` no Mobile.
  menu: {
    position: 'absolute',
    top: 52, // altura do trigger (48) + 4px de respiro
    left: 0,
    right: 0,
    zIndex: 9999,
    backgroundColor: colors.bgCard,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 4,
    maxHeight: 220,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 10,
  },

  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 6,
  },

  optionActive: {
    backgroundColor: colors.primarySoft,
  },

  optionText: {
    fontSize: 14,
    color: colors.textDark,
  },

  optionActiveText: {
    fontWeight: '700',
  },
});
