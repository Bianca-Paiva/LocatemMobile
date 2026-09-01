import { StyleSheet } from 'react-native';
import colors from '../../../../theme/colors';

export default StyleSheet.create({
  card: {
    width: '100%',
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    backgroundColor: colors.bgCard,
  },

  titulo: {
    paddingBottom: 16,
    fontSize: 17,
    fontWeight: '700',
    color: colors.textDark,
  },

  textoVazio: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },

  corpo: {
    flexDirection: 'column',
  },

  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    gap: 12,
  },

  linhaLabel: {
    color: colors.textMuted,
    fontSize: 15,
  },

  required: {
    color: colors.error,
  },

  linhaValor: {
    color: colors.textMuted,
    fontWeight: '600',
    fontSize: 15,
  },

  freteBloco: {
    paddingBottom: 5,
    gap: 10,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    paddingLeft: 14,
    paddingRight: 4,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.bgCard,
  },

  inputSemBorda: {
    flex: 1,
    fontSize: 14,
    color: colors.textDark,
  },

  btnInterno: {
    height: 36,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: '#D5ECFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnInternoDesabilitado: {
    opacity: 0.5,
  },

  btnInternoTexto: {
    color: colors.linkColor,
    fontSize: 13,
    fontWeight: '600',
  },

  cupomBloco: {
    paddingVertical: 20,
  },

  inputComIcone: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 44,
    paddingLeft: 14,
    paddingRight: 5,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.bgCard,
  },

  cupomAplicadoTexto: {
    marginTop: 8,
    color: colors.success,
    fontSize: 13.5,
  },

  desconto: {
    color: colors.textMuted,
    fontWeight: '600',
  },

  freteGratis: {
    color: colors.textMuted,
    fontWeight: '600',
  },

  freteValor: {
    color: colors.textMuted,
    fontWeight: '600',
  },

  linhaTotal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },

  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textDark,
  },

  totalValor: {
    fontSize: 19,
    fontWeight: '800',
    color: colors.textDark,
  },

  ctaDesabilitado: {
    opacity: 0.5,
  },

  seguroRodape: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingTop: 18,
  },

  seguroTexto: {
    color: colors.textMuted2,
    fontSize: 13,
  },
});
