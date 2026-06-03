import { Text, TouchableOpacity, StyleSheet } from "react-native";

interface BtnPrincipalProps {
    title: string;
    onPress: () => void;
}

export default function BtnPrincipal({ title, onPress }: BtnPrincipalProps) {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={onPress}
        >
            <Text style={styles.buttonText}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#FFD600',
        height: 48,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8
    },

    buttonText: {
        color: '#000000',
        fontSize: 16,
        fontWeight: 'bold'
    },
});