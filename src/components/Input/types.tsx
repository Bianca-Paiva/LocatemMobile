import {KeyboardTypeOptions} from "react-native";

export interface InputProps {
  text: string;
  placeholder: string;
  keyboardType: KeyboardTypeOptions;
  value: string;
  onChangeText: (text: string) => void;
}