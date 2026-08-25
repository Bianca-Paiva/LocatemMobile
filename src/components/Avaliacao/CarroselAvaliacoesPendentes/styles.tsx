import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  titulo: {
    fontSize: 12,
    fontWeight: '600',
    color: '#A09E99',

    textTransform: 'uppercase',

    letterSpacing: 0.7,

    paddingHorizontal: 24,

    marginBottom: 10,
  },

  carrossel: {
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 24,
  },

  card: {
    width: 130,

    backgroundColor: '#F9FAFB',

    borderWidth: 1,
    borderColor: '#E0DDD6',

    borderRadius: 10,

    padding: 10,

    marginRight: 10,

    // sombra iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 6,

    // sombra Android
    elevation: 2,
  },

  imagem: {
    width: '100%',
    height: 60,

    marginBottom: 6,
  },

  nome: {
    fontSize: 11,

    fontWeight: '600',

    color: '#1A1814',

    lineHeight: 14,

    marginBottom: 4,
  },

  data: {
    fontSize: 10,

    color: '#A09E99',

    marginBottom: 6,
  },
});