import { StyleSheet } from "react-native";
import colors from "../../theme/colors";

const styles = StyleSheet.create({
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#344054",
    marginBottom: 6,
  },

  inputContainer: {
    position: "relative",
  },

  input: {
    height: 55,
    borderColor: "#d0d5dd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingRight: 50,
    fontSize: 16,
    color: "#1a1c1e",
    backgroundColor: "#f9fafb",
  },

  // Feedback visual de campo inválido: borda e fundo em vermelho.
  inputErro: {
    borderColor: colors.error,
    backgroundColor: colors.errorBg,
  },

  eyeButton: {
    position: "absolute",
    right: 16,
    top: 16,
  },

  eyeIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },

  erroTexto: {
    color: colors.error,
    fontSize: 13,
    marginBottom: 14,
    marginTop: 4,
  },
});

export default styles;
