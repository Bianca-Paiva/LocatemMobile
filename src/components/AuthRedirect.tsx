import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface AuthRedirectProps {
    text: string;
    buttonText: string;
    route: string;
}

export default function AuthRedirect({ text, buttonText, route }: AuthRedirectProps) {    

    const navigation = useNavigation<any>();

    return (
        <View style={styles.footerContainer}>
            <Text style={styles.footerText}>{text}</Text>

            <TouchableOpacity
                onPress={() => navigation.navigate(route)}
            >
                <Text style={styles.registerText}>
                    {buttonText}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },

    footerText: {
        fontSize: 15,
        color: '#6c727f',
        fontFamily: 'Inter_400Regular',
    },

    registerText: {
        fontSize: 15,
        color: '#000000',
        fontFamily: 'Inter_500Medium',
    }
});