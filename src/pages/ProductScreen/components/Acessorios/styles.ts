import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  titulo: {
    fontSize: 16, // Ajustado do clamp() web para o tamanho ideal no mobile
    fontWeight: '700',
    color: '#0a0a0a',
    marginBottom: 14,
  },
  lista: {
    // Web usa CSS grid (auto-fill); no RN o equivalente é um flexWrap em duas
    // colunas, que se comporta bem tanto em telas estreitas quanto em tablets.
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Mantém o ícone no topo se o texto quebrar linha
    width: '50%',
    paddingRight: 12,
    marginBottom: 12,
    gap: 10,
  },
  icone: {
    marginTop: 2, // Compensa o alinhamento com a primeira linha de texto
  },
  itemTexto: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
    lineHeight: 19,
  },
});
