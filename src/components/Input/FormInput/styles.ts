import { StyleSheet } from 'react-native';
import colors from '../../../theme/colors';

export default StyleSheet.create({
  wrapper: {
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
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.bgInput,
    paddingHorizontal: 14,
  },
  prefixo: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textMuted,
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    color: colors.textDark,
    padding: 0,
  },
  inputMultiline: {
    height: undefined,
    paddingTop: 12,
    paddingBottom: 12,
    textAlignVertical: 'top',
  },
  rowMultiline: {
    height: undefined,
    alignItems: 'flex-start',
  },
  inputRowErro: {
    borderColor: colors.error,
  },
  inputRowDesabilitado: {
    opacity: 0.6,
  },
  error: {
    fontSize: 13,
    color: colors.error,
    fontWeight: '500',
    marginTop: 6,
  },
});
