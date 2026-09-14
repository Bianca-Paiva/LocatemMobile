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

  campoWrapper: {
    width: '100%',
    height: 48,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingLeft: 14,
    paddingRight: 14,

    backgroundColor: '#FFFFFF', // var(--color-bg-input)

    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 10,
  },

  valorTexto: {
    fontSize: 14,
    color: '#141D23',
  },

  placeholderTexto: {
    fontSize: 14,
    color: '#9CA3AF',
  },

  icone: {
    marginLeft: 8,
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

  // Modal / bottom sheet do calendário — mesmo padrão usado em
  // `components/Input/FormSelect`.
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },

  folha: {
    maxHeight: '80%',
    backgroundColor: colors.bgCard,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 24,
  },

  folhaCabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },

  folhaTitulo: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textDark,
  },
});
