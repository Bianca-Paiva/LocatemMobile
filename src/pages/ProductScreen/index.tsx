import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { Controller } from "react-hook-form"; 

// Importação dos elementos de navegação
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/AppRoutes';

// mocks
import { mockProductData } from "../../mocks/productMock";


// Componentes
import Header from "../../components/Header";
import { ImagemCarrossel } from "./components/ImageCarrosel";

export default function ProductScreen(){

    const imagensDoProduto = mockProductData.productImages;

    return(

        <ScrollView>
            <View>
                <Header />
                <ImagemCarrossel images={imagensDoProduto} />
            </View>
        </ScrollView>   
    )
} 