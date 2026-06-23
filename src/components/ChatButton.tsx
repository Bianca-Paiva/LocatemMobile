import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

interface Props {
    image : any,
    onPress?: () => void,
}

export const ChatButton = ({ image,onPress }: Props) => {
    return (
        <TouchableOpacity
            onPress={onPress}
       
        >
            <Image 
               source={image}
               style={ styles.bntChat}
            />
         </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
   
    bntChat:{
        width: 25,
        height: 25,
    },
})