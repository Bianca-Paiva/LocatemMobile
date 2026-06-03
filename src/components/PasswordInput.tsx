import { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, KeyboardTypeOptions } from "react-native";

interface PasswordInputProps {
  text: string;
  placeholder: string;
  keyboardType: KeyboardTypeOptions;
  value: string;
  onChangeText: (text: string) => void;
}

export default function PasswordInput({ text, placeholder, keyboardType, value, onChangeText }: PasswordInputProps) {
    
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <View>
      <Text style={styles.inputLabel}>{text}</Text>

      <View style={styles.inputContainer}>
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
}

const styles = StyleSheet.create({
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#344054",
    marginBottom: 6,
  },

  inputContainer: {
    position: "relative",
    marginBottom: 20,
  },

  input: {
    height: 55,
    borderColor: "#d0d5dd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingRight: 50,
    fontSize: 16,
    color: "#1a1c1e",
    backgroundColor: "#f9fafb",
  },

  eyeButton: {
    position: "absolute",
    right: 16,
    top: 16,
  },

  eyeIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
});
