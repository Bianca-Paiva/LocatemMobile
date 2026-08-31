import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

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
    gap: 18,
  },

  selecionarTodosCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    backgroundColor: colors.bgCard,
    padding: 16,
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

  selecionarTodosTexto: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
  },

  lojas: {
    gap: 18,
  },
});
