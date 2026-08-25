import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',

    alignItems: 'center',

    backgroundColor: '#FFFFFF',

    borderWidth: 1,

    borderColor: '#EEEEEE',

    borderRadius: 16,

    padding: 14,
  },

  miniatura: {
    width: 64,

    height: 64,

    borderRadius: 12,

    overflow: 'hidden',

    backgroundColor: '#FFF',

    justifyContent: 'center',

    alignItems: 'center',

    marginRight: 12,
  },

  imagem: {
    width: '100%',

    height: '100%',
  },

  conteudo: {
    flex: 1,
  },

  titulo: {
    fontSize: 14,

    fontWeight: '700',

    color: '#0A0A0A',

    marginBottom: 6,
  },

  linhaInformacao: {
    flexDirection: 'row',

    alignItems: 'center',

    marginBottom: 4,
  },

  iconeInfo: {
    width: 13,

    height: 13,

    marginRight: 6,

    opacity: 0.55,
  },

  textoInfo: {
    fontSize: 12,

    color: '#7A7A7A',
  },

  statusMensagem: {
    marginTop: 6,

    fontSize: 12,

    color: '#7A7A7A',
  },

  aside: {
    justifyContent: 'space-between',

    alignItems: 'flex-end',

    marginLeft: 10,

    minHeight: 64,
  },

  seta: {
    fontSize: 22,

    color: '#C4C4C4',

    fontWeight: '300',
  },
});
