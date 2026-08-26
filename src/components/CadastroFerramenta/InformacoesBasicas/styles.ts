import { StyleSheet } from 'react-native';
import colors from '../../../theme/colors';

export default StyleSheet.create({
  wrapper: {
    gap: 20,
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 6,
  },
  obrigatorio: {
    color: colors.error,
  },
  error: {
    fontSize: 13,
    color: colors.error,
    fontWeight: '500',
    marginTop: 6,
  },
  campoFonte: {
    gap: 8,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.bgInput,
  },
  chipAtivo: {
    borderColor: colors.secondary,
    backgroundColor: colors.primarySoft,
  },
  chipTexto: {
    fontSize: 13,
    fontWeight: '500',
    color: '#374151',
  },
  chipTextoAtivo: {
    color: colors.textDark,
    fontWeight: '700',
  },
});
