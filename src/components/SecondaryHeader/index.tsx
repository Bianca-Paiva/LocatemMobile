import { StyleSheet, View } from "react-native";
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
// Tipagem das Props
// ===========================
type SecondaryHeaderProps = {
    search: string;
    setSearch: (text: string) => void;
    buscarProduto: () => void;
};

export default function SecondaryHeader({
    search,
    setSearch,
    buscarProduto,
}: SecondaryHeaderProps) {

    // ===========================
    // Hook de Navegação
    // ===========================
    const navigation =
        useNavigation<StackNavigationProp<RootStackParamList>>();

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

                    {/* Botão para voltar */}
                    <IconButton
                        image={require("../../../assets/images/icons/seta.png")}
                        onPress={() => navigation.goBack()}
                    />

                    {/* Campo de pesquisa */}
                    <SearchInput
                        image={require("../../../assets/images/icons/lupa.png")}
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

// ===========================
// Estilos
// ===========================
const styles = StyleSheet.create({

    // Container do cabeçalho
    headerContainer: {
        width: "100%",
        height: 140,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        gap: 10,
    },

    // Conteúdo do cabeçalho
    topo: {
        marginTop: 25,
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        gap: 10,
    },

    // Campo de pesquisa
    searchContainer: {
        flex: 1,
    },

});