import { useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity } from "react-native";

import { validateEmail, validatePassword } from "../../utils/validationsCadastro";

// Importação dos elementos de navegação
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/AppRoutes';

// Componentes personalizados
import Input from "../../components/Input";
import PasswordInput from "../../components/PasswordInput";
import BtnPrincipal from "../../components/BtnPrincipal";
import { AuthRedirect } from "../../components/AuthRedirect";

// Estilos Isolados ↓
import { styles } from "./styles";

export default function LoginScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
 
  // NOTA DO MENTOR: Estes states e a função handleLogin vão sair daqui no próximo passo!
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Validação temporária por e-mail
    if (!validateEmail(email)) {
      alert("Digite um e-mail válido.");
      return;
    }
    // Validação temporária por senha
    if (!validatePassword(password)) {
      alert("Não foi possível realizar o login. Verifique as suas credenciais.");
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
          <TouchableOpacity 
            style={styles.esqueceuSenha} 
            onPress={() => navigation.navigate('RecoveryRequisitionScreen')}  
          >
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