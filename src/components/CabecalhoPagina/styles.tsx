import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  cabecalho: {
    flexDirection: 'column',
    gap: 4,
    width: '100%',
  },

  linhaTitulo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 12,
    width: '100%',
  },

  titulo: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1F2937',
  },

  subtitulo: {
    fontSize: 13,
    color: '#6B7280',
  },
});
