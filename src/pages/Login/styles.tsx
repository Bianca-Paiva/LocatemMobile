import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9fafb",
    paddingVertical: 100,
  },
  containerTitulo: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
    paddingHorizontal: 24,
  },
  titulo: {
    fontSize: 32,
    fontFamily: "Inter_700Bold",
    color: "#000000",
    marginBottom: 8,
  },
  formContainer: {
    padding: 24,
    borderRadius: 16,
  },
  esqueceuSenha: {
    marginTop: 0,
    marginBottom: 24,
  },
  // Já deixei este estilo preparado para o nosso próximo passo (Validação)
  erroTexto: {
    color: "#dc2626", // Um tom de vermelho elegante (Tailwind Red 600)
    fontSize: 12,
    marginTop: 4,
    marginBottom: 12,
    fontFamily: "Inter_400Regular", // Ajusta de acordo com as tuas fontes carregadas
  },

  // ============================================================================
  // CARD "DADOS INVÁLIDOS" (inline, embaixo do campo de senha)
  // ============================================================================
  errorCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 14,
    marginTop: 12,
    marginBottom: 8,
    gap: 10,
    // Faixa vermelha fininha à esquerda em vez de contorno pesado
    borderLeftWidth: 3,
    borderLeftColor: "#dc2626",
    // Sombra bem sutil pra dar profundidade sem pesar
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  errorCardIcone: {
    marginTop: 2,
  },
  errorCardTextos: {
    flex: 1,
  },
  errorCardTitulo: {
    color: "#111827",
    fontSize: 14,
    fontFamily: "Inter_700Bold",
    marginBottom: 2,
  },
  errorCardMensagem: {
    color: "#6b7280",
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    lineHeight: 18,
  },

  // ============================================================================
  // CARD "LOGADO COM SUCESSO!!" (verde)
  // ============================================================================
  successCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginTop: 16,
    gap: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#16a34a", // Green 600
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  successCardIcone: {
    marginTop: 1,
  },
  successCardTexto: {
    color: "#111827",
    fontSize: 14,
    fontFamily: "Inter_700Bold",
  },
});
