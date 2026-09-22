import { StyleSheet } from 'react-native';

import colors from '../../../theme/colors';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  container: {
    flex: 1,

    backgroundColor: '#FFFFFF',
  },

  pagina: {
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 48,
    gap: 24,
  },

  // Em largura de celular a grade de cards da Web vira uma única coluna.
  gradeResumo: {
    gap: 16,
  },

  cartaoSecao: {
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 20,
  },

  cabecalhoSecao: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 12,
    flexWrap: 'wrap',
  },

  cabecalhoSecaoTextos: {
    flexShrink: 1,
  },

  tituloSecao: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textDark,
  },

  subtituloSecao: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 2,
  },

  linkVerMais: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  linkVerMaisEstatico: {
    opacity: 0.8,
  },

  linkVerMaisTexto: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.secondary,
  },

  estadoVazio: {
    fontSize: 13,
    color: colors.textMuted,
    textAlign: 'center',
    paddingVertical: 24,
  },

  estrelasAvaliacao: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4,
  },

  legendaAvaliacoes: {
    fontSize: 12,
    color: colors.textMuted,
  },

  carrossel: {
    gap: 10,
    paddingRight: 4,
  },
});
