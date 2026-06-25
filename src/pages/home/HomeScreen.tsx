import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

// importacao dos elementos de navegação
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/AppRoutes';

// Components ↓
import LongHeader from "../../components/Header";

import BarNav from "../../components/BarNav"

export const HomeScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    return(
        <View style={styles.container}>
            <ScrollView>

                <LongHeader/>
              
                
            </ScrollView>
            <BarNav/>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#ffff",
    },
   
});