import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    gap: 8,
  },

  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#141D23',
  },

  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,

    width: '100%',
  },

  controle: {
    flexDirection: 'row',
    alignItems: 'center',

    width: '100%',

    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 8,

    backgroundColor: '#FFFFFF', // var(--color-bg-input)

    overflow: 'hidden',
  },

  botao: {
    width: 44,
    height: 43,

    alignItems: 'center',
    justifyContent: 'center',
  },

  botaoTexto: {
    fontSize: 18,
    fontWeight: '500',
    color: '#141D23',
  },

  botaoDesabilitado: {
    opacity: 0.5,
  },

  valor: {
    flex: 1,

    minWidth: 44,

    textAlign: 'center',

    fontSize: 13,

    color: '#141D23',
  },

  estoque: {
    fontSize: 12,

    color: '#8A8F98', // var(--color-text-muted)

    fontWeight: '400',
  },

  required: {
    color: '#E11D48',

    fontSize: 14,

    lineHeight: 14,
  },
});