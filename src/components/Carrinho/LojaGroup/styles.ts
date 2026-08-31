import { StyleSheet } from 'react-native';
import colors from '../../../theme/colors';

export default StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    backgroundColor: colors.bgCard,
    padding: 18,
    width: '100%',
  },

  cabecalho: {
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    marginBottom: 4,
  },

  selecionarLoja: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 4,
    backgroundColor: colors.bgCard,
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkboxMarcado: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },

  nomeLoja: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textDark,
  },

  itens: {
    flexDirection: 'column',
  },
});
