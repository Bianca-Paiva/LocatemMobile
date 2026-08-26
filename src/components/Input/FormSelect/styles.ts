import { StyleSheet } from 'react-native';
import colors from '../../../theme/colors';

export default StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 6,
  },
  obrigatorio: {
    color: colors.error,
  },
  campo: {
    height: 48,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.bgInput,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  campoErro: {
    borderColor: colors.error,
  },
  valorTexto: {
    fontSize: 14,
    color: colors.textDark,
  },
  placeholderTexto: {
    fontSize: 14,
    color: colors.textMuted2,
  },
  error: {
    fontSize: 13,
    color: colors.error,
    fontWeight: '500',
    marginTop: 6,
  },

  // Modal / bottom sheet
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  folha: {
    maxHeight: '65%',
    backgroundColor: colors.bgCard,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 24,
  },
  folhaCabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  folhaTitulo: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textDark,
  },
  opcao: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  opcaoSelecionada: {
    backgroundColor: colors.primarySoft,
  },
  opcaoTexto: {
    fontSize: 14,
    color: colors.textDark,
  },
  opcaoTextoSelecionado: {
    fontWeight: '700',
  },
});
