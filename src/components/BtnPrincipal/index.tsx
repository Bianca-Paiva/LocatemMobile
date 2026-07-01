import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { BtnPrincipalProps } from "./types";
import  styles  from "./styles";


export default function BtnPrincipal({ title, onPress }: BtnPrincipalProps) {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={onPress}
        >
            <Text style={styles.buttonText}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}