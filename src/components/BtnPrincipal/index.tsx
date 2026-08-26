import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { BtnPrincipalProps } from "./types";
import  styles  from "./styles";


export default function BtnPrincipal({ title, variant = 'primary', onPress }: BtnPrincipalProps) {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                variant === 'primary' ? styles.primaryBackground : styles.secondaryBackground
            ]}
            onPress={onPress}
        >
            <Text style={[styles.buttonText,
                variant === 'primary' ? styles.primaryText : styles.secondaryText
            ]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}