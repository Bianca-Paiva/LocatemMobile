import { useEffect, useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { styles } from "./styles";
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
import Paginacao from "../../components/Paginacao";
import { ProductCard } from "../../components/ProductCard";

// ===========================
// Catálogo real, tipos e adapters
// (mesma fonte usada pela Home e pelo restante do app — nada de mock isolado)
// ===========================
import { useCatalogoStore } from "../../hooks/useCatalogoStore";
import { useProdutoStore } from "../../hooks/useProdutoStore";
import { toProdutoBusca, toLegacyProduct } from "../../mocks/produtos.adapters";
import { derivarCategorias, derivarMarcas } from "../../utils/categorias";
import type { ProdutoBusca, FilterState } from "./Searchtypes";
import { FILTROS_VAZIOS } from "./Searchtypes";

// ===========================
// Tipagem da rota SearchScreen
// ===========================
type SearchScreenRouteProp = RouteProp<RootStackParamList, "SearchScreen">;

const ITEMS_PER_PAGE = 10;

export const SearchScreen = () => {

  // ===========================
  // Hooks de Navegação
  // ===========================
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // Recebe os parâmetros enviados por quem chamou a busca (Header, Home, etc.)
  const route = useRoute<SearchScreenRouteProp>();
  const pesquisaInicial = route.params?.search ?? "";

  // ===========================
  // Catálogo real
  // ===========================
  const { produtos } = useCatalogoStore();
  const { setProdutoSelecionado } = useProdutoStore();

  // Catálogo de busca: todo o catálogo real (mesma fonte usada pela Home),
  // não um recorte fixo — assim a busca nunca fica dessincronizada do que
  // realmente existe cadastrado.
  const produtosBusca = useMemo(() => produtos.map(toProdutoBusca), [produtos]);

  // Categorias/subcategorias e marcas derivadas do catálogo real, pra manter
  // os filtros sempre em dia com as ferramentas cadastradas.
  const categorias = useMemo(() => derivarCategorias(produtos), [produtos]);
  const marcas = useMemo(() => derivarMarcas(produtos), [produtos]);

  // ===========================
  // Estados da Tela
  // ===========================

  // Texto pesquisado (a barra de pesquisa do cabeçalho funciona em qualquer momento).
  const [search, setSearch] = useState(pesquisaInicial);

  // Sempre que a tela receber um novo termo de pesquisa vindo de outra tela
  // (ex: usuário pesquisou de novo a partir da Home), atualiza o texto local.
  useEffect(() => {
    if (route.params?.search !== undefined) {
      setSearch(route.params.search);
    }
  }, [route.params?.search]);

  // Ordenação dos produtos
  const [sort, setSort] = useState("Mais relevantes");

  // Filtros selecionados pelo usuário
  const [filters, setFilters] = useState<FilterState>(FILTROS_VAZIOS);

  // Página atual da listagem
  const [currentPage, setCurrentPage] = useState(1);

  // Sempre que o termo pesquisado, a ordenação ou os filtros mudarem, volta
  // pra primeira página pra não deixar a paginação "presa" fora do range.
  useEffect(() => {
    setCurrentPage(1);
  }, [search, sort, filters]);

  // ===========================
  // Filtragem (mesma lógica usada na página de Busca do Web)
  // ===========================
  const filteredProducts = useMemo(() => {
    return produtosBusca.filter((product) => {
      const productPrice = parseFloat(product.price.replace(",", "."));

      if (filters.categories.length > 0 && !filters.categories.includes(product.categoria)) {
        return false;
      }
      if (filters.brands.length > 0 && !filters.brands.includes(product.marca)) {
        return false;
      }
      if (filters.brandSearch && !product.marca.toLowerCase().includes(filters.brandSearch.toLowerCase())) {
        return false;
      }
      if (filters.voltagens.length > 0) {
        if (!product.voltagem || !filters.voltagens.includes(product.voltagem)) return false;
      }
      if (filters.priceRanges.length > 0) {
        const matchRange = filters.priceRanges.some((range) => {
          if (range === "R$0 - R$50") return productPrice >= 0 && productPrice <= 50;
          if (range === "R$51 - R$100") return productPrice >= 51 && productPrice <= 100;
          if (range === "R$101 - R$200") return productPrice >= 101 && productPrice <= 200;
          if (range === "R$201+") return productPrice > 200;
          return false;
        });
        if (!matchRange) return false;
      }
      if (filters.paymentMethods.length > 0) {
        const matchPayment = product.paymentMethods.some((method) =>
          filters.paymentMethods.includes(method)
        );
        if (!matchPayment) return false;
      }
      if (filters.availability) {
        if (filters.availability === "Disponível para Aluguel" && !product.available) return false;
        if (filters.availability === "Indisponível para Aluguel" && product.available) return false;
      }
      if (filters.minRating !== null && product.rating < filters.minRating) return false;

      if (search.trim()) {
        const termo = search.trim().toLowerCase();
        const correspondeTermo =
          product.title.toLowerCase().includes(termo) ||
          product.marca.toLowerCase().includes(termo) ||
          product.categoria.toLowerCase().includes(termo);
        if (!correspondeTermo) return false;
      }

      return true;
    });
  }, [produtosBusca, filters, search]);

  // ===========================
  // Ordenação
  // ===========================
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      const priceA = parseFloat(a.price.replace(",", "."));
      const priceB = parseFloat(b.price.replace(",", "."));

      if (sort === "Menor preço") return priceA - priceB;
      if (sort === "Maior preço") return priceB - priceA;
      if (sort === "Melhores avaliações") return b.rating - a.rating;
      return 0;
    });
  }, [filteredProducts, sort]);

  // ===========================
  // Paginação
  // ===========================
  const totalItems = sortedProducts.length;
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentProducts = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

  // ===========================
  // Navegação para o produto
  // ===========================
  const handleCardPress = (produtoBusca: ProdutoBusca) => {
    // O card da Busca só carrega um recorte do produto (ProdutoBusca).
    // Buscamos o produto completo no catálogo central pra levar pra frente
    // os dados reais da ferramenta, assim como já é feito no ProductScreen.
    const produtoCompleto = produtos.find((p) => p.id === produtoBusca.id);
    if (!produtoCompleto) return;

    setProdutoSelecionado(produtoCompleto);
    navigation.navigate("ProductScreen");
  };

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
          buscarProduto={() => setCurrentPage(1)}
        />

        {/* Barra de ordenação e filtros */}
        <View style={styles.barraFiltros}>
          <SortFilter value={sort} onSelect={setSort} />

          <FilterDrawer
            categorias={categorias}
            marcas={marcas}
            filtrosAtuais={filters}
            onApply={setFilters}
          />
        </View>

        {/* Lista */}
        <View style={styles.gridContainer}>
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={toLegacyProduct(product)}
                onPress={() => handleCardPress(product)}
              />
            ))
          ) : (
            <View style={styles.resultadoContainer}>
              <Text style={styles.resultadoText}>
                Nenhum produto encontrado com os filtros selecionados.
              </Text>
            </View>
          )}
        </View>

        <Paginacao
          totalItems={totalItems}
          itemsPerPage={ITEMS_PER_PAGE}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />

      </ScrollView>
    </View>
  );
};

