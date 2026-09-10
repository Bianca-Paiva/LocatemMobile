import { StyleSheet } from 'react-native';
import colors from '../../../theme/colors';

export default StyleSheet.create({
  card: {
    width: '100%',
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    backgroundColor: colors.bgCard,
  },

  titulo: {
    marginBottom: 16,
    fontSize: 17,
    fontWeight: '700',
    color: colors.textDark,
  },

  grupo: {
    flexDirection: 'row',
    gap: 8,
  },

  botao: {
    flex: 1,
    minHeight: 56,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 10,
  },

  botaoAtivo: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primary,
  },

  botaoTexto: {
    fontSize: 12.5,
    fontWeight: '500',
    color: colors.textMuted,
    textAlign: 'center',
  },

  botaoTextoAtivo: {
    color: colors.textDark,
  },
});
