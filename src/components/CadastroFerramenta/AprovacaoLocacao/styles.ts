import { StyleSheet } from 'react-native';
import colors from '../../../theme/colors';

export default StyleSheet.create({
  wrapper: {
    width: '100%',
    gap: 6,
  },
  grupo: {
    gap: 10,
    width: '100%',
  },
  opcao: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bgInput,
  },
  opcaoSelecionada: {
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  opcaoErro: {
    borderWidth: 1,
    borderColor: colors.error,
  },
  radioExterno: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: colors.textMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  radioInterno: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  textos: {
    flex: 1,
    gap: 3,
  },
  linhaTitulo: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  titulo: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textDark,
  },
  badge: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 999,
    backgroundColor: colors.primary,
  },
  badgeTexto: {
    color: colors.textDark,
    fontSize: 11,
    fontWeight: '700',
  },
  descricao: {
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 18,
  },
  error: {
    fontSize: 13,
    color: colors.error,
    fontWeight: '500',
  },
});
