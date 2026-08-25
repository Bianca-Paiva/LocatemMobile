import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    width: '100%',

    backgroundColor: '#FFFFFF', // var(--color-bg-card)

    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 16,

    padding: 18,

    flexDirection: 'row',
    flexWrap: 'wrap',

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

    gap: 6,

    marginTop: 6,
  },

  locadorTexto: {
    fontSize: 13,

    color: '#4E4634',
  },

  locadorNome: {
    color: '#141D23',

    fontWeight: '600',
  },

  linhaAvaliacaoLocalizacao: {
    flexDirection: 'row',

    flexWrap: 'wrap',

    alignItems: 'center',

    gap: 8,

    marginTop: 6,
  },

  avaliacao: {
    flexDirection: 'row',

    alignItems: 'center',

    gap: 5,
  },

  avaliacaoTexto: {
    color: '#141D23',

    fontSize: 13,

    fontWeight: '600',
  },

  localizacao: {
    flexDirection: 'row',

    alignItems: 'center',

    gap: 5,
  },

  localizacaoTexto: {
    color: '#4E4634',

    fontSize: 13,

    fontWeight: '500',
  },

  numeroAvaliacoes: {
    color: '#4E4634',

    fontSize: 13,

    fontWeight: '400',

    marginLeft: 2,
  },

  separador: {
    color: '#807662',

    fontSize: 13,
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

  precoBloco: {
    flexDirection: 'row',

    alignItems: 'flex-end',

    gap: 4,

    marginLeft: 'auto',
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