import React, {useState} from "react";
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";

//Componentes
import BtnPrincipal from "../../components/BtnPrincipal";
import TokenInput from "../../components/TokenInput";

// importacao dos elementos de navegação
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from "../../routes/AppRoutes";


export default function ReceiveTokenScreen() {
    const [token, setToken] = useState("");

    return(
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>Token</Text>
                <Text style={styles.subtitle}>Digite o código enviado para seu e-mail</Text>
            </View>

            <View style={styles.formContainer}>
                <Text style={styles.labelInput}>Digite seu Token</Text>

                <TokenInput
                value={token}
                onChange={setToken}/>

                <TouchableOpacity>
                    <Text style={styles.resendText}>Reenviar Token em 50s</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
                <BtnPrincipal
                title="Enviar Token"
                onPress={() => {}}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{},
    textContainer:{},
    title:{},
    subtitle:{},
    formContainer:{},
    labelInput:{},
    resendText:{},
    buttonContainer:{},
})