import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

  // Container dos botões de ação
  grupoBotoes: {
    width: '100%',

    // No mobile os botões ficam empilhados
    gap: 12,
  },

  // Botão principal (ação positiva)
  botaoPrimario: {
    width: '100%',

    height: 52,

    borderRadius: 14,

    backgroundColor: '#D6B656',

    justifyContent: 'center',

    alignItems: 'center',
  },

  // Botão secundário
  botaoSecundario: {
    width: '100%',

    height: 52,

    borderRadius: 14,

    backgroundColor: '#F5E3B3',

    borderWidth: 1,

    borderColor: '#EADFB0',

    justifyContent: 'center',

    alignItems: 'center',
  },

  // Botão destrutivo (cancelamento)
  botaoPerigo: {
    width: '100%',

    height: 52,

    borderRadius: 14,

    backgroundColor: '#FFFFFF',

    borderWidth: 1,

    borderColor: '#F3B8B8',

    justifyContent: 'center',

    alignItems: 'center',
  },

  // Texto padrão dos botões
  textoBotao: {
    fontSize: 15,

    fontWeight: '700',

    color: '#0A0A0A',
  },

  // Texto usado especificamente no botão de perigo
  textoBotaoPerigo: {
    fontSize: 15,

    fontWeight: '700',

    color: '#CC3333',
  },
});
