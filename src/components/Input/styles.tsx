import { StyleSheet } from "react-native";
import colors from "../../theme/colors";

const styles = StyleSheet.create({
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#344054",
    marginBottom: 6,
  },

  input: {
    height: 55,
    borderColor: "#d0d5dd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#1a1c1e",
    backgroundColor: "#f9fafb",
    marginBottom: 20,
  },

  // Feedback visual de campo inválido: borda e fundo em vermelho.
  inputErro: {
    borderColor: colors.error,
    backgroundColor: colors.errorBg,
    marginBottom: 6,
  },

  erroTexto: {
    color: colors.error,
    fontSize: 13,
    marginBottom: 14,
    marginTop: -2,
  },
});

export default styles;
