import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',

    alignItems: 'flex-start',

    backgroundColor: '#FFFFFF',

    borderWidth: 1,

    borderColor: '#EEEEEE',

    borderRadius: 16,
    
    padding: 20,
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
  corpo: {
    flex: 1,
    justifyContent: 'space-between',
    
  },

  conteudo: {
    width: '100%',

   //backgroundColor: 'red', //temporario
  },

 titulo: {
  fontSize: 14,
  fontWeight: '700',
  color: '#0A0A0A',
  marginBottom: 6,

  flexShrink: 1,
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

    lineHeight: 16,
    flexShrink: 1,
  },

aside: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 10,
   //backgroundColor: 'blue', //temporario
},

  seta: {
    fontSize: 22,

    color: '#C4C4C4',

    fontWeight: '300',
  },
});
