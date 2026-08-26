import { StyleSheet } from 'react-native';
import colors from '../../../theme/colors';

export default StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: colors.bgCard,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 12,
    minHeight: 128,
    justifyContent: 'space-between',
  },
  cardErro: {
    borderColor: colors.error,
  },
  cardCompleto: {
    borderColor: colors.successBorder,
    backgroundColor: colors.successBg,
  },
  iconeBadge: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  titulo: {
    fontSize: 13.5,
    fontWeight: '700',
    color: colors.textDark,
    lineHeight: 18,
  },
  obrigatorio: {
    color: colors.error,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
  },
  statusTexto: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textMuted,
  },
  statusTextoCompleto: {
    color: colors.success,
  },
  statusTextoErro: {
    color: colors.error,
  },
});
