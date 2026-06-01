import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { validateName, validateEmail, validatePassword, validateCpf, validateCnpj } from "../utils/validationsCadastro";

import { formatDocument } from "../utils/masksCadastro";

import UserTypeCard from '../components/UserTypeCard';
import Input from '../components/Input';
import PasswordInput from '../components/PasswordInput';
import BtnPrincipal from '../components/BtnPrincipal';
import AuthRedirect from '../components/AuthRedirect';

export default function CadastroScreen() {

    const [userType, setUserType] = useState("locatario");

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [passWord, setPassWord] = useState('');
    const [confirmPassWord, setConfirmPassWord] = useState('');
    const [cpfCnpj, setCpfCnpj] = useState('');
    const [address, setAddress] = useState('');


    const handleCadastro = () => {

        // NOME
        if (!validateName(name)) {
            alert("Digite seu nome completo.");
            return;
        }

        // E-MAIL
        if (!validateEmail(email)) {
            alert("Digite um e-mail válido.");
            return;
        }

        // SENHA
        if (!validatePassword(passWord)) {
            alert(
                "A senha deve possuir no mínimo 8 caracteres, uma letra e um número."
            );
            return;
        }

        // CONFIRMAR SENHA
        if (passWord !== confirmPassWord) {
            alert("As senhas não coincidem.");
            return;
        }

        // CPF
        if (
            userType === "locatario" &&
            !validateCpf(cpfCnpj)
        ) {
            alert("CPF inválido.");
            return;
        }

        // CNPJ
        if (
            userType === "locador" &&
            !validateCnpj(cpfCnpj)
        ) {
            alert("CNPJ inválido.");
            return;
        }

        // ENDEREÇO
        if (!address.trim()) {
            alert("Informe seu endereço.");
            return;
        }

        console.log("Cadastro válido");
    };

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.container}
        >

            <View style={styles.containerTitulo}>
                <Text style={styles.titulo}>Crie sua conta</Text>
                <Text style={styles.subTitulo}>Escolha como você deseja usar o aplicativo</Text>
            </View>

            <View style={styles.cardContainer}>

                <UserTypeCard
                    title="Locador"
                    description="Anunciar ferramentas"
                    icon={require("../../assets/IconFerramentaLocador.png")}
                    selected={userType === "locador"}
                    onPress={() => {
                        setUserType("locador");
                        setCpfCnpj('');
                    }}
                />

                <UserTypeCard
                    title="Locatário"
                    description="Alugar ferramentas"
                    icon={require("../../assets/IconUserLocatario.png")}
                    selected={userType === "locatario"}
                    onPress={() => {
                        setUserType("locatario");
                        setCpfCnpj('');
                    }}
                />

            </View>

            <View style={styles.formContainer}>
                <Input
                    text="Nome"
                    placeholder="Digite seu nome completo"
                    keyboardType="default"
                    value={name}
                    onChangeText={setName}
                />

                <Input
                    text="E-mail"
                    placeholder="seu@email.com" keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />

                <PasswordInput
                    text="Senha"
                    placeholder="Crie uma senha segura"
                    keyboardType="default"
                    value={passWord}
                    onChangeText={setPassWord}
                />

                <PasswordInput
                    text="Confirmar senha"
                    placeholder="Digite a senha novamente"
                    keyboardType="default"
                    value={confirmPassWord}
                    onChangeText={setConfirmPassWord}
                />

                <Input
                    text={userType === "locatario" ? "CPF" : "CNPJ"}
                    placeholder={
                        userType === "locatario"
                            ? "000.000.000-00"
                            : "00.000.000/0000-00"
                    }
                    keyboardType="numeric"
                    value={cpfCnpj}
                    onChangeText={(text) =>
                        setCpfCnpj(
                            formatDocument(text, userType)
                        )
                    }
                />

                <Input
                    text="Endereço"
                    placeholder="Digite seu endereço completo"
                    keyboardType="default"
                    value={address}
                    onChangeText={setAddress}
                />

                <BtnPrincipal
                    text="Criar conta"
                    onPress={handleCadastro}
                />
            </View>
            {/* fim formContainer */}

            <AuthRedirect
                text="Já tem uma conta? "
                navigation="Entrar"
            />
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9fafb',
        paddingVertical: 100,
    },

    containerTitulo: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 32,
        paddingHorizontal: 24,
    },

    titulo: {
        fontSize: 32,
        fontWeight: 'bold',
        fontFamily: 'Inter',
        color: '#000000',
        marginBottom: 8,
    },

    subTitulo: {
        fontSize: 16,
        fontWeight: '400',
        fontFamily: 'Inter',
        color: '#666',
        lineHeight: 24,
    },

    formContainer: {
        padding: 24,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3 // sombra para android
    },

    cardContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 12,
        paddingHorizontal: 24,
        marginBottom: 12,
    },
});