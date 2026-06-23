import React, {useState} from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, TextInput } from "react-native";

//componentes
import Input from "../../components/Input";
import BtnPrincipal from "../../components/BtnPrincipal";
import AuthRedirect from "../../components/AuthRedirect";

//ViewModel
import RecoveryRequisitionViewModel from "./ViewModel";

//navegação
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../routes/AppRoutes";


export const RecoveryRequisitionScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const {onEmailChange, userEmail, validateSendEmail } = RecoveryRequisitionViewModel();



    return(
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>Informe seu E-mail</Text>
                <Text style={styles.subtitle}>Digite o e-mail associado à sua conta. Enviaremos um token para recuperação da senha.</Text>
            </View>

            <View style={styles.formContainer}>       
                <Input
                    text="E-mail"
                    placeholder="seu@email.com"
                    keyboardType="email-address"
                    value={userEmail}
                    onChangeText={onEmailChange}
                />
                <BtnPrincipal
                title="Enviar"
                onPress={() => validateSendEmail(() => {
                    navigation.navigate("ReceiveTokenScreen");
                })} 
                />
            </View>

            <AuthRedirect
                text="Precisa de ajuda? "
                buttonText="Entre em contato com o suporte."
                route=""
                textStyle={{
                    fontSize:12,
                }}
                buttonTextStyle={{
                    fontSize:12,
                    textDecorationLine:"underline",
                }}
                />
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f9fafb",
        paddingVertical: 100,
    },

    textContainer:{
        display: "flex",
        alignItems: "center" ,
        justifyContent: "center",
        marginBottom: 55,
        marginRight:12,
        marginLeft:12,   
    },

    title:{
        fontSize: 36,
        fontFamily: "Inter_700Bold",
        color: "#000000",
        marginBottom:8,

    },
    subtitle:{
        fontSize:14,
        textAlign:"center",
        marginRight:12,
        marginLeft:12,   
    },
    formContainer:{
        padding: 42,
        borderRadius:16,
    },
})