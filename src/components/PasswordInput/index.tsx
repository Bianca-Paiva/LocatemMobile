import { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, KeyboardTypeOptions } from "react-native";
import styles from "./styles";
import {PasswordInputProps} from './types';

export default function PasswordInput({ text, placeholder, keyboardType, value, onChangeText, marginBottom = 20, }: PasswordInputProps) {
    
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <View>
      <Text style={styles.inputLabel}>{text}</Text>

      <View style={[styles.inputContainer, { marginBottom }]}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#999"
          keyboardType={keyboardType}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!showPassword}
        />

        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Image
            source={
              showPassword
                ? require("../../assets/images/olhoAberto.png")
                : require("../../assets/images/olhoFechado.png")
            }
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};