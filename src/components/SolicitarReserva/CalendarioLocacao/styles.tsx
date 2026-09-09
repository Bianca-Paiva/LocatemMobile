import { StyleSheet } from 'react-native';
import colors from '../../../theme/colors';

export const styles = StyleSheet.create({
  calendario: {
    width: '100%',
    padding: 6,
  },

  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },

  mesLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textDark,
    textTransform: 'capitalize',
  },

  navBotao: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bgInput,
  },

  semana: {
    flexDirection: 'row',
  },

  semanaLabel: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '700',
    color: colors.textMuted,
    paddingVertical: 4,
  },

  grade: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  diaCelula: {
    width: '14.2857%',
    aspectRatio: 1,
    padding: 2,
  },

  dia: {
    flex: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  diaTexto: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textDark,
  },

  diaTextoDesabilitado: {
    color: colors.textMuted2,
    fontWeight: '500',
  },

  diaTextoIndisponivel: {
    color: colors.textMuted2,
    textDecorationLine: 'line-through',
  },

  diaNoIntervalo: {
    backgroundColor: '#FBEED2',
    borderRadius: 0,
  },

  diaSelecionado: {
    backgroundColor: colors.secondary,
  },

  diaSelecionadoInicio: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },

  diaSelecionadoFim: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },

  diaTextoSelecionado: {
    color: colors.textDark,
    fontWeight: '800',
  },

  hojeMarcador: {
    position: 'absolute',
    bottom: 5,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.secondary,
  },

  legenda: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginTop: 8,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },

  legendaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  legendaBolinha: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  legendaDisponivel: {
    backgroundColor: colors.secondary,
  },

  legendaIndisponivel: {
    backgroundColor: '#E5B8C2',
  },

  legendaTexto: {
    fontSize: 11,
    color: colors.textMuted,
  },
});
