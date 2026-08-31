import { StyleSheet } from 'react-native';
import colors from '../../../theme/colors';

export default StyleSheet.create({
  item: {
    width: '100%',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },

  linhaPrincipal: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },

  checkbox: {
    width: 20,
    height: 20,
    marginTop: 4,
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

  imagem: {
    width: 72,
    height: 72,
    borderRadius: 8,
  },

  info: {
    flex: 1,
    minWidth: 0,
    justifyContent: 'center',
  },

  titulo: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textDark,
  },

  remover: {
    padding: 4,
    borderRadius: 6,
    marginTop: 4,
  },

  controles: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 16,
  },

  controle: {
    flex: 1,
  },

  total: {
    marginTop: 14,
    textAlign: 'right',
    fontSize: 14,
    fontWeight: '800',
    color: colors.textDark,
  },
});
