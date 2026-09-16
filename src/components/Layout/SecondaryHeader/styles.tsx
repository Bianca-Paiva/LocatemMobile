import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({

    // Container do cabeçalho
    headerContainer: {
        width: "100%",
        height: 140,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        gap: 10,
    },

    // Conteúdo do cabeçalho
    topo: {
        marginTop: 25,
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        gap: 10,
    },

    // Campo de pesquisa
    searchContainer: {
        flex: 1,
    },

});