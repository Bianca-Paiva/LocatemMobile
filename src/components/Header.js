import { Image, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

export default function Header() {
    return (
        <LinearGradient
            colors={["#FFD600", "#F2CB00", "#FFF6C7", "#F9FAFB"]}
            locations={[0, 0.3, 0.75, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.headerContainer}
        >
            <Image
                source={require('../../assets/LogoLocatem.png')}
                style={styles.logoImg}
            />
            <Text style={styles.logoTexto}>
                LOCATEM
            </Text>
        </LinearGradient>
    );
}

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
})