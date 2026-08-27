import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  content: {
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 48,
    gap: 18,
  },

  gridCampos: {
    width: '100%',

    backgroundColor: '#FFFFFF',

    borderWidth: 1,
    borderColor: '#EEEEEE',

    borderRadius: 16,

    padding: 18,

    gap: 14,
  },

  erroPeriodo: {
    marginTop: -8,

    fontSize: 13,

    fontWeight: '600',

    color: '#CC3333',
  },

  acoes: {
    width: '100%',

    gap: 12,

    marginTop: 8,
  },

  botaoPrimario: {
    width: '100%',

    height: 52,

    backgroundColor: '#D6B656',

    borderRadius: 14,

    justifyContent: 'center',

    alignItems: 'center',
  },

  botaoSecundario: {
    width: '100%',

    height: 52,

    backgroundColor: '#F5E3B3',

    borderWidth: 1,

    borderColor: '#EADFB0',

    borderRadius: 14,

    justifyContent: 'center',

    alignItems: 'center',
  },

  botaoTexto: {
    fontSize: 15,

    fontWeight: '700',

    color: '#0A0A0A',
  },
    safeArea: {
    flex: 1,
  },
});