import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,

    backgroundColor: 'rgba(15,14,12,0.45)',

    justifyContent: 'center',

    padding: 16,
  },

  modal: {
    backgroundColor: '#FFFFFF',

    borderRadius: 16,

    maxHeight: '90%',

    overflow: 'hidden',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.12,
    shadowRadius: 16,

    elevation: 12,
  },

  header: {
    flexDirection: 'row',

    alignItems: 'center',

    paddingTop: 20,
    paddingHorizontal: 24,
  },

  voltar: {
    flexDirection: 'row',

    alignItems: 'center',
  },

  voltarTexto: {
    marginLeft: 6,

    fontSize: 14,

    fontWeight: '600',

  },

  produto: {
    paddingHorizontal: 24,
    paddingVertical: 20,

    borderBottomWidth: 1,
    borderBottomColor: '#E0DDD6',
  },

  produtoTopo: {
    flexDirection: 'row',

    alignItems: 'flex-start',
  },

  produtoImagem: {
    width: 95,
    height: 95,

    borderRadius: 10,

    marginRight: 14,
  },

  produtoInfo: {
    flex: 1,
  },

  produtoNome: {
    fontSize: 15,

    fontWeight: '700',

    lineHeight: 20,

    marginBottom: 4,
  },

  produtoData: {
    fontSize: 11,

    color: '#A09E99',
  },

  subRatings: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    marginTop: 16,
  },

  subRating: {
    flex: 1,

    alignItems: 'center',
  },

  subRatingLabel: {
    fontSize: 11,

    textAlign: 'center',

    color: '#6B6860',

    marginBottom: 6,
  },

  subRatingIcone: {
    width: 46,
    height: 46,

    borderWidth: 1.5,

    borderColor: '#E0DDD6',

    borderRadius: 10,

    justifyContent: 'center',
    alignItems: 'center',

    marginBottom: 6,

    backgroundColor: '#F9FAFB',
  },

  subRatingErro: {
    borderColor: '#E03E2D',
  },

  erro: {
    marginTop: 8,

    fontSize: 11,

    fontWeight: '600',

    color: '#E03E2D',
  },

  obs: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },

  obsToggle: {
    flexDirection: 'row',

    alignItems: 'center',

    marginBottom: 14,
  },

  obsTitulo: {
    fontSize: 14,

    fontWeight: '600',

    color: '#6B6860',
  },

  obsTextarea: {
    borderWidth: 1.5,

    borderColor: '#E0DDD6',

    borderRadius: 10,

    minHeight: 90,

    padding: 14,

    backgroundColor: '#F9FAFB',

    textAlignVertical: 'top',
  },

  footer: {
    alignItems: 'flex-end',

    paddingHorizontal: 24,

    paddingBottom: 24,
  },

  btnEnviar: {
    backgroundColor: '#FFCA00',

    paddingVertical: 13,

    paddingHorizontal: 36,

    borderRadius: 10,
  },

  btnEnviarTexto: {
    color: '#0A0A0A',

    fontWeight: '600',

    fontSize: 14,
  },
});