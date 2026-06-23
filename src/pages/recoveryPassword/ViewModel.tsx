import { useState } from "react";
import { Alert } from "react-native";

// valores da força  da senha
export type PasswordStrength = "empty" | "weak" | "good" | "strong";

export default function useRecoveryPasswordViewModel() {
  //Estados que vão guardar o que o usurario digita
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //Calcula o quanto forte a senha é
  const getPasswordStrength = (pass: string): PasswordStrength => {
    if (!pass) return "empty";

    //Testa  para  saber o que tem dentro da senha, serve para deixar mais forte
    const hasLetters = /[a-zA-Z]/.test(pass);
    const hasNumbers = /[0-9]/.test(pass);
    const hasSpecialChars = /[^a-zA-Z0-9]/.test(pass);
    const isLongEnough = pass.length >= 8;

    //Classificação da força
    if (isLongEnough && hasLetters && hasNumbers && hasSpecialChars) {
      return "strong"; // se tiver tudo = Forte
    } else if (pass.length >= 6 && hasLetters && hasNumbers) {
      return "good"; //Tem letra e numero = Boa
    } else {
      return "weak"; // Muito curta ou só letras ou numeros = Fraca
    }
  };

  //Chama a função toda vez que a senha muda, para mudar a tela
  const strength = getPasswordStrength(password);

  //Aqui esta a ação ao clicar o botão final
  const handleSubmit = () => {
    //não deixar ir se a senha forem diferentes
    if (password !== confirmPassword) {
      console.log("Erro: As senhas não conferem!");
      Alert.alert("Erro", "Senha inválida");
      return;
    }

    //-> API para efetivar a troca de senha
    console.log("Sucesso: Senha valida e pronta para envio");
    Alert.alert("Sucesso", "Senha válida e pronta para envio");
  };

  return {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    strength,
    handleSubmit,
  };
}
