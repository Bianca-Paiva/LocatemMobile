import { View, Text, TouchableOpacity, StyleSheet, TextStyle } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface AuthRedirectProps {
    text: string;
    buttonText: string;
    route: string;
    textStyle?: TextStyle;
    buttonTextStyle?: TextStyle;
}

export default function AuthRedirect({ text, buttonText, route, textStyle, buttonTextStyle }: AuthRedirectProps) {    

    const navigation = useNavigation<any>();

    return (
        <View style={styles.footerContainer}>
            <Text style={[styles.footerText, textStyle]}>{text}</Text>

            <TouchableOpacity
                onPress={() => navigation.navigate(route)}
            >
                <Text style={[styles.registerText, buttonTextStyle]}>
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