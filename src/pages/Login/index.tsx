import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { Controller } from "react-hook-form"; 

// Importação dos elementos de navegação
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/AppRoutes';

// Componentes
import Input from "../../components/Input";
import PasswordInput from "../../components/PasswordInput";
import BtnPrincipal from "../../components/BtnPrincipal";
import { AuthRedirect } from "../../components/AuthRedirect";

// Estilos
import { styles } from "./styles";

// Importando (Custom Hook)
import { useLogin } from "./useLogin";

export default function LoginScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  
  // Extraímos tudo o que precisamos do nosso hook
  const { control, errors, isLoading, handleSignIn } = useLogin();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.containerTitulo}>
        <Text style={styles.titulo}>Entrar</Text>
      </View>

      <View style={styles.formContainer}>
        
        {/* INPUT DE E-MAIL CONTROLADO */}
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <>
              <Input
                text="E-mail"
                placeholder="seu@email.com"
                keyboardType="email-address"
                value={value}
                onChangeText={onChange}
              />
              {/* Exibição do erro de E-mail abaixo do input */}
              {errors.email && (
                <Text style={styles.erroTexto}>{errors.email.message}</Text>
              )}
            </>
          )}
        />
        
        <View style={{ marginTop: 16 }}>
          {/* INPUT DE SENHA CONTROLADO */}
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <>
                <PasswordInput
                  text="Senha"
                  placeholder="Coloque sua senha"
                  keyboardType="default"
                  value={value}
                  onChangeText={onChange}
                  marginBottom={5}
                />
                {/* Exibição do erro de Senha abaixo do input */}
                {errors.password && (
                  <Text style={styles.erroTexto}>{errors.password.message}</Text>
                )}
              </>
            )}
          />

          <TouchableOpacity 
            style={styles.esqueceuSenha} 
            onPress={() => navigation.navigate('RecoveryRequisitionScreen')}  
          >
            <Text>Esqueceu sua senha?</Text>
          </TouchableOpacity>
        </View>

        <BtnPrincipal 
          title={isLoading ? "Carregando..." : "Entrar"} 
          
            onPress={ () => {
                 navigation.navigate('HomeScreen')
                 {handleSignIn} 
                }}
          // Se o teu BtnPrincipal aceitar a prop disabled, descomenta a linha abaixo:
          // disabled={isLoading} 
        />
      </View>

      <AuthRedirect
        text="Não tenho uma conta? "
        buttonText="Cadastrar"
        route="CadastroScreen"
      />
    </ScrollView>
  );
}