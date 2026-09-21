import { StyleSheet, Dimensions, Platform } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Largura do drawer: min(82vw, 310px) -> igual à regra do CSS Web
export const DRAWER_WIDTH = Math.min(SCREEN_WIDTH * 0.82, 310);
export const styles = StyleSheet.create({

    // Container do cabeçalho
    headerContainer: {
        width: "100%",
        paddingTop: Platform.OS === "ios" ? 50 : 30,
        paddingHorizontal: 16,
        paddingBottom: 24,
        gap: 15,
        
    },

    // Conteúdo do cabeçalho
    topoEsquerdo: {
        flexDirection: "row",
        alignItems: "center",
    },

    
    linhaTopo: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
         marginTop:10,
    },


    // Campo de pesquisa
    searchContainer: {
        width: "100%",
        height: 45,
        backgroundColor: "#FFFFFF",
        borderRadius: 999,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 3,
    },
        BackBtn: {
           
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
    },
        logo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 7,
    },

    logoImg: {
        width: 26,
        height: 26,
        resizeMode: "contain",
    },

    logoTexto: {
        fontSize: 19,
        fontWeight: "800",
        letterSpacing: -0.4,
        color: "#0A0A0A",
    },
        ladoEsquerdo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },

      carrinhoBtn: {
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
    },

    quantidadeCarrinho: {
        position: "absolute",
        top: 0,
        right: 0,
        minWidth: 18,
        height: 18,
        paddingHorizontal: 4,
        borderRadius: 999,
        backgroundColor: "#FFD600",
        alignItems: "center",
        justifyContent: "center",
    },

    quantidadeCarrinhoTexto: {
        fontSize: 11,
        fontWeight: "800",
        color: "#0A0A0A",
    },

});