import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

  // Container principal
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  // Barra de filtros
  barraFiltros: {
    marginHorizontal: 20,
    marginTop: 14,
    marginBottom: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  // Grid de produtos
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginTop: 10,
  },

  resultadoContainer: {
    width: "100%",
    marginHorizontal: 10,
    marginTop: 24,
    alignItems: "center",
  },

  resultadoText: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
  },

});

