import { StyleSheet } from 'react-native';
import colors from '../../../../theme/colors';

export const styles = StyleSheet.create({

  card: {
    backgroundColor: colors.bgCard,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },

  topo: {
    flexDirection: 'row',
    gap: 14,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 100,
    overflow: 'hidden',
    backgroundColor: colors.bgMain,
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarImg: {
    width: '90%',
    height: '90%',
  },

  avatarInitials: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textDark,
  },

  info: {
    flex: 1,
  },

  nomeLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },

  nome: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textDark,
  },

  verificadoIcon: {
    width: 18,
    height: 18,
  },

  desde: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
    marginBottom: 6,
  },

  ratingLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 6,
  },

  ratingValor: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textDark,
    marginLeft: 2,
  },

  ratingCount: {
    fontSize: 13,
    color: colors.textMuted,
  },

  localizacaoLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  localizacaoTexto: {
    fontSize: 13,
    color: colors.textMuted,
  },

  descricao: {
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 19,
    marginTop: 14,
  },

  divisor: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 16,
  },

  stats: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  statItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  statIcone: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.bgMain,
    alignItems: 'center',
    justifyContent: 'center',
  },

  statValor: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textDark,
  },

  statLabel: {
    fontSize: 12,
    color: colors.textMuted,
  },

  statDivisor: {
    width: 1,
    height: 36,
    backgroundColor: colors.border,
    marginHorizontal: 12,
  },
});
