import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 44,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF', // Fallback para var(--color-bg-input)
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
    borderRadius: 8,
  },
  triggerAtivo: {
    borderColor: '#F9C01A',
  },
  triggerText: {
    color: '#374151',
    fontSize: 14,
  },
  chevron: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
    marginLeft: 8,
    opacity: 0.75,
  },
  // --- Estilos do Modal (Substituindo o Dropdown Absoluto) ---
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end', // Joga o menu para baixo (Bottom Sheet)
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Fundo escurecido ao abrir
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '50%', // Ocupa no máximo metade da tela
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16, // Respiro extra para o iPhone
    // Sombra para dar profundidade
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  menuHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#141D23',
    marginBottom: 12,
    textAlign: 'center',
  },
  option: {
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 4,
    backgroundColor: 'transparent',
  },
  optionActive: {
    backgroundColor: '#F5E3B3',
  },
  optionText: {
    fontSize: 16, // Aumentamos um pouco para facilitar o toque no mobile
    color: '#374151',
    textAlign: 'center', // Centralizado fica mais elegante no Bottom Sheet
  },
  optionTextActive: {
    color: '#6E5000',
    fontWeight: 'bold',
  },
});