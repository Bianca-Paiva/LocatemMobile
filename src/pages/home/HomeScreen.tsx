import { ScrollView, StyleSheet, Text, View } from "react-native";

// importacao dos elementos de navegação
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../routes/AppRoutes";


// Components ↓
import Header from "../../components/Header";
import Banner from "../../components/Banner";
import { styles } from "./styles";
import { ProductCard } from "../../components/ProductCard";

// Mock
import { PRODUTOS_MOCK } from "../../mocks/produtos.mock";
import { toProductCard } from "../../mocks/produtos.adapters";
import { useProdutoStore } from "../../hooks/useProdutoStore";

// Catálogo principal exibido na Home (ver faixas de id em produtos.mock.ts).
const PRODUTOS_HOME = PRODUTOS_MOCK.filter((produto) => produto.id <= 9);

export const HomeScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const { setProdutoSelecionado } = useProdutoStore();

    // Seleciona o produto COMPLETO no store (pelo `id` real do catálogo) antes
    // do ProductCard navegar pra tela de detalhes — é assim que a
    // ProductScreen sabe qual ferramenta exibir (ver ProductCard/index.tsx).
    const handleSelecionarProduto = (id: number) => {
        const produtoCompleto = PRODUTOS_MOCK.find((produto) => produto.id === id);
        if (produtoCompleto) {
            setProdutoSelecionado(produtoCompleto);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView>

                <Header />
                <Banner />

                <View style={styles.section}>
                    <Text style={styles.title}>Ofertas</Text>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.list}
                    >
                        {PRODUTOS_HOME.map((produto) => (
                            <ProductCard
                                key={produto.id}
                                product={toProductCard(produto)}
                                onPress={() => handleSelecionarProduto(produto.id)}
                            />
                        ))}
                    </ScrollView>
                </View>

                     <View style={styles.section}>
                    <Text style={styles.title}>Minhas Locações</Text>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.list}
                    >
                        {PRODUTOS_HOME.map((produto) => (
                            <ProductCard
                                key={produto.id}
                                product={toProductCard(produto)}
                                onPress={() => handleSelecionarProduto(produto.id)}
                            />
                        ))}
                    </ScrollView>
                </View>

            </ScrollView>

            
        </View>
    );
};

