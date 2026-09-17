// styles.tsx — mesmo esquema de paddings responsivos usado em
// pages/Reservas/MinhasReservas/styles.tsx (espelha os media queries do CSS da Web).

import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const horizontalPadding =
  width >= 1024
    ? 32
    : width >= 640
    ? 24
    : 16;

const bottomPadding =
  width >= 1024
    ? 64
    : width >= 640
    ? 56
    : 48;

const gapLista =
  width >= 640
    ? 16
    : 14;

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  container: {
    flex: 1,

    backgroundColor: '#FFFFFF',
  },

  content: {
    gap: 18,
  },

  containerCont: {
    paddingBottom: bottomPadding,

    paddingHorizontal: horizontalPadding,
  },

  cabecalho: {
    marginBottom: 18,
  },

  lista: {
    gap: gapLista,
  },
});
