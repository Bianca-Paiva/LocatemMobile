// styles.ts

import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const horizontalPadding =
  width >= 1024
    ? 32
    : width >= 640
    ? 24
    : 16;

const topPadding =
  width >= 640
    ? 28
    : 20;

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
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',

    paddingTop: topPadding,
    paddingBottom: bottomPadding,
    paddingHorizontal: horizontalPadding,
  },

  content: {
    gap: 18,
  },

  lista: {
    gap: gapLista,
  },
  safeArea: {
    flex: 1,
  },
});