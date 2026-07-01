import {KeyboardTypeOptions} from "react-native";

export interface PasswordInputProps {
  text: string;
  placeholder: string;
  keyboardType: KeyboardTypeOptions;
  value: string;
  marginBottom?: number;
  onChangeText: (text: string) => void;
}