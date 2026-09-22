import { StyleSheet, View , TouchableOpacity,Image, Text
 } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// ===========================
// Navegação
// ===========================
import {  Route, useNavigation, useRoute} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../routes/AppRoutes";


// ===========================
// Componentes
// ===========================
import { IconButton } from "../../Botoes/IconButton/IconButton";
import SearchInput from "../../Shared/Inputs/SearchInput/SearchInput";
import { styles } from "./styles";


//==============================
// Estilos e Types 
//==============================
import type { NavItem, ScreenName } from "../Header/types";
import { useCarrinhoStore } from "../../../hooks/Carrinho/useCarrinhoStore";
import { useAuth } from "../../../hooks/Auth/useAuth";

// Ajuste o caminho abaixo caso a logo esteja em outra pasta do projeto
const logoIcon = require("../../../../assets/images/LogoLocatem.png");


// ===========================
// Tipagem das Props
// ===========================
type SecondaryHeaderProps = {
    search: string;
    setSearch: (text: string) => void;
    buscarProduto: () => void;
     cartCount?: number;
};

export default function SecondaryHeader({
    cartCount , 
    search,
    setSearch,
    buscarProduto,
}: SecondaryHeaderProps) {

    // ===========================
    // ===========================
    // Hooks de Navegação
    // ===========================
    const navigation =
        useNavigation<StackNavigationProp<RootStackParamList>>();
    const route = useRoute();

    // Se `cartCount` não for informado por prop, usa a quantidade real de
    // itens do CarrinhoContext (mesma fonte usada pela tela de Carrinho).
    const { itens: itensCarrinho } = useCarrinhoStore();
    const quantidadeCarrinho = cartCount ?? itensCarrinho.length;

        
    function handleNavigate(targetRoute?: ScreenName) {
             if (targetRoute) {
                 navigation.navigate(targetRoute as never);
             }
           
     }   

    // ===========================
    // Renderização
    // ===========================
    return (
        <View>

            <LinearGradient
                colors={["#FFD600", "#F2CB00", "#FFF6C7", "#ffffff"]}
                locations={[0, 0.3, 0.75, 1]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.headerContainer}
            >
                <View style={styles.linhaTopo}>
                <View style={styles.topoEsquerdo}>
                    {/* Botão para voltar */}
                    <TouchableOpacity
                            style={styles.BackBtn}
                            onPress={() => navigation.goBack()}
                            accessibilityLabel="Voltar tela"
                        >
                            <MaterialCommunityIcons name="arrow-left" size={26} color="#0A0A0A" />
                    </TouchableOpacity>
                    <TouchableOpacity
                            style={styles.logo}
                            onPress={() => handleNavigate("HomeScreen" as ScreenName)}>

                            <Image source={logoIcon} style={styles.logoImg} />
                            <Text style={styles.logoTexto}>LOCATEM</Text>

                    </TouchableOpacity>
                    </View>
                <TouchableOpacity
                        style={styles.carrinhoBtn}
                        onPress={() => handleNavigate("CarrinhoScreen" as ScreenName)}
                        accessibilityLabel="Abrir carrinho"
                    >
                        <MaterialCommunityIcons
                            name="cart-outline"
                            size={24}
                            color="#0A0A0A"
                        />
                        {quantidadeCarrinho > 0 && (
                            <View style={styles.quantidadeCarrinho}>
                                <Text style={styles.quantidadeCarrinhoTexto}>
                                    {quantidadeCarrinho}
                                </Text>
                            </View>
                        )}
                 </TouchableOpacity>
                </View>
                <View>

                    {/* Campo de pesquisa */}
                    <SearchInput
                        style={styles.searchContainer}
                        placeholder="Pesquisar"
                        keyboardType="default"
                        value={search}
                        onChangeText={setSearch}
                        onSubmitEditing={buscarProduto}
                    />

                    {/* Botão do chat */}
                    {/* <IconButton
                        image={require("../../../assets/images/chat-Icon.png")}
                        onPress={() => navigation.navigate("HomeScreen")}
                    /> */}
                    
                 </View>

            </LinearGradient>

        </View>
    );
}

