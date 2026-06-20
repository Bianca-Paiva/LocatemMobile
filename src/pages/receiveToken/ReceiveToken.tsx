import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

// Componentes isolados do projeto
import BtnPrincipal from "../../components/BtnPrincipal";
import TokenInput from "../../components/TokenInput";

// Navegação e Tipagem do TypeScript
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../routes/AppRoutes";

// Tipagem exata para garantir que a navegação não quebre
type ReceiveTokenScreenProp = StackNavigationProp<
  RootStackParamList,
  "ReceiveTokenScreen"
>;

export default function ReceiveTokenScreen() {
  const navigation = useNavigation<ReceiveTokenScreenProp>();

  // Estados da tela
  const [token, setToken] = useState(""); // Guarda o código digitado nos quadradinhos
  const [timer, setTimer] = useState(50); // Controla os segundos restantes do botão de reenvio

  // Regra do Cronômetro Regressivo
  useEffect(() => {
    // Se o tempo acabou (chegou a 0), interrompe a função
    if (timer === 0) return;

    // Cria o relógio que diminui 1 segundo do estado 'timer' a cada 1000ms
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    // Limpeza obrigatória: Destrói o relógio velho antes de criar o novo.
    // Sem isso, o app acumula processos na memória e trava (memory leak).
    return () => clearInterval(interval);
  }, [timer]); // Este array faz o useEffect rodar novamente toda vez que o 'timer' muda

  // Ação: Reenviar o código
  const handleResendToken = () => {
    // Só permite o reenvio se o cronômetro estiver zerado
    if (timer === 0) {
      setTimer(50); // Reseta o relógio na tela
      // TODO: Inserir a chamada da API para reenviar o token por email aqui
    }
  };

  // Ação: Verificar se o código está correto
  const handleVerifyToken = () => {
    // TODO: Inserir a chamada da API para validar o token preenchido
    console.log("Token digitado", token);

    navigation.navigate("RecoveryPasswordScreen");
  };

  return (
    <View style={styles.safeArea}>
      {/* Impede que o teclado cubra os elementos da tela no iOS */}
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.content}>
          
          {/* Cabeçalho da tela */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>Código de verificação</Text>
            <Text style={styles.subtitle}>
              Insira o código de 5 dígitos que enviamos para o seu e-mail.
            </Text>
          </View>

          {/* Área interativa (Inputs e Link de Reenvio) */}
          <View style={styles.formContainer}>
            
            {/* Componente dos 5 quadrados interligados */}
            <TokenInput value={token} onChange={setToken} />

            {/* Link de reenvio com detecção de clique (Pressable) */}
            <Pressable
              onPress={handleResendToken}
              disabled={timer > 0} // Trava o botão enquanto houver tempo no relógio
              style={styles.resendContainer}
            >
              {/* Render prop que descobre se o dedo do usuário está pressionando a tela */}
              {({ pressed }) => (
                <Text
                  style={[
                    styles.resendText,
                    { color: pressed ? "#FFD700" : "#0A0A0A" }, // Amarelo durante o toque, preto solto
                    timer > 0 && styles.resendTextDisabled, // Aplica estilo cinza se bloqueado
                  ]}
                >
                  {timer > 0 ? `Reenviar Token em ${timer}s` : "Reenviar Token"}
                </Text>
              )}
            </Pressable>
          </View>
        </View>

        {/* Botão de ação principal */}
        <View style={styles.buttonContainer}>
          <BtnPrincipal title="Verificar Código" onPress={handleVerifyToken} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

// Estilização estrutural e visual (Baseada no Figma)
const styles = StyleSheet.create({
  safeArea: {
    flex: 1, // Força a view a cobrir a tela inteira
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
    alignItems: "center", // Centraliza título e subtítulo no eixo X
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
    textAlign: "center", // Garante que textos com quebra de linha fiquem centralizados
  },
  formContainer: {
    width: "100%", // Garante que os inputs utilizem o espaço da tela
  },
  resendContainer: {
    alignSelf: "flex-end", // Empurra o link para o canto direito
    marginTop: 16,
    paddingVertical: 8,
  },
  resendText: {
    fontSize: 14,
    fontWeight: "600",
  },
  resendTextDisabled: {
    color: "#A3A3A3", // Cor inativa (cinza) quando o cronômetro roda
  },
  buttonContainer: {
    width: "100%",
    marginTop: 125, // Afasta o botão do formulário e joga ele para o meio da tela
  },
});