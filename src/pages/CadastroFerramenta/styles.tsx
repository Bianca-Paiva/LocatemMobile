import { StyleSheet, Platform } from 'react-native';
import colors from '../../theme/colors';

export default StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: colors.bgApp,
  },
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 58 : 24,
    paddingBottom: 18,
    backgroundColor: colors.bgCard,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  botaoVoltar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cabecalhoTextos: {
    flex: 1,
  },
  titulo: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textDark,
  },
  subtitulo: {
    fontSize: 12.5,
    color: colors.textMuted,
    marginTop: 2,
  },
  conteudo: {
    padding: 16,
    paddingBottom: 110,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  barraInferior: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 30 : 16,
    backgroundColor: colors.bgCard,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  botaoPublicar: {
    height: 50,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoPublicarTexto: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textDark,
  },
  progresso: {
    fontSize: 12,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: 8,
  },
});
