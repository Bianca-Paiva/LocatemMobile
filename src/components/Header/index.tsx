import { useState } from "react";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// ===========================
// Navegação
// ===========================
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../routes/AppRoutes";

// ===========================
// Componentes
// ===========================
import { IconButton } from "../IconButton";
import SearchInput from "../SearchInput";

// ===========================
// Estilos
// ===========================
import styles from "./styles";

export default function Header() {

    // ===========================
    // Hook de Navegação
    // ===========================
    const navigation =
        useNavigation<StackNavigationProp<RootStackParamList>>();

    // ===========================
    // Estados
    // ===========================

    // Texto digitado na barra de pesquisa
    const [search, setSearch] = useState("");

    // ===========================
    // Funções
    // ===========================

    // Navega para a tela de busca
    // enviando o texto pesquisado
    function pesquisar() {

        // Evita pesquisas vazias
        if (!search.trim()) return;

        navigation.navigate("SearchScreen", {
            search: search.trim(),
        });

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

                <View style={styles.topo}>

                    {/* Campo de pesquisa */}
                    <SearchInput
                        image={require("../../../assets/images/lupa.png")}
                        style={styles.searchContainer}
                        placeholder="Pesquisar"
                        keyboardType="default"
                        value={search}
                        onChangeText={setSearch}
                        onSubmitEditing={pesquisar}
                    />

                    {/* Botão do chat */}
                    <IconButton
                        image={require("../../../assets/images/chat-Icon.png")}
                        onPress={() => navigation.navigate("HomeScreen")}
                    />

                </View>

            </LinearGradient>

        </View>
    );
}