import { StyleSheet } from "react-native";

export default StyleSheet.create({

  container: {
    width: 140,
    position: "relative",

  },

  button: {
    height: 35,
    borderWidth: 2,
    borderColor: "#8A8A8A",
    borderRadius: 25,

    paddingHorizontal: 18,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    backgroundColor: "#FFF",
  },

  text: {
    fontSize: 13,
    color: "#555",
  },

  dropdown: {
    marginTop: 5,

    backgroundColor: "#FFF",
        position: "absolute",
    top: 45,          // abaixo do botão
    left: 0,
    width: 150,
    borderRadius: 12,
    zIndex: 1000,
    
    elevation: 5,

    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  option: {
    paddingVertical: 14,
    paddingHorizontal: 18,
  },

  optionText: {
    fontSize: 12,
    color: "#333",
  },

  selectedOption: {
    backgroundColor: "#F2F2F2",
  },

  selectedText: {
    fontWeight: "600",
  },

});