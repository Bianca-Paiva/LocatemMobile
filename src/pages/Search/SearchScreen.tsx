import { useEffect, useMemo, useState } from "react";
import { ScrollView, View } from "react-native";
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
import SecondaryHeader from "../../components/Layout/SecondaryHeader";
import SortFilter from "../../components/Busca/SortFilter";
import FilterDrawer from "../../components/Busca/FilterDrawer";
import Paginacao from "../../components/Busca/Paginacao";
import { ProductCard } from "../../components/Ferramentas/ProductCard";
import EstadoVazioBusca from "../../components/Busca/EstadoVazioBusca";
import ProdutosRecomendados from "../../components/Busca/ProdutosRecomendados";

// ===========================
// Catálogo real, tipos e adapters
// (mesma fonte usada pela Home e pelo restante do app — nada de mock isolado)
// ===========================
import { useCatalogoStore } from "../../hooks/Ferramentas/useCatalogoStore";
import { useProdutoStore } from "../../hooks/Ferramentas/useProdutoStore";
import { toProdutoBusca, toLegacyProduct } from "../../mocks/produtos.adapters";
import { derivarCategorias, derivarMarcas } from "../../utils/Ferramentas/Catalogo/categorias";
import { filtrarProdutos } from "../../utils/Busca/filtrarProdutos";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
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
  // `search` muda a cada tecla digitada — o input precisa refletir isso
  // imediatamente pra não parecer travado. `debouncedSearch` só atualiza
  // 300ms depois que o usuário parar de digitar, e é esse valor que
  // realmente dispara a filtragem da lista (ver `filteredProducts` abaixo).
  // Isso evita refiltrar o catálogo inteiro a cada caractere digitado.
  const [search, setSearch] = useState(pesquisaInicial);
  const debouncedSearch = useDebouncedValue(search, 300);

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

  // Sempre que o termo pesquisado (já com debounce), a ordenação ou os
  // filtros mudarem, volta pra primeira página pra não deixar a paginação
  // "presa" fora do range.
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, sort, filters]);

  // ===========================
  // Filtragem (mesma lógica usada na página de Busca do Web)
  // Lógica extraída para `src/utils/Busca/filtrarProdutos.ts` — pura e
  // coberta por testes automatizados, ver roteiro/testes nesse arquivo.
  // Usa o termo com debounce (ver abaixo) em vez do valor "cru" do input,
  // pra não refiltrar a cada tecla digitada.
  // ===========================
  const filteredProducts = useMemo(
    () => filtrarProdutos(produtosBusca, filters, debouncedSearch),
    [produtosBusca, filters, debouncedSearch]
  );

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

  // Indica se algum filtro do FilterDrawer está ativo — usado pra decidir
  // a mensagem do estado vazio e se o botão "Limpar filtros" aparece.
  const temFiltrosAtivos = useMemo(
    () =>
      filters.categories.length > 0 ||
      filters.brands.length > 0 ||
      filters.brandSearch.trim().length > 0 ||
      filters.voltagens.length > 0 ||
      filters.priceRanges.length > 0 ||
      filters.paymentMethods.length > 0 ||
      filters.availability !== null ||
      filters.minRating !== null,
    [filters]
  );

  const limparBuscaEFiltros = () => {
    setSearch("");
    setFilters(FILTROS_VAZIOS);
  };

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
        {currentProducts.length > 0 ? (
          <>
            <View style={styles.gridContainer}>
              {currentProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={toLegacyProduct(product)}
                  onPress={() => handleCardPress(product)}
                />
              ))}
            </View>

            <Paginacao
              totalItems={totalItems}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </>
        ) : (
          <>
            <EstadoVazioBusca
              termoBusca={debouncedSearch.trim()}
              temFiltrosAtivos={temFiltrosAtivos}
              onLimpar={limparBuscaEFiltros}
            />

            {/* Recomendações a partir do catálogo completo (não filtrado),
                pra sempre ter algo relevante pra sugerir mesmo quando a
                busca/filtros não retornam nada. */}
            <ProdutosRecomendados
              produtos={produtosBusca}
              onSelect={handleCardPress}
            />
          </>
        )}

      </ScrollView>
    </View>
  );
};

