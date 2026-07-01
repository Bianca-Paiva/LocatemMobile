import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

// importacao dos elementos de navegação
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/AppRoutes';

// Components ↓
import BarNav from "../../components/BarNav";
import SecondaryHeader from "../../components/SecondaryHeader";

export const SearchScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    

    return(
        <View style={styles.container}>
            <ScrollView>

                <SecondaryHeader/>

                
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