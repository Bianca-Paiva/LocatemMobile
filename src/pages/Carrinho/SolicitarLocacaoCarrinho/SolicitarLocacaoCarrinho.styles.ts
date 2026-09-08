import { StyleSheet } from 'react-native';
import colors from '../../../theme/colors';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: colors.bgCard,
  },

  content: {
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 48,
    gap: 20,
  },

  avisoAprovacao: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#FFF4DD',
    borderWidth: 1,
    borderColor: 'rgba(122, 90, 0, 0.2)',
    color: colors.amber,
    fontSize: 12,
    lineHeight: 18,
  },

  bloco: {
    width: '100%',
    gap: 10,
  },

  blocoTitulo: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textDark,
  },

  gridCampos: {
    width: '100%',
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 16,
    padding: 16,
    gap: 14,
  },

  erroPeriodo: {
    marginTop: -4,
    fontSize: 12,
    fontWeight: '600',
    color: colors.error,
  },

  resumo: {
    width: '100%',
    backgroundColor: colors.bgInput,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 16,
    padding: 16,
    gap: 8,
  },

  linhaResumo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },

  linhaResumoLabel: {
    fontSize: 13,
    color: colors.textMuted,
  },

  linhaResumoValor: {
    fontSize: 13,
    color: colors.textMuted,
    flexShrink: 1,
    textAlign: 'right',
  },

  linhaResumoDestaque: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    marginTop: 4,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  linhaResumoDestaqueLabel: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textDark,
  },

  linhaResumoDestaqueValor: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textDark,
  },

  acoes: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
    marginTop: 8,
  },

  botaoPrimario: {
    flex: 1,
    height: 52,
    backgroundColor: colors.secondary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  botaoSecundario: {
    flex: 1,
    height: 52,
    backgroundColor: colors.bgCard,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  botaoDesabilitado: {
    opacity: 0.5,
  },

  botaoTexto: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textDark,
  },

  botaoTextoSecundario: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textDark,
  },
});
