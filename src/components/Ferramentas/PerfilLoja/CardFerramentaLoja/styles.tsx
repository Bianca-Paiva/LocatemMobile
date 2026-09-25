import { StyleSheet } from 'react-native';
import colors from '../../../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    width: '49%',
    padding: 10,
    backgroundColor: colors.bgCard,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    marginBottom: 11,
  },

  imagemWrapper: {
    width: '100%',
    aspectRatio: 1.3,
    backgroundColor: colors.bgMain,
  },

  imagem: {
    width: '90%',
    height: '100%',
  },

  badge: {
    position: 'absolute',
    top: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    height: 22,
    borderRadius: 999,
    backgroundColor: colors.successBg,
  },

  badgeUltimaUnidade: {
    backgroundColor: '#FFF1E6',
  },

  badgePonto: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
  },

  badgePontoUltimaUnidade: {
    backgroundColor: '#F97316',
  },

  badgeTexto: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.success,
  },

  badgeTextoUltimaUnidade: {
    color: '#C2410C',
  },

  favoritoBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  favoritoIcone: {
    width: 15,
    height: 15,
  },

  conteudo: {
    padding: 10,
  },

  titulo: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: 2,
    minHeight: 34,
  },

  locador: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 6,
  },

  precoLinha: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 6,
  },

  preco: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textDark,
  },

  periodo: {
    fontSize: 12,
    color: colors.textMuted,
  },

  ratingLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginLeft: 'auto',
  },

  ratingIcone: {
    width: 12,
    height: 12,
  },

  precoERatingLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  ratingValor: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textDark,
  },

  ratingCount: {
    fontSize: 11,
    color: colors.textMuted,
  },

  btnVerDetalhes: {
    height: 34,
    borderRadius: 999,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnVerDetalhesTexto: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textDark,
  },
});
