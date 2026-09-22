import { StyleSheet } from 'react-native';

import colors from '../../../../theme/colors';

export const styles = StyleSheet.create({
  // Mesmo tamanho do card "Cadastrar nova ferramenta"; sombra igual à do ProductCard.
  card: {
    width: 180,
    height: 260,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',

    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },

  cardInativo: {
    opacity: 0.6,
  },

  capa: {
    width: '100%',
    height: 110,
    backgroundColor: colors.bgInput,
  },

  capaPlaceholder: {
    width: '100%',
    height: 110,
    backgroundColor: colors.bgInput,
    alignItems: 'center',
    justifyContent: 'center',
  },

  conteudo: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },

  nome: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textDark,
  },

  marcaModelo: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 1,
  },

  linhaPreco: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 6,
    marginTop: 6,
  },

  precoLinha: {
    flexShrink: 1,
    flexDirection: 'row',
    alignItems: 'baseline',
  },

  preco: {
    flexShrink: 1,
    fontSize: 14,
    fontWeight: '800',
    color: colors.textDark,
  },

  precoPeriodo: {
    fontSize: 11,
    color: colors.textMuted,
    marginLeft: 2,
  },

  // Cores do badge iguais às do FerramentaCard (Minhas Ferramentas).
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

  botaoEditar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    width: '100%',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: colors.bgCard,
    borderRadius: 999,
    paddingVertical: 7,
  },

  botaoEditarTexto: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textDark,
  },
});
