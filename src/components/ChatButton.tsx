import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

interface Props {
    onPress?: () => void,
}

export const ChatButton = ({ onPress }: Props) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style= { styles.bnt }
        >
            <Image 
                source={require('../../assets/images/chat-Icon-png')}
                style={ styles.bntChat}

            />
         </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    bnt:{},

    bntChat:{},
})