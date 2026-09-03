import { useEffect } from "react";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { Controller } from "react-hook-form"; 
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { AlertCircle, X, CheckCircle } from "lucide-react-native";

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
  const {
    control,
    errors,
    isLoading,
    loginErrorMessage,
    dismissLoginError,
    loginSuccessMessage,
    handleSignIn,
  } = useLogin();

  // ============================================================================
  // ANIMAÇÃO DE SHAKE (react-native-reanimated)
  // ============================================================================
  // shakeX guarda o deslocamento horizontal do card. Sempre que uma nova
  // mensagem de erro chega, disparamos uma sequência de "tremidas".
  const shakeX = useSharedValue(0);

  useEffect(() => {
    if (loginErrorMessage) {
      shakeX.value = withSequence(
        withTiming(-10, { duration: 50 }),
        withTiming(10, { duration: 50 }),
        withTiming(-8, { duration: 50 }),
        withTiming(8, { duration: 50 }),
        withTiming(-4, { duration: 50 }),
        withTiming(0, { duration: 50 })
      );
    }
  }, [loginErrorMessage]);

  const shakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeX.value }],
  }));

  // ============================================================================
  // ANIMAÇÃO DE ENTRADA DO CARD DE SUCESSO (fade + leve "pop")
  // ============================================================================
  const successOpacity = useSharedValue(0);
  const successScale = useSharedValue(0.9);

  useEffect(() => {
    if (loginSuccessMessage) {
      successOpacity.value = withTiming(1, { duration: 220 });
      successScale.value = withTiming(1, { duration: 220 });
    }
  }, [loginSuccessMessage]);

  const successStyle = useAnimatedStyle(() => ({
    opacity: successOpacity.value,
    transform: [{ scale: successScale.value }],
  }));

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

          {/* CARD "DADOS INVÁLIDOS" — aparece embaixo do campo de senha */}
          {loginErrorMessage && (
            <Animated.View style={[styles.errorCard, shakeStyle]}>
              <AlertCircle size={18} color="#dc2626" style={styles.errorCardIcone} />

              <View style={styles.errorCardTextos}>
                <Text style={styles.errorCardTitulo}>Dados inválidos</Text>
                <Text style={styles.errorCardMensagem}>{loginErrorMessage}</Text>
              </View>

              <TouchableOpacity
                onPress={dismissLoginError}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <X size={16} color="#b91c1c" />
              </TouchableOpacity>
            </Animated.View>
          )}

          <TouchableOpacity 
            style={styles.esqueceuSenha} 
            onPress={() => navigation.navigate('RecoveryRequisitionScreen')}  
          >
            <Text>Esqueceu sua senha?</Text>
          </TouchableOpacity>
        </View>

       <BtnPrincipal
  title={isLoading ? "Carregando..." : "Entrar"}
  onPress={handleSignIn}
/>

        {/* CARD "LOGADO COM SUCESSO!!" — aparece antes de ir pra Home */}
        {loginSuccessMessage && (
          <Animated.View style={[styles.successCard, successStyle]}>
            <CheckCircle size={18} color="#16a34a" style={styles.successCardIcone} />
            <Text style={styles.successCardTexto}>{loginSuccessMessage}</Text>
          </Animated.View>
        )}
        
         
        
      </View>

      <AuthRedirect
        text="Não tenho uma conta? "
        buttonText="Cadastrar"
        route="CadastroScreen"
      />
    </ScrollView>
  );
}
