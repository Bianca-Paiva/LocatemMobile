import React, {useState} from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, TextInput } from "react-native";

//componentes
import Input from "../../components/Input";
import BtnPrincipal from "../../components/BtnPrincipal";

//ViewModel
import RecoveryRequisitionViewModel from "./ViewModel";

//navegação
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../routes/AppRoutes";

export const RecoveryRequisitionScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const {onEmailChange, userEmail } = RecoveryRequisitionViewModel();
    return(
        <View style={styles.container}>
            <Text>Informer seu E-mail</Text>

            <View style={styles.form}>
                <Input
                    text="E-mail"
                    placeholder="seu@email.com"
                    keyboardType="email-address"
                    value={userEmail}
                    onChangeText={onEmailChange}
                />

                <View>
                    <BtnPrincipal
                        title="Enviar"
                        onPress={() => {}}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    form:{}
})