import {KeyboardTypeOptions} from "react-native";

export interface PasswordInputProps {
  text: string;
  placeholder: string;
  keyboardType: KeyboardTypeOptions;
  value: string;
  marginBottom?: number;
  onChangeText: (text: string) => void;
  /**
   * Mensagem de erro de validação (ex.: "Senha obrigatória").
   * Quando presente, o input ganha borda/fundo vermelhos e a mensagem
   * é exibida abaixo do campo.
   */
  error?: string | null;
}
