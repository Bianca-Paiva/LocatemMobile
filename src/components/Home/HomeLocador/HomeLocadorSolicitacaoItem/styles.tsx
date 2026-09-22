import { StyleSheet } from 'react-native';

import colors from '../../../../theme/colors';

export const styles = StyleSheet.create({
  item: {
    gap: 12,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  itemUltimo: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },

  linhaPrincipal: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  imagem: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: colors.border,
  },

  info: {
    flex: 1,
    minWidth: 0,
  },

  produto: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textDark,
  },

  locatario: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },

  // O badge "Aguardando aprovação" + o botão estouram ~290px de largura.
  linhaAcoes: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
    rowGap: 8,
  },

  botaoVerDetalhes: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: colors.bgCard,
    borderRadius: 999,
    paddingVertical: 7,
    paddingHorizontal: 12,
  },

  botaoVerDetalhesTexto: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textDark,
  },

  linhaPeriodo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  periodo: {
    fontSize: 12,
    color: colors.textMuted,
  },
});
