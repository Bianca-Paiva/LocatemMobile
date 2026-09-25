import { StyleSheet } from 'react-native';
import colors from '../../../../theme/colors';

export const styles = StyleSheet.create({
  scrollContent: {
    flexDirection: 'row',
    gap: 8,
    paddingRight: 4,
  },

  chip: {
    paddingHorizontal: 16,
    height: 36,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bgCard,
    alignItems: 'center',
    justifyContent: 'center',
  },

  chipAtivo: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  chipTexto: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textMuted,
  },

  chipTextoAtivo: {
    color: colors.textDark,
  },
});
