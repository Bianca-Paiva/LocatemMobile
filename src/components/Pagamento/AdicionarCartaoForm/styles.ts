import { StyleSheet } from 'react-native';
import colors from '../../../theme/colors';

export default StyleSheet.create({
  card: {
    width: '100%',
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    backgroundColor: colors.bgCard,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  titulo: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textDark,
  },

  linhaCampos: {
    flexDirection: 'row',
    gap: 12,
  },

  campoMetade: {
    flex: 1,
  },

  salvarCartao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 4,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkboxMarcado: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  salvarCartaoTexto: {
    fontSize: 13.5,
    color: colors.textMuted,
  },
});
