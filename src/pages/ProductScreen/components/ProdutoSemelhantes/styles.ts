import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  section: {
    marginTop: 15,
    marginBottom: 20, // Dá um respiro antes do próximo bloco na tela de detalhes
  },
  title: {
    fontSize: 22, // Tamanho exato usado na Home
    fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 10,
    color: '#0a0a0a',
  },
  list: {
    paddingHorizontal: 15,
    gap: 5, // Gap exato usado na Home
  },
});