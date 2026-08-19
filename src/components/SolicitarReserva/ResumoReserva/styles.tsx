import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    width: '100%',

    backgroundColor: '#FFFFFF', // var(--color-bg-card)

    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 16,

    padding: 20,
  },

  titulo: {
    marginBottom: 8,

    fontSize: 18,
    fontWeight: '700',

    color: '#141D23',
  },

  linhaPeriodo: {
    flexDirection: 'row',

    alignItems: 'flex-end',

    justifyContent: 'space-between',

    paddingTop: 10,
    paddingBottom: 14,

    gap: 12,
  },

  rotuloPeriodo: {
    fontWeight: '600',

    color: '#141D23',
  },

  valorPeriodo: {
    color: '#141D23',

    textAlign: 'right',
  },

  diarias: {
    color: '#8A8F98',

    fontSize: 12,
  },

  boxes: {
    flexDirection: 'row',

    gap: 12,

    marginBottom: 16,
  },

  box: {
    flex: 1,

    backgroundColor: '#FFDF9440',

    borderRadius: 10,

    paddingVertical: 12,
    paddingHorizontal: 14,

    gap: 4,
  },

  boxLabel: {
    fontSize: 11,

    fontWeight: '700',

    textTransform: 'uppercase',

    color: '#8A6D2E',
  },

  boxValor: {
    fontSize: 14,

    fontWeight: '500',

    color: '#141D23',
  },

  divisor: {
    borderTopWidth: 1,

    borderTopColor: '#ECECEC',

    marginBottom: 4,
  },

  divisorForte: {
    borderTopWidth: 1,

    borderTopColor: '#ECECEC',

    marginTop: 12,
  },

  linha: {
    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',

    paddingVertical: 8,

    gap: 12,
  },

  rotulo: {
    color: '#8A8F98', // var(--color-text-muted)
  },

  valor: {
    color: '#141D23',

    fontWeight: '500',

    textAlign: 'right',
  },

  linhaDestaque: {
    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',

    paddingTop: 16,
    paddingBottom: 4,

    gap: 12,
  },

  rotuloDestaque: {
    fontSize: 17,

    fontWeight: '700',

    color: '#141D23',
  },

  valorDestaque: {
    fontSize: 20,

    fontWeight: '700',

    color: '#141D23',
  },

  aviso: {
    flexDirection: 'row',

    alignItems: 'center',

    gap: 8,

    backgroundColor: '#EAF2FE',

    borderRadius: 10,

    paddingVertical: 12,
    paddingHorizontal: 14,

    marginTop: 16,
    marginBottom: 8,
  },

  avisoIcone: {
    width: 16,
    height: 16,

    color: '#4C7FE0',
  },

  avisoIconeContainer: {
    width: 16,

    alignItems: 'center',

    justifyContent: 'center',
  },

  avisoTexto: {
    flex: 1,
  },

  paragrafoAviso: {
    fontSize: 13,

    color: '#4B5A73',

    marginBottom: 4,
  },
});
