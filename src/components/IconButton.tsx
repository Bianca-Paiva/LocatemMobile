import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

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

const styles = StyleSheet.create({
   
    bntIcon:{
        width: 25,
        height: 25,
    },
})