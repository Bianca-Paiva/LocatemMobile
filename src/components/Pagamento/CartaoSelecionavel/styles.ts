import { StyleSheet } from 'react-native';
import colors from '../../../theme/colors';

export default StyleSheet.create({
  cartao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 16,
    backgroundColor: colors.bgCard,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 14,
  },

  cartaoAtivo: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },

  cartaoIcone: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.border,
    borderRadius: 10,
  },

  cartaoIconeTexto: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.textMuted,
  },

  bandeiraImagem: {
    width: 38,
    height: 28,
  },

  cartaoInfo: {
    flex: 1,
    gap: 2,
  },

  cartaoTitulo: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textDark,
  },

  cartaoTitular: {
    fontSize: 13,
    color: colors.textMuted2,
    textTransform: 'uppercase',
  },

  radioExterno: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.textMuted2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  radioExternoAtivo: {
    borderColor: colors.amber,
  },

  radioInterno: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.amber,
  },
});
