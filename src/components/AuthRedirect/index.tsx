import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthRedirectProps } from "./types";
import  styles  from "./styles";

export const AuthRedirect: React.FC<AuthRedirectProps> = ({ 
  text, 
  buttonText, 
  route, 
  textStyle, 
  buttonTextStyle 
}) => {    
  const navigation = useNavigation<any>();

  return (
    <View style={styles.footerContainer}>
      <Text style={[styles.footerText, textStyle]}>
        {text}
      </Text>

      <TouchableOpacity
        onPress={() => navigation.navigate(route)}
        activeOpacity={0.7} // Feedback visual sutil ao tocar
      >
        <Text style={[styles.registerText, buttonTextStyle]}>
          {buttonText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};