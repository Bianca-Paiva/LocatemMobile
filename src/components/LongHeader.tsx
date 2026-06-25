import {useState} from 'react';
import { Image, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

// importacao dos elementos de navegação
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../routes/AppRoutes';

import { IconButton } from "./IconButton";
import SearchInput from "./SearchInput";

export default function LongHeader() {

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const [search, setSearch] = useState("")

    return (
        <View>
             <LinearGradient
            colors={["#FFD600", "#F2CB00", "#FFF6C7", "#ffffff"]}
            locations={[0, 0.3, 0.75, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.headerContainer}
        >
        <View style={styles.topo}>

             <SearchInput
                image={require('../../assets/images/lupa.png')}
                style={styles.searchContainer}
                placeholder="Pesquisar"
                keyboardType="default"
                value={search}
                onChangeText={setSearch}
             />  

             <IconButton
                 onPress={ () => {
                 navigation.navigate('HomeScreen')
                }} 
                image={require('../../assets/images/chat-Icon.png')}
             />

        </View>  
        </LinearGradient>
        </View>
       
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        width: "100%",
        height: 140, // altura do header
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        gap: 10,
      
    },

    logoImg: {
        width: 35,
        height: 35,
        resizeMode: "contain", // mantém proporção da imagem
    },

    logoTexto: {
        fontSize: 27,
        fontWeight: "800",
        color: "#000",
        letterSpacing: 1,
    },
    topo:{
       marginTop: 25, 
       flexDirection:"row",
       alignItems:"center",
       width:"100%",
       gap:10,
       
    },
    searchContainer:{
        flex:1,
    }
   
});