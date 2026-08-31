import { StyleSheet } from 'react-native';
import colors from '../../../theme/colors';

export default StyleSheet.create({
  wrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 64,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.bgCard,
  },

  titulo: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '800',
    color: colors.textDark,
    textAlign: 'center',
  },

  texto: {
    maxWidth: 320,
    fontSize: 13.5,
    color: colors.textMuted,
    lineHeight: 20,
    textAlign: 'center',
  },

  botaoWrapper: {
    marginTop: 12,
    width: '100%',
    maxWidth: 240,
  },
});
