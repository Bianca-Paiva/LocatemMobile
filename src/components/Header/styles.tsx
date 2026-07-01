import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    headerContainer: {
        width: "100%",
        height: 140, // altura do header
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        gap: 10,
    },
 
    logoImg: {
        width: 35,
        height: 35,
        resizeMode: "contain", // mantém proporção da imagem
    },
 
    logoTexto: {
        fontSize: 27,
        fontWeight: "800",
        color: "#000",
        letterSpacing: 1,
    },
    topo:{
       marginTop: 25,
       flexDirection:"row",
       alignItems:"center",
       width:"100%",
       gap:10,
    },
    searchContainer:{
        flex:1,
    }
});

export default styles;