import { StyleSheet } from 'react-native';
import colors from '../../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgCard,
  },

  safe: {
    flex: 1,
  },

  conteudo: {
    padding: 16,
    paddingBottom: 32,
  },

  titulo: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textDark,
    marginBottom: 4,
  },

  subtitulo: {
    fontSize: 13,
    color: colors.textMuted,
    marginBottom: 16,
  },

  abas: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },

  aba: {
    flex: 1,
    height: 38,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bgCard,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },

  abaAtiva: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  abaTexto: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textMuted,
  },

  abaTextoAtiva: {
    color: colors.textDark,
  },

  dropdownWrapper: {
    marginBottom: 16,
    zIndex: 10,
  },

  dropdownBotao: {
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bgCard,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  dropdownTexto: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textDark,
  },

  dropdownLista: {
    marginTop: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bgCard,
    overflow: 'hidden',
  },

  dropdownItem: {
    paddingHorizontal: 14,
    paddingVertical: 12,
  },

  dropdownItemAtivo: {
    backgroundColor: colors.primarySoft,
  },

  dropdownItemTexto: {
    fontSize: 13,
    color: colors.textMuted,
  },

  dropdownItemTextoAtivo: {
    color: colors.textDark,
    fontWeight: '700',
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  estadoVazio: {
    alignItems: 'center',
    paddingVertical: 48,
    gap: 6,
  },

  estadoVazioTitulo: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textDark,
    marginTop: 8,
  },

  estadoVazioTexto: {
    fontSize: 13,
    color: colors.textMuted,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
});
