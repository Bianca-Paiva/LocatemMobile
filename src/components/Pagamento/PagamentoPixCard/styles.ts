import { StyleSheet } from 'react-native';
import colors from '../../../theme/colors';

export default StyleSheet.create({
  card: {
    width: '100%',
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    backgroundColor: colors.bgCard,
    gap: 20,
  },

  qrSection: {
    alignItems: 'center',
    gap: 12,
  },

  qrWrapper: {
    padding: 16,
    backgroundColor: colors.bgInput,
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
    borderRadius: 14,
  },

  labelQrcode: {
    fontSize: 13,
    color: colors.textMuted2,
    textAlign: 'center',
  },

  campo: {
    gap: 8,
  },

  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textDark,
  },

  inputCodigo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingLeft: 12,
    paddingRight: 6,
    height: 44,
    backgroundColor: colors.bgInput,
  },

  codigoTexto: {
    flex: 1,
    fontSize: 12,
    color: colors.textMuted,
  },

  btnCopiar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    height: 34,
    borderRadius: 8,
    backgroundColor: '#D5ECFF',
  },

  btnCopiarAtivo: {
    backgroundColor: colors.successBg,
  },

  btnCopiarTexto: {
    fontSize: 12.5,
    fontWeight: '600',
    color: colors.linkColor,
  },

  btnCopiarTextoAtivo: {
    color: colors.success,
  },

  instrucoesContainer: {
    gap: 10,
  },

  itemInstrucao: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },

  numeroInstrucao: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primarySoft,
    color: colors.amber,
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 20,
    overflow: 'hidden',
  },

  textoInstrucao: {
    flex: 1,
    fontSize: 13.5,
    color: colors.textMuted,
    lineHeight: 19,
  },

  expiradoContainer: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 10,
    gap: 6,
  },

  expiradoIconWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.errorBg,
    marginBottom: 8,
  },

  expiradoTitulo: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textDark,
  },

  expiradoTexto: {
    fontSize: 13.5,
    color: colors.textMuted2,
    textAlign: 'center',
    lineHeight: 19,
  },

  btnGerarNovoQrCode: {
    marginTop: 10,
    height: 46,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnGerarNovoQrCodeTexto: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textDark,
  },
});
