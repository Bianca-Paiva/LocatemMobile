import { StyleSheet } from 'react-native';
import colors from '../../../theme/colors';

export default StyleSheet.create({
  wrapper: {
    gap: 10,
    width: '100%',
  },
  cabecalhoColunas: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 2,
  },
  cabecalhoColunaTexto: {
    flex: 1,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.4,
    color: colors.textMuted,
  },
  linha: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  colunaInput: {
    flex: 1,
  },
  botaoRemover: {
    width: 34,
    height: 34,
    marginTop: 0,
    borderRadius: 8,
    backgroundColor: colors.errorBg,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  error: {
    fontSize: 13,
    color: colors.error,
    fontWeight: '500',
  },
  botaoAdicionar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 2,
    marginTop: 2,
  },
  botaoAdicionarTexto: {
    color: colors.amber,
    fontSize: 13,
    fontWeight: '700',
  },
});
