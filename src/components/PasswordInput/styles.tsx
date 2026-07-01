import { StyleSheet } from "react-native";

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
});

export default styles;