import { StyleSheet } from 'react-native';
import colors from '../../../theme/colors';

export const styles = StyleSheet.create({
  
  container: {
    flex: 1,  
    backgroundColor: colors.bgCard,
    
  },

  conteudo: {
    padding: 16,
    paddingBottom: 32,
  
  },

  tituloSecao: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textDark,
    marginTop: 24,
    marginBottom: 2,
  },

  subtituloSecao: {
    fontSize: 13,
    color: colors.textMuted,
    marginBottom: 14,
  },

  categoriasWrapper: {
    marginBottom: 12,
  },

  barraOrdenacao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },

  barraOrdenacaoTexto: {
    fontSize: 13,
    color: colors.textMuted,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  estadoVazio: {
    alignItems: 'center',
    paddingVertical: 40,
  },

  estadoVazioTexto: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
