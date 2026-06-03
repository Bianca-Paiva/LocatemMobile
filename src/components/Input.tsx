import { View, Text, TextInput, StyleSheet, KeyboardTypeOptions, } from "react-native";

interface InputProps {
  text: string;
  placeholder: string;
  keyboardType: KeyboardTypeOptions;
  value: string;
  onChangeText: (text: string) => void;
}

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

const styles = StyleSheet.create({
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#344054",
    marginBottom: 6,
  },

  input: {
    height: 55,
    borderColor: "#d0d5dd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#1a1c1e",
    backgroundColor: "#f9fafb",
    marginBottom: 20,
  },
});
