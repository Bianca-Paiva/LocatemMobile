import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import {PasswordInputProps} from './types';


export default function PasswordInput({ text, placeholder, keyboardType, value, onChangeText, marginBottom = 20, error }: PasswordInputProps) {

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const temErro = Boolean(error);

  return (
    <View>
      <Text style={styles.inputLabel}>{text}</Text>

      <View style={[styles.inputContainer, { marginBottom: temErro ? 6 : marginBottom }]}>
        <TextInput
          style={[styles.input, temErro && styles.inputErro]}
          placeholder={placeholder}
          placeholderTextColor="#999"
          keyboardType={keyboardType}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!showPassword}
          accessibilityLabel={text}
        
        />

        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Image
            source={
              showPassword
                ? require("../../../assets/images/olhoAberto.png")
                : require("../../../assets/images/olhoFechado.png")
            }
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>

      {temErro && <Text style={styles.erroTexto}>{error}</Text>}
    </View>
  );
};
