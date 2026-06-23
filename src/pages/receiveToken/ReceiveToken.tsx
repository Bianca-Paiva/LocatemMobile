import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

// Componentes Reutilizáveis
import BtnPrincipal from "../../components/BtnPrincipal";
import TokenInput from "../../components/TokenInput";

// Navegação e Tipagem
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../routes/AppRoutes";

// Importando a camada de lógica isolada
import useReceiveTokenViewModel from "./ViewModel";

type ReceiveTokenScreenProp = StackNavigationProp<
  RootStackParamList,
  "ReceiveTokenScreen"
>;

export default function ReceiveTokenScreen() {
  const navigation = useNavigation<ReceiveTokenScreenProp>();

  // Consome as variáveis de estado e funções geradas pelo ViewModel
  const {
    token,
    setToken,
    timer,
    handleResendToken,
    handleVerifyToken,
  } = useReceiveTokenViewModel();

  return (
    <View style={styles.safeArea}>
      {/* Container dinâmico que impede o teclado nativo de esmagar o layout (foco em iOS) */}
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* Bloco Superior: Textos e Formulário */}
        <View style={styles.content}>
          
          <View style={styles.textContainer}>
            <Text style={styles.title}>Código de verificação</Text>
            <Text style={styles.subtitle}>
              Insira o código de 5 dígitos que enviamos para o seu e-mail.
            </Text>
          </View>

          <View style={styles.formContainer}>
            {/* Input Especializado: Recebe o token e a função para atualizá-lo */}
            <TokenInput value={token} onChange={setToken} />

            {/* Botão de Reenvio: Usa Pressable para gerenciar estilos dinâmicos baseados no toque */}
            <Pressable
              onPress={handleResendToken}
              disabled={timer > 0} // Desativa o clique nativamente se o tempo for maior que 0
              style={styles.resendContainer}
            >
              {/* Função Render Prop: detecta automaticamente quando o usuário encosta o dedo */}
              {({ pressed }) => (
                <Text
                  style={[
                    styles.resendText,
                    { color: pressed ? "#FFD700" : "#0A0A0A" }, // Amarelo no clique, Preto solto
                    timer > 0 && styles.resendTextDisabled, // Cinza se estiver bloqueado
                  ]}
                >
                  {/* Feedback visual dinâmico do cronômetro */}
                  {timer > 0 ? `Reenviar Token em ${timer}s` : "Reenviar Token"}
                </Text>
              )}
            </Pressable>
          </View>
        </View>

        {/* Bloco Inferior: Botão de Ação Principal */}
        <View style={styles.buttonContainer}>
          <BtnPrincipal 
            title="Verificar Código" 
            onPress={() => handleVerifyToken(() => {
              // Passa a navegação como um "Callback" para o ViewModel disparar no sucesso
              navigation.navigate("RecoveryPasswordScreen");
            })} 
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

// Estilização 100% voltada para a estruturação (Flexbox) e fidelidade ao Figma
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
  },
  content: {},
  textContainer: {
    marginBottom: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0A0A0A",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 22,
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
  },
  resendContainer: {
    alignSelf: "flex-end", // Posiciona o botão de texto no canto direito
    marginTop: 16,
    paddingVertical: 8,
  },
  resendText: {
    fontSize: 14,
    fontWeight: "600",
  },
  resendTextDisabled: {
    color: "#A3A3A3", // Tonalidade exata para indicar inatividade
  },
  buttonContainer: {
    width: "100%",
    marginTop: 125, // Afasta o botão do formulário mantendo-o visível e acessível
  },
});