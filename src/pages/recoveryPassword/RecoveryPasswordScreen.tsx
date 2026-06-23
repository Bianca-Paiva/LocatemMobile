import React from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView, // 1. Adicionamos a importação do ScrollView
} from "react-native";

// Componentes
import BtnPrincipal from "../../components/BtnPrincipal";
import PasswordInput from "../../components/PasswordInput";

// Navegação
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../routes/AppRoutes";

// ViewModel
import useRecoveryPasswordViewModel from "./ViewModel";

export default function RecoveryPasswordScreen() {
  // Consome as variáveis e funções da inteligência da tela
  const {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    strength,
    handleSubmit,
  } = useRecoveryPasswordViewModel();

  // Dicionário visual para as barras de força
  const strengthConfig = {
    empty: { color: "#D9D9D9", text: "", bars: 0 },
    weak: { color: "#E11D48", text: "Fraca", bars: 1 },
    good: { color: "#FFC300", text: "Boa", bars: 2 },
    strong: { color: "#6FE824", text: "Forte", bars: 3 },
  };

  // Pega a configuração visual de acordo com o que foi digitado
  const currentConfig = strengthConfig[strength];

  return (
    <View style={styles.safeArea}>
      {/* O KeyboardAvoidingView gerencia o espaço que o teclado ocupa na tela */}
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* 2. ScrollView engloba todo o conteúdo.  */}
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false} // Esconde a barrinha feia de rolagem lateral
          keyboardShouldPersistTaps="handled" // Permite clicar no botão mesmo com o teclado aberto
        >
          <View style={styles.content}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>Informe sua nova{"\n"}senha</Text>
            </View>

            <View style={styles.formContainer}>
              {/* Input Senha Nova */}
              <PasswordInput
                text="Digite sua nova senha"
                placeholder="••••••••"
                keyboardType="default"
                value={password}
                onChangeText={setPassword}
                marginBottom={16}
              />

              {/* Bloco do Indicador de Força */}
              <View style={styles.strengthContainer}>
                <View style={styles.barsContainer}>
                  <View style={[styles.bar, currentConfig.bars >= 1 && { backgroundColor: currentConfig.color }]} />
                  <View style={[styles.bar, currentConfig.bars >= 2 && { backgroundColor: currentConfig.color }]} />
                  <View style={[styles.bar, currentConfig.bars >= 3 && { backgroundColor: currentConfig.color }]} />
                </View>

                {strength !== "empty" && (
                  <Text style={styles.strengthText}>
                    Segurança: <Text style={{ color: currentConfig.color }}>{currentConfig.text}</Text>
                  </Text>
                )}
              </View>

              {/* Input Confirmar Senha */}
              <PasswordInput
                text="Confirme sua nova senha"
                placeholder="••••••••"
                keyboardType="default"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>
          </View>

          {/* O Botão agora fica DENTRO do ScrollView, logo abaixo do conteúdo.
              Isso garante que o usuário consiga rolar até ele. */}
          <View style={styles.buttonContainer}>
            <BtnPrincipal title="Alterar Senha" onPress={handleSubmit} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  container: {

  },
  // 3. Movemos os paddings do container principal para o interior do ScrollView
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 60
  },
  content: {
    flex: 1, // Empurra o botão para baixo se sobrar espaço na tela
  },
  textContainer: {
    marginBottom: 107,
    alignItems: "center",
  },
  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#0A0A0A",
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
  },
  strengthContainer: {
    marginBottom: 16,
    marginTop: -8,
  },
  barsContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
  },
  bar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#E0E0E0",
  },
  strengthText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#0A0A0A",
  },
  buttonContainer: {
    width: "100%",
    marginTop: 40,
  },
});