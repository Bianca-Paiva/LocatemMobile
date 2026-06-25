import { View, Text, TextInput, StyleSheet, KeyboardTypeOptions, } from "react-native";
import {InputProps} from './types';
import styles from "./styles";

export default function Input({ text, placeholder, keyboardType, value, onChangeText }: InputProps) {
  return (
    <View>
      <Text style={styles.inputLabel}>{text}</Text>

      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#999"
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}