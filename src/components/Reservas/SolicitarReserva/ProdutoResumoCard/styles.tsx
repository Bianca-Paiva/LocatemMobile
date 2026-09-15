import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    width: '100%',

    backgroundColor: '#FFFFFF', // var(--color-bg-card)

    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 16,

    padding: 18,

    flexDirection: 'column',

    gap: 14,
  },

  linhaPrincipal: {
    flexDirection: 'row',
    alignItems: 'flex-start',

    width: '100%',

    gap: 14,
  },

  miniatura: {
    width: 88,
    height: 88,

    borderRadius: 12,

    overflow: 'hidden',

    backgroundColor: '#F5F5F5', // var(--color-bg-main)

    alignItems: 'center',
    justifyContent: 'center',

    flexShrink: 0,
  },

  imagem: {
    width: '100%',
    height: '100%',
  },

  infoProduto: {
    flex: 1,
    minWidth: 0,

    gap: 4,
  },

  titulo: {
    fontSize: 16,
    fontWeight: '700',

    color: '#141D23',

    lineHeight: 22,
  },

  categoria: {
    fontSize: 13,

    color: '#5D5E61',
  },

  locador: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',

    gap: 6,

    marginTop: 6,
  },

  locadorTexto: {
    fontSize: 13,

    color: '#4E4634',

    flexShrink: 1,
  },

  locadorNome: {
    color: '#141D23',

    fontWeight: '600',
  },

  avaliacao: {
    flexDirection: 'row',

    alignItems: 'center',
    flexWrap: 'wrap',

    gap: 5,

    marginTop: 6,
  },

  avaliacaoTexto: {
    color: '#141D23',

    fontSize: 13,

    fontWeight: '600',
  },

  numeroAvaliacoes: {
    color: '#4E4634',

    fontSize: 13,

    fontWeight: '400',

    marginLeft: 2,
  },

  iconePequeno: {
    width: 14,
    height: 14,

    opacity: 0.8,
  },

  iconePequenoStar: {
    width: 14,
    height: 14,
  },

  rodape: {
    flexDirection: 'row',
    flexWrap: 'wrap',

    alignItems: 'center',
    justifyContent: 'space-between',

    width: '100%',

    columnGap: 12,
    rowGap: 6,

    paddingTop: 12,

    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },

  localizacao: {
    flexDirection: 'row',

    alignItems: 'center',

    gap: 5,

    flexShrink: 1,
    minWidth: 0,
  },

  localizacaoTexto: {
    color: '#4E4634',

    fontSize: 13,

    fontWeight: '500',

    flexShrink: 1,
  },

  precoBloco: {
    flexDirection: 'row',

    alignItems: 'flex-end',

    gap: 4,

    flexShrink: 0,
  },

  precoValor: {
    fontSize: 21,

    fontWeight: '800',

    color: '#141D23',
  },

  precoUnidade: {
    fontSize: 13,

    color: '#6B7280', // var(--color-text-muted)
  },
});
