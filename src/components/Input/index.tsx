import { View, Text, TextInput } from "react-native";
import {InputProps} from './types';
import styles from "./styles";

export default function Input({ text, placeholder, keyboardType, value, onChangeText, error }: InputProps) {
  const temErro = Boolean(error);

  return (
    <View>
      <Text style={styles.inputLabel}>{text}</Text>

      <TextInput
        style={[styles.input, temErro && styles.inputErro]}
        placeholder={placeholder}
        placeholderTextColor="#999"
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
        accessibilityLabel={text}
      
      />

      {temErro && <Text style={styles.erroTexto}>{error}</Text>}
    </View>
  );
}
