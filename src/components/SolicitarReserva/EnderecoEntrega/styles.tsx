import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF', // var(--color-bg-card)
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 16,
    padding: 18,
  },

  titulo: {
    marginBottom: 16,
    fontSize: 17,
    fontWeight: '700',
    color: '#141D23',
  },

  subtitulo: {
    marginBottom: 4,
    fontSize: 16,
    fontWeight: '700',
    color: '#141D23',
  },

  dadosContato: {
    marginTop: 6,
    marginBottom: 4,
    paddingTop: 14,

    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },

  descricaoContato: {
    marginBottom: 16,
    fontSize: 13,
    // color: colors.textMuted
  },

  linhaCep: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    columnGap: 16,
    rowGap: 4,
  },

  campoCep: {
    width: '100%',
    maxWidth: 220,
  },

  linkCepDesconhecido: {
    marginTop: 35,

    fontSize: 13,
    fontWeight: '600',

    color: '#0077FF',

    textDecorationLine: 'underline',
  },

  linhaRuaNumero: {
    width: '100%',
    gap: 16,
  },
});