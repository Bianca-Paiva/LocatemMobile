import React, {useState} from "react";
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";

// importacao dos elementos de navegação
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from "../../routes/AppRoutes";


export default function ReceiveTokenScreen() {
    return(
        <View>
            <Text>ReceiveToken</Text>
        </View>
    );
}