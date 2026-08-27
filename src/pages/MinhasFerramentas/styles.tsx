import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export default StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: colors.bgApp,
  },

  conteudo: {
    padding: 20,
    paddingBottom: 40,
  },

  cabecalho: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 20,
    gap: 10,
  },

  cabecalhoTextos: {
    width: '100%',
  },

  titulo: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textDark,
  },

  subtitulo: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 4,
  },

  botaoCadastrar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: colors.primary,
    width: '100%',
    paddingVertical: 10,
    borderRadius: 999,
    alignSelf: 'flex-end',
    flexShrink: 0,
  },

  botaoCadastrarTexto: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.textDark,
  },

  lista: {
    gap: 0,
  },
});