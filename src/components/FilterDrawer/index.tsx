import React, { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { FilterDrawerProps, FilterState, TagProps } from "./types";
import { extrairNomeSubcategoria } from "../../utils/categorias";
import { OPCOES_FONTE_ALIMENTACAO } from "../../pages/CadastroFerramenta/types";

// Faixa de preço
const prices = ["R$0 - R$50", "R$51 - R$100", "R$101 - R$200", "R$201+"];

const payment = ["Cartão de Crédito", "Cartão de Débito", "Pix"];

const availabilityOptions = [
  "Disponível para Aluguel",
  "Indisponível para Aluguel",
];

const ratingOptions = [
  { label: "4 estrelas ou mais", value: 4 },
  { label: "3 estrelas ou mais", value: 3 },
  { label: "2 estrelas ou mais", value: 2 },
  { label: "1 estrela ou mais", value: 1 },
];

const FILTROS_VAZIOS: FilterState = {
  categories: [],
  brands: [],
  brandSearch: "",
  voltagens: [],
  priceRanges: [],
  paymentMethods: [],
  availability: null,
  minRating: null,
};

export default function FilterDrawer({
  categorias,
  marcas,
  filtrosAtuais,
  onApply,
}: FilterDrawerProps) {

  // Controla se o drawer está aberto
  const [visible, setVisible] = useState(false);

  // Categoria de topo atualmente "aberta" no filtro (exibindo suas subcategorias).
  // null = exibindo a lista de categorias principais.
  const [categoriaExpandida, setCategoriaExpandida] = useState<string | null>(null);

  // Estado local do drawer — inicializado com os filtros já aplicados na
  // tela, pra reabrir sempre mostrando a seleção anterior.
  const [filters, setFilters] = useState<FilterState>(filtrosAtuais);

  // Reabre o drawer sempre sincronizado com o que já está aplicado na tela.
  const abrirDrawer = () => {
    setFilters(filtrosAtuais);
    setCategoriaExpandida(null);
    setVisible(true);
  };

  function toggleItem(section: "categories" | "brands" | "voltagens" | "priceRanges" | "paymentMethods", value: string) {
    setFilters((prev) => {
      const exists = prev[section].includes(value);

      return {
        ...prev,
        [section]: exists
          ? prev[section].filter((item) => item !== value)
          : [...prev[section], value],
      };
    });
  }

  function applyFilters() {
    onApply(filters);
    setVisible(false);
  }

  function clearFilters() {
    setFilters(FILTROS_VAZIOS);
    setCategoriaExpandida(null);
    onApply(FILTROS_VAZIOS);
    setVisible(false);
  }

  const subcategoriasDaCategoriaExpandida =
    categorias.find((c) => c.categoria === categoriaExpandida)?.subcategorias ?? [];

  return (
    <>
      {/* Botão que abre o drawer */}
      <TouchableOpacity style={styles.filterButton} onPress={abrirDrawer}>
        <Ionicons name="options-outline" size={22} color="#222" />
        <Text style={styles.filterText}>Filtros</Text>
      </TouchableOpacity>

      {/* Drawer */}
      <Modal transparent animationType="slide" visible={visible} statusBarTranslucent>
        {/* overlay */}
        <Pressable style={styles.overlay} onPress={() => setVisible(false)} />

        {/* bottom sheet */}
        <View style={styles.drawerContainer}>
          {/* handle visual  */}
          <View style={styles.handle} />

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Título */}
            <Text style={styles.title}>Filtros</Text>

            {/* ================= Categoria ================= */}

            <Text style={styles.section}>Categoria</Text>

            {categoriaExpandida ? (
              <>
                {/* Indica qual categoria está selecionada e permite voltar ao
                    nível anterior, em vez de misturar categorias e subcategorias
                    na mesma lista. */}
                <TouchableOpacity
                  style={styles.categoriaVoltarBtn}
                  onPress={() => setCategoriaExpandida(null)}
                >
                  <Ionicons name="chevron-back" size={16} color="#222" />
                  <Text style={styles.categoriaVoltarTexto}>{categoriaExpandida}</Text>
                </TouchableOpacity>

                <View style={styles.tags}>
                  {subcategoriasDaCategoriaExpandida.map((subcategoria) => (
                    <Tag
                      key={subcategoria}
                      text={extrairNomeSubcategoria(subcategoria)}
                      selected={filters.categories.includes(subcategoria)}
                      onPress={() => toggleItem("categories", subcategoria)}
                    />
                  ))}
                </View>
              </>
            ) : (
              <View style={styles.tags}>
                {categorias.map(({ categoria, subcategorias }) => (
                  <Tag
                    key={categoria}
                    text={categoria}
                    selected={filters.categories.includes(categoria)}
                    onPress={() => {
                      // Categorias com subcategorias abrem o próximo nível em
                      // vez de serem aplicadas diretamente como filtro.
                      if (subcategorias.length > 0) {
                        setCategoriaExpandida(categoria);
                      } else {
                        toggleItem("categories", categoria);
                      }
                    }}
                  />
                ))}
              </View>
            )}

            {/* ================= Marca ================= */}

            <Text style={styles.section}>Marca</Text>

            <TextInput
              placeholder="Pesquisar marca..."
              value={filters.brandSearch}
              onChangeText={(texto) => setFilters((prev) => ({ ...prev, brandSearch: texto }))}
              style={styles.input}
            />

            <View style={styles.tags}>
              {marcas
                .filter((marca) => marca.toLowerCase().includes(filters.brandSearch.toLowerCase()))
                .map((marca) => (
                  <Tag
                    key={marca}
                    text={marca}
                    selected={filters.brands.includes(marca)}
                    onPress={() => toggleItem("brands", marca)}
                  />
                ))}
            </View>

            {/* ================= Voltagem ================= */}

            <Text style={styles.section}>Voltagem</Text>

            <View style={styles.tags}>
              {OPCOES_FONTE_ALIMENTACAO.map((voltagem) => (
                <Tag
                  key={voltagem}
                  text={voltagem}
                  selected={filters.voltagens.includes(voltagem)}
                  onPress={() => toggleItem("voltagens", voltagem)}
                />
              ))}
            </View>

            {/* ================= Preço ================= */}

            <Text style={styles.section}>Faixa de preço</Text>

            <View style={styles.tags}>
              {prices.map((price) => (
                <Tag
                  key={price}
                  text={price}
                  selected={filters.priceRanges.includes(price)}
                  onPress={() => toggleItem("priceRanges", price)}
                />
              ))}
            </View>

            {/* ================= Pagamento ================= */}

            <Text style={styles.section}>Forma de pagamento</Text>

            <View style={styles.tags}>
              {payment.map((pay) => (
                <Tag
                  key={pay}
                  text={pay}
                  selected={filters.paymentMethods.includes(pay)}
                  onPress={() => toggleItem("paymentMethods", pay)}
                />
              ))}
            </View>

            {/* ================= Disponibilidade ================= */}

            <Text style={styles.section}>Disponibilidade</Text>

            <View style={styles.tags}>
              {availabilityOptions.map((status) => (
                <Tag
                  key={status}
                  text={status}
                  selected={filters.availability === status}
                  onPress={() =>
                    setFilters((prev) => ({
                      ...prev,
                      availability: prev.availability === status ? null : status,
                    }))
                  }
                />
              ))}
            </View>

            {/* ================= Avaliação ================= */}

            <Text style={styles.section}>Avaliação</Text>

            <View style={styles.tags}>
              {ratingOptions.map((item) => (
                <Tag
                  key={item.value}
                  text={item.label}
                  selected={filters.minRating === item.value}
                  onPress={() =>
                    setFilters((prev) => ({
                      ...prev,
                      minRating: prev.minRating === item.value ? null : item.value,
                    }))
                  }
                />
              ))}
            </View>

            {/* ================= Botões ================= */}

            <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
              <Text style={styles.applyText}>Filtrar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
              <Text style={styles.clearText}>Limpar filtros</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </>
  );
}

// Componente de tag reutilizável
function Tag({ text, selected, onPress }: TagProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.tag, selected && styles.selectedTag]}
    >
      <Text style={[styles.tagText, selected && styles.selectedTagText]}>{text}</Text>
    </TouchableOpacity>
  );
}
