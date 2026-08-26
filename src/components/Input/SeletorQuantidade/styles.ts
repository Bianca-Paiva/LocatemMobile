import { StyleSheet } from 'react-native';
import colors from '../../../theme/colors';

export default StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 6,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    alignSelf: 'flex-start',
  },
  botao: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.bgInput,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoDesabilitado: {
    opacity: 0.4,
  },
  valor: {
    minWidth: 24,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '700',
    color: colors.textDark,
  },
});
