import { StyleSheet } from 'react-native';
import colors from '../../../theme/colors';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: colors.bgApp,
  },

  content: {
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 48,
    gap: 14,
  },

  listaCartoes: {
    gap: 12,
  },

  listaVazia: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    paddingVertical: 20,
  },

  btnAdicionar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderStyle: 'dashed',
    borderRadius: 14,
  },

  iconeAdd: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnAdicionarTexto: {
    fontSize: 14.5,
    fontWeight: '600',
    color: colors.textDark,
  },

  erro: {
    fontSize: 13,
    color: colors.error,
    textAlign: 'center',
  },
});
