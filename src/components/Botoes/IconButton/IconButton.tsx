/**
 * Botao reutilizavel: centraliza estilos e estados de interacao usados em varias telas.
 */
import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { styles } from "./styles";

interface Props {
    image : any,
    onPress?: () => void,
}

export const IconButton = ({ image,onPress }: Props) => {
    return (
        <TouchableOpacity
            onPress={onPress}
       
        >
            <Image 
               source={image}
               style={ styles.bntIcon}
            />
         </TouchableOpacity>
    )
}

