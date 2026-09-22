import { StyleSheet } from 'react-native';

import colors from '../../../../theme/colors';

export const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    backgroundColor: colors.bgCard,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 18,
    paddingHorizontal: 20,
  },

  iconeWrapper: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

  conteudo: {
    flexShrink: 1,
    minWidth: 0,
  },

  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textMuted,
    marginBottom: 6,
  },

  valor: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.textDark,
    lineHeight: 30,
  },

  legenda: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 4,
  },

  // Verde da paleta dos badges de status (sem token no colors.ts).
  tendencia: {
    fontSize: 12,
    fontWeight: '700',
    color: '#137333',
    marginTop: 4,
  },
});
