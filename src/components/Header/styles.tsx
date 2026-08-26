import { StyleSheet, Dimensions, Platform } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Largura do drawer: min(82vw, 310px) -> igual à regra do CSS Web
export const DRAWER_WIDTH = Math.min(SCREEN_WIDTH * 0.82, 310);

const styles = StyleSheet.create({
    // ===========================
    // HEADER (topo com gradiente)
    // ===========================
    headerContainer: {
        width: "100%",
        paddingTop: Platform.OS === "ios" ? 50 : 30,
        paddingHorizontal: 16,
        paddingBottom: 24,
        gap: 15,
    },

    linhaTopo: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    ladoEsquerdo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },

    menuBtn: {
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

    // ===========================
    // BARRA DE PESQUISA
    // ===========================
    barraPesquisa: {
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

    barraPesquisaInput: {
        flex: 1,
        fontSize: 15,
        color: "#0A0A0A",
        padding: 0,
    },

    // ===========================
    // OVERLAY (fundo escurecido)
    // ===========================
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.45)",
    },

    // ===========================
    // DRAWER (menu lateral)
    // ===========================
    drawer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: DRAWER_WIDTH,
    height: "100%",
    backgroundColor: "#FFFFFF",
},

    drawerCabecalho: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingTop: Platform.OS === "ios" ? 64 : 43,
        paddingBottom: 13,
        borderBottomWidth: 1,
        borderBottomColor: "#F1F1F1",
    },

    drawerLogo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },

    drawerLogoImg: {
        width: 24,
        height: 24,
        resizeMode: "contain",
    },

    drawerLogoTexto: {
        fontSize: 17,
        fontWeight: "800",
        letterSpacing: -0.5,
        color: "#0A0A0A",
    },

    drawerBtnFechar: {
        width: 34,
        height: 34,
        borderRadius: 17,
        alignItems: "center",
        justifyContent: "center",
    },

    drawerConteudo: {
        flex: 1,
        paddingVertical: 8,
    },

    navItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
        paddingHorizontal: 20,
        paddingVertical: 14,
    },

    navItemAtivo: {
        backgroundColor: "#FFF8DC",
    },

    navItemIcon: {
        opacity: 0.75,
    },

    navItemTexto: {
        fontSize: 14,
        fontWeight: "500",
        color: "#0A0A0A",
    },

    navItemTextoAtivo: {
        fontWeight: "700",
    },
});

export default styles;
