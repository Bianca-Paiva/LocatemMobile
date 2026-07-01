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
  }
});