import { StyleSheet } from 'react-native';

import colors from '../../../../theme/colors';

export const styles = StyleSheet.create({
  // Mesmo tamanho do tile de HomeLocadorFerramentaCard.
  // `borderRadius` é obrigatório para a borda tracejada renderizar no Android.
  card: {
    width: 180,
    height: 260,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#D1D5DB',
    borderRadius: 14,
    backgroundColor: colors.bgCard,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    padding: 20,
  },

  iconeWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  texto: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textMuted,
    textAlign: 'center',
  },
});
