import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../../theme/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
// células com um pequeno respiro entre elas, 7 colunas
const TAMANHO_DIA = Math.floor((SCREEN_WIDTH - 40 - 6 * 4) / 7);

export default StyleSheet.create({
  wrapper: {
    gap: 14,
    width: '100%',
  },
  navegacao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navBotao: {
    width: 30,
    height: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mesLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textDark,
  },
  gradeCabecalho: {
    flexDirection: 'row',
  },
  gradeCabecalhoTexto: {
    width: TAMANHO_DIA,
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '700',
    color: colors.textMuted,
    paddingBottom: 4,
  },
  grade: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  dia: {
    width: TAMANHO_DIA,
    height: TAMANHO_DIA,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  diaTexto: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textDark,
  },
  diaPassada: {},
  diaPassadaTexto: {
    color: '#C8C8C8',
  },
  diaDisponivel: {
    borderColor: colors.successBorder,
    backgroundColor: colors.successBg,
  },
  diaDisponivelTexto: {
    color: colors.success,
  },
  diaIndisponivel: {
    borderWidth: 2,
    borderColor: '#FF4D4D',
    backgroundColor: '#FFF5F5',
    overflow: 'hidden', // <-- ADICIONADO PARA CORTAR AS PONTAS DA LINHA
  },
  diaIndisponivelTexto: {
    color: '#FF4D4D',
  },
  linhaDiagonal: { // <-- ADICIONADO
    position: 'absolute',
    width: TAMANHO_DIA * 1.5,
    height: 1.5,
    backgroundColor: '#FF4D4D',
    transform: [{ rotate: '-45deg' }],
  },
  legenda: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  legendaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendaTexto: {
    fontSize: 12,
    color: colors.textMuted,
  },
  legendaCor: {
    width: 12,
    height: 12,
    borderRadius: 4,
    borderWidth: 1.5,
  },
  legendaDisponivel: {
    borderColor: '#22C55E',
    backgroundColor: colors.successBg,
  },
  legendaIndisponivel: {
    borderColor: '#FF4D4D',
    backgroundColor: '#FFF',
  },
  legendaPassada: {
    borderColor: '#E5E5E5',
    backgroundColor: '#FAFAFA',
  },
  instrucao: {
    fontSize: 12,
    color: colors.textMuted,
    lineHeight: 18,
  },
});