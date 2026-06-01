import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function AuthRedirect({ text, navigation }) {
    return (
        <View style={styles.footerContainer}>
            <Text style={styles.footerText}>{text}</Text>

            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                <Text style={styles.registerText}>{navigation}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        fontFamily: 'Inter'
    },

    footerText: {
        fontSize: 15,
        color: '#6c727f'
    },

    registerText: {
        fontSize: 15,
        color: '#000000',
        fontWeight: '500'
    }
});