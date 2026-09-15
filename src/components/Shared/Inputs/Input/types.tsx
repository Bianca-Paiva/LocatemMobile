import {KeyboardTypeOptions} from "react-native";

export interface InputProps {
  text: string;
  placeholder: string;
  keyboardType: KeyboardTypeOptions;
  value: string;
  onChangeText: (text: string) => void;
  /**
   * Mensagem de erro de validação (ex.: "E-mail inválido").
   * Quando presente, o input ganha borda/fundo vermelhos e a mensagem
   * é exibida abaixo do campo. Passe `undefined`/`null` para limpar.
   */
  error?: string | null;
}
