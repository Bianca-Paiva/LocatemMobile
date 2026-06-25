import {useState} from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { validateEmail, validatePassword } from "../utils/validationsCadastro";

// importacao dos elementos de navegação
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../routes/AppRoutes';

// Components ↓
import Input from "../components/Input";
import PasswordInput from "../components/PasswordInput";
import BtnPrincipal from "../components/BtnPrincipal";
import {AuthRedirect} from "../components/AuthRedirect";

export default function LoginScreen() {

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // E-MAIL ↓
    if (!validateEmail(email)) {
      alert("Digite um e-mail válido.");
      return;
    }
    // SENHA ↓
    if (!validatePassword(password)) {
      alert(
        "Não foi possível realizar o login. Verifique suas credenciais.",
      );
      return;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.containerTitulo}>
        <Text style={styles.titulo}>Entrar</Text>
      </View>

      <View style={styles.formContainer}>
        <Input
          text="E-mail"
          placeholder="seu@email.com"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <View>
          <PasswordInput
            text="Senha"
            placeholder="Coloque sua senha"
            keyboardType="default"
            value={password}
            onChangeText={setPassword}
            marginBottom={5}
          />
          <TouchableOpacity style={styles.esqueceuSenha} onPress={() => {
            navigation.navigate('RecoveryRequisitionScreen');
          }}  >
            <Text>Esqueceu sua senha?</Text>
          </TouchableOpacity>
        </View>

        <BtnPrincipal title="Entrar" onPress={handleLogin} />
      </View>

      <AuthRedirect
        text="Não tenho uma conta? "
        buttonText="Cadastrar"
        route="CadastroScreen"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerTitulo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
    paddingHorizontal: 24,
  },
  titulo: {
    fontSize: 32,
    fontFamily: "Inter_700Bold",
    color: "#000000",
    marginBottom: 8,
  },
  container: {
    backgroundColor: "#f9fafb",
    paddingVertical: 100,
  },

  formContainer: {
    padding: 24,
    borderRadius: 16,
  },

  esqueceuSenha: {
    marginTop: 0,
    marginBottom: 24,
  },
});
