import { StyleSheet } from 'react-native';

import colors from '../../../../theme/colors';

export const styles = StyleSheet.create({
  item: {
    paddingVertical: 12,
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

  data: {
    width: 38,
    alignItems: 'center',
  },

  dia: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textDark,
  },

  mes: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textMuted,
    textTransform: 'uppercase',
    lineHeight: 12,
  },

  imagem: {
    width: 40,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#FFFFFF',
  },

  info: {
    flex: 1,
    minWidth: 0,
  },

  ferramenta: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textDark,
  },

  locatario: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },

  hora: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  horaTexto: {
    fontSize: 12,
    color: colors.textMuted,
  },

  // marginLeft 50 = 38 (largura da data) + 12 (gap), alinha com a imagem.
  movimento: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginTop: 8,
    marginLeft: 50,
  },

  movimentoTexto: {
    fontSize: 12,
    fontWeight: '700',
  },

  movimentoComplemento: {
    fontSize: 10,
    fontWeight: '500',
    opacity: 0.85,
  },
});
