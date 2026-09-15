import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF', // var(--color-bg-card)
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },

  titulo: {
    marginBottom: 16,
    fontSize: 16,
    fontWeight: '700',
    // color: colors.textDark
  },

  linha: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },

  rotulo: {
    flexShrink: 0,
    fontSize: 14,
    fontWeight: '600',
    // color: colors.textDark
  },

  valor: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'right',
    // color: colors.textDark
  },

  valorBloco: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 4,
  },

  diarias: {
    fontSize: 13,
    // color: colors.textMuted
  },

  valorDestaque: {
    fontSize: 18,
    fontWeight: '800',
    // color: colors.textDark
  },

  etiquetaStatus: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingVertical: 6,
    paddingHorizontal: 12,

    borderRadius: 9999, // var(--radius-pill)

    backgroundColor: '#FFF4D6',

    // gap: 6
  },

  textoStatus: {
    fontSize: 12,
    fontWeight: '700',
    color: '#A16A00',
    textTransform: 'uppercase',
    lineHeight: 12,
  },

  ponto: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#A16A00',
    marginRight: 6,
  },
});