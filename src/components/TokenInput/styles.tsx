import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        justifyContent:"center",
        gap:9,
        width : "100%",
        marginTop:12,
    },
    input:{
        width: 60,
        height:86,
        borderWidth: 1,
        borderColor: "#D9D9D9",
        borderRadius: 12,
        textAlign: "center",
        fontSize: 28,
    },
    inputActive:{
        borderColor:"#FFD700",
        borderWidth:2,
    },
});

export default styles;