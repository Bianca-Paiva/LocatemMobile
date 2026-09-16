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
  subTitulo: {
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    color: "#666",
    lineHeight: 24,
  },
  formContainer: {
    padding: 24,
    borderRadius: 16,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  erroTexto: {
    color: "#dc2626", 
    fontSize: 12,
    marginTop: 4,
    marginBottom: 12,
    fontFamily: "Inter_400Regular", 
  },

  // ============================================================================
  // CARD "CONTA CRIADA COM SUCESSO!!" (verde)
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
