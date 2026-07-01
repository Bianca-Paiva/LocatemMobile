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
  }
});