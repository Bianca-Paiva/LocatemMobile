import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

// importacao dos elementos de navegação
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/AppRoutes';

// Components ↓
import Input from '../../components/Input';
import Header from "../../components/Header";

export const HomeScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    return(
        <View style={styles.container}>
            <ScrollView>
                <Header></Header>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{},

});