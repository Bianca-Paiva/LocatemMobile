import { Image, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import styles from "./styles";

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
                source={require('../../assets/images/LogoLocatem.png')}
                style={styles.logoImg}
            />
            <Text style={styles.logoTexto}>
                LOCATEM
            </Text>
        </LinearGradient>
    );
}