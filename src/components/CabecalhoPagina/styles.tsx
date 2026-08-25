import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  cabecalho: {
    gap: 4,
    marginBottom: 30,
    width: '100%',
  },

  linhaTitulo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    width: '100%',
  },

  titulo: {
    fontSize: 22,
    fontWeight: '800',
    color: 'var(--color-text-dark)', // substituir pela cor do tema
  },

  subtitulo: {
    fontSize: 13,
    color: 'var(--color-text-muted)', // substituir pela cor do tema
  },
});