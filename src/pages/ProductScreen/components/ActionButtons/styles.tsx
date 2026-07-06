import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    gap: 12, // Cria um espaço padronizado entre os dois botões
    marginBottom: 32, // Espaçamento para o próximo bloco da tela
  },
  primaryButton: {
    backgroundColor: '#FFC107', // O amarelo principal da sua marca
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000', // Texto escuro para dar contraste com o amarelo
  },
  secondaryButton: {
    backgroundColor: '#F5F5E9', // O tom bege claro/off-white do seu layout
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  }
});