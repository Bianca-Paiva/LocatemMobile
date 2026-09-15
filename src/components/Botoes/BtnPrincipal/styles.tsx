import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    button: {
        height: 48,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8
    },

    buttonText: {
        fontSize: 16,
        fontWeight: 'bold'
    },

    //Variant primario
    primaryBackground: {
        backgroundColor: '#FFD600',
    },
    primaryText: {
        color: '#000000',
    },

    //Variant secundario
    secondaryBackground: {
        backgroundColor: '#F5E3B3',
    },
    secondaryText: {
        color: '#6E5000',
    }
});

export default styles;