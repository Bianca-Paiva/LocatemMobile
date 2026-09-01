import { useState, useEffect } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  View,
  Text
} from "react-native";

// ===========================
// Navegação
// ===========================
import {
  useNavigation,
  useRoute,
  RouteProp,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../routes/AppRoutes";

// ===========================
// Componentes
// ===========================
import SecondaryHeader from "../../components/SecondaryHeader";
import SortFilter from "../../components/SortFilter";
import FilterDrawer from "../../components/FilterDrawer";
import { Filters } from "../../components/FilterDrawer/types";
import { ProductCard } from "../../components/ProductCard";

// ===========================
// Dados Mockados e Serviço de Busca
// ===========================
import { PRODUTOS_MOCK } from "../../mocks/produtos.mock";
import { toProductCard } from "../../mocks/produtos.adapters";
import { useProdutoStore } from "../../hooks/useProdutoStore";
import { buscarProdutos } from "./useSearch";

// ===========================
// Tipagem da rota SearchScreen
// ===========================
type SearchScreenRouteProp = RouteProp<
  RootStackParamList,
  "SearchScreen"
>;

export const SearchScreen = () => {

  // ===========================
  // Hooks de Navegação
  // ===========================
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList>>();

  const { setProdutoSelecionado } = useProdutoStore();

  // Seleciona o produto COMPLETO no store (pelo `id` real do catálogo) antes
  // do ProductCard navegar pra tela de detalhes — mesmo padrão da Home
  // (ver HomeScreen.tsx e ProductCard/index.tsx).
  const handleSelecionarProduto = (id: string) => {
    const produtoCompleto = PRODUTOS_MOCK.find((produto) => String(produto.id) === id);
    if (produtoCompleto) {
      setProdutoSelecionado(produtoCompleto);
    }
  };

  // Recebe os parâmetros enviados pela Home
  const route = useRoute<SearchScreenRouteProp>();

  // Texto pesquisado vindo da tela anterior
  const pesquisaInicial = route.params?.search ?? "";

  // ===========================
  // Estados da Tela
  // ===========================

  // Texto digitado na barra de pesquisa
  const [search, setSearch] = useState(pesquisaInicial);

  // Ordenação dos produtos
  const [sort, setSort] = useState("Mais relevantes");

  // Filtros selecionados pelo usuário
  const [filters, setFilters] = useState<Filters>({
    category: [],
    brands: [],
    prices: [],
    payment: [],
    disponibility: [],
    reviews: [],
  });

  // Estado de carregamento
  const [loading, setLoading] = useState(false);


  // Lista de produtos exibidos — parte do catálogo real (PRODUTOS_MOCK),
  // não mais do mock desconectado de DadosMock.
  const [products, setProducts] = useState(() => PRODUTOS_MOCK.map(toProductCard));

    
  const [mensagem, setMensagem] = useState("");
  // ===========================
  // Função de Busca
  // ===========================
 const buscarProduto = async () => {

  // Verifica se foi digitado algum texto
  if (!search.trim()) {
    setProducts([]);
    setMensagem("Digite um produto para pesquisar.");
    return;
  }

  try {

    // Inicia o loading
    setLoading(true);

    // Mensagem temporária
    setMensagem("Buscando produtos...");

    // Busca os produtos
    const resultado = await buscarProdutos(search);

    // Atualiza a lista
    setProducts(resultado);

    // Atualiza a mensagem
    if (resultado.length === 0) {
      setMensagem("Nenhum produto encontrado.");
    } else if (resultado.length === 1) {
      setMensagem("1 produto encontrado.");
    } else {
      setMensagem(`${resultado.length} produtos encontrados.`);
    }

  } catch {

    setMensagem("Erro ao buscar produtos.");

  } finally {

    setLoading(false);

  }

};

  // ===========================
  // Busca automática ao abrir a tela
  // ===========================
  useEffect(() => {

    // Se a pesquisa vier da Home,
    // executa a busca automaticamente
    if (pesquisaInicial.trim()) {
      buscarProduto();
    }

  }, []);
  
  // ===========================
  // Renderização da Tela
  // ===========================
  return (
    <View style={styles.container}>

      <ScrollView>

        {/* Cabeçalho da tela de busca */}
        <SecondaryHeader
          search={search}
          setSearch={setSearch}
          buscarProduto={buscarProduto}
        />

        {/* Barra de ordenação e filtros */}
        <View style={styles.barraFiltros}>
    
          <SortFilter
            value={sort}
            onSelect={setSort}
          />

          <FilterDrawer
            onApply={setFilters}
          />

        </View>

            {/* Mensagem */}
        {mensagem !== "" && (
            <View style={styles.resultadoContainer}>
                <Text style={styles.resultadoText}>
                    {mensagem}
                </Text>
            </View>
        )}

        {/* Lista */}
        <View style={styles.gridContainer}>
            {loading && <ActivityIndicator size="large" />}

            {!loading &&
                products.map((item) => (
                    <ProductCard
                        key={item.id}
                        product={item}
                        onPress={() => handleSelecionarProduto(item.id)}
                    />
                ))}
        </View>

      </ScrollView>


    </View>
  );
};

// ===========================
// Estilos
// ===========================
const styles = StyleSheet.create({

  // Container principal
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  // Barra de filtros
  barraFiltros: {
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  // Grid de produtos
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginTop: 10,
  },
resultadoContainer: {
    marginHorizontal: 25,
    marginTop: 12,
    marginBottom: 10,
    
},

resultadoText: {
    fontSize: 16,
    fontWeight: "500",
},


});