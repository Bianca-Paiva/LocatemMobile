import { StyleSheet, Platform } from 'react-native';
import colors from '../../../theme/colors';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.bgCard,
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.borderLight,

    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },

  containerInativo: {
    opacity: 0.6,
  },

  imagem: {
    width: 92,
    height: '100%',
    minHeight: 108,
    backgroundColor: colors.bgInput,
  },

  imagemPlaceholder: {
    width: 92,
    minHeight: 108,
    backgroundColor: colors.bgInput,
    alignItems: 'center',
    justifyContent: 'center',
  },

  conteudo: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },

  linhaTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },

  textos: {
    flex: 1,
  },

  nome: {
    fontSize: 14.5,
    fontWeight: '700',
    color: colors.textDark,
  },

  marcaModelo: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 1,
  },

  precoLinha: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 6,
  },

  preco: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textDark,
  },

  precoPeriodo: {
    fontSize: 12,
    color: colors.textMuted,
    marginLeft: 3,
  },

  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    flexShrink: 0,
  },

  badgeAtiva: {
    backgroundColor: colors.successBg,
  },

  badgeInativa: {
    backgroundColor: colors.bgInput,
  },

  badgeTexto: {
    fontSize: 11,
    fontWeight: '700',
  },

  badgeTextoAtiva: {
    color: colors.success,
  },

  badgeTextoInativa: {
    color: colors.textMuted,
  },

  acoes: {
    flexDirection: 'row',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingTop: 8,
    gap: 4,
  },

  acaoBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 6,
    borderRadius: 8,
  },

  acaoTexto: {
    fontSize: 11.5,
    fontWeight: '600',
    color: colors.textDark,
  },

  acaoTextoRemover: {
    color: colors.error,
  },
});
