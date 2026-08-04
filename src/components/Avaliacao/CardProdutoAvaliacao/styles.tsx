import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  grupo: {
    marginBottom: 8,
  },

  card: {
    backgroundColor: '#FFFFFF',

    borderWidth: 1,
    borderColor: '#E0DDD6',

    borderRadius: 12,

    padding: 20,

    marginBottom: 12,

    // equivalente visual do shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,

    elevation: 2,
  },

  conteudo: {
    flexDirection: 'row',

    alignItems: 'center',
  },

  imagem: {
    width: 90,
    height: 90,

    borderRadius: 8,

    backgroundColor: '#FFFFFF',

    padding: 3,

    marginRight: 20,
  },

  info: {
    flex: 1,
  },

  nome: {
    fontSize: 14,

    fontWeight: '600',

    color: '#1A1814',

    lineHeight: 18,

    marginBottom: 4,
  },

  data: {
    fontSize: 12,

    color: '#A09E99',

    marginBottom: 12,
  },
});