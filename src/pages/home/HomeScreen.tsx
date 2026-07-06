import { ScrollView, StyleSheet, Text, View } from "react-native";

// importacao dos elementos de navegação
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../routes/AppRoutes";

// Components ↓
import Header from "../../components/Header";
import Banner from "../../components/Banner";
import BarNav from "../../components/BarNav";
import { ProductCard } from "../../components/ProductCard";

// Mock
import { mockProducts } from "./useHome";

export const HomeScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

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
                        {mockProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
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
                        {mockProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </ScrollView>
                </View>

            </ScrollView>

            <BarNav />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",

        
    },

    section: {
        marginTop: 15,
    },

    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginLeft: 15,
        marginBottom: 10,
    },

    list: {
        paddingHorizontal: 15,
        gap: 5,
    },
});