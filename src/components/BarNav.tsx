import {useState} from 'react';
import { StyleSheet, View} from "react-native";

// importacao dos elementos de navegação
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../routes/AppRoutes';
import { IconButton } from './IconButton';


export default function BarNav() {

        const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    return(
        <View style={styles.container}>
            <View style={styles.nav}>
                <IconButton
                      onPress={ () => {
                    navigation.navigate('HomeScreen')
                    }} 
                    image={require('../../assets/images/icons/home.png')}
                />
                     <IconButton
                      onPress={ () => {
                    navigation.navigate('Avaliacao')
                    }} 
                    image={require('../../assets/images/icons/car.png')}
                />
                     <IconButton
                      onPress={ () => {
                    navigation.navigate('HomeScreen')
                    }} 
                    image={require('../../assets/images/icons/agenda.png')}
                />
                     <IconButton
                      onPress={ () => {
                    navigation.navigate('HomeScreen')
                    }} 
                    image={require('../../assets/images/icons/notificacao.png')}
                />
                     <IconButton
                      onPress={ () => {
                    navigation.navigate('LoginScreen')
                    }} 
                    image={require('../../assets/images/icons/user.png')}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,

    height: 60,
    backgroundColor: '#fff',

    justifyContent: 'center',
    alignItems: 'center',

    // --- SOMBRA PARA ANDROID ---
    elevation: 20, // Cria o efeito de relevo no Android
  },

  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',

  },
});