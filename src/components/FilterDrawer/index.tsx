import React, { useState } from "react";
import {
  Modal, Pressable,ScrollView, Text, TextInput, TouchableOpacity, View,} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { Filters, FilterDrawerProps, TagProps,} from "./types";


// Categorias
const categories = [
  "Ferramentas Elétricas",
  "Ferramentas Manuais",
  "Equipamentos de Jardinagem",
  "Máquinas Pesadas",
];
// Marcas
const brands = [
  "Bosch",
  "Makita",
  "DeWalt",
  "Black & Decker",
];

// Faixa de preço
const prices = [
  "R$0 - R$50",
  "R$50 - R$100",
  "R$100 - R$200",
  "R$200+",
];
const payment = [
  "Cartão de Crédito",
  "Boleto Bancário",
  "Pix",
  "Transferência Bancária",
];

const disponibility = [
  "Em Estoque",
  "Sob Encomenda",
  "Disponível para Retirada",
];

const reviews = [
  "1 estrela",
  "2 estrelas",
  "3 estrelas",
  "4 estrelas",
  "5 estrelas",
];

export default function FilterDrawer({
  onApply,
}: FilterDrawerProps) {

  // Controla se o drawer está aberto
  const [visible, setVisible] = useState(false);

  // Texto digitado na pesquisa de marcas
  const [brandSearch, setBrandSearch] = useState("");

  // Estado contendo todos os filtros selecionados
  const [filters, setFilters] = useState<Filters>({
    category: [], brands: [], prices: [], payment: [], disponibility: [], reviews: [],
  });

  // Adiciona ou remove uma opção selecionada
  function toggleItem(
    section: keyof Filters,
    value: string
  ) {

    setFilters((prev) => {
    // Verifica se o item já está selecionado
      const exists = prev[section].includes(value);

      return {
        ...prev,

        // Se já existe, remove. Se não existe, adiciona.
        [section]: exists
          ? prev[section].filter(
              (item) => item !== value
            )
          : [...prev[section], value],

      };

    });
  }

  // Envia os filtros para a tela pai
  function applyFilters() {

    onApply(filters);// envia filtros selecionados

    setVisible(false);// fecha drawer

  }

  // Limpa todos os filtros
  function clearFilters() {

    setFilters({
      category: [],
      brands: [],
      prices: [],
      payment: [],
      disponibility: [],
      reviews: [],
    });

    setBrandSearch("");

  }

  return (
    <>
          {/* Botão que abre o drawer */}
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setVisible(true)}
      >
        <Ionicons
          name="options-outline"
          size={22}
          color="#222"
        />

        <Text style={styles.filterText}>
          Filtros
        </Text>
      </TouchableOpacity>

      {/* Drawer */}
      <Modal
        transparent
        animationType="slide"
        visible={visible}
        statusBarTranslucent
        >
        {/* overlay */}
        <Pressable
            style={styles.overlay}
            onPress={() => setVisible(false)}
        />

        {/* bottom sheet */}
        <View style={styles.drawerContainer}>
            
            {/* handle visual  */}
            <View style={styles.handle} />

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Título */}
              <Text style={styles.title}>
                Filtros
              </Text>

              {/* ================= Categoria ================= */}

              <Text style={styles.section}>
                Categoria
              </Text>

              <View style={styles.tags}>

                {categories.map((category) => (

                  <Tag
                    key={category}
                    text={category}
                    selected={filters.category.includes(category)}
                    onPress={() =>
                      toggleItem("category", category)
                    }
                  />

                ))}

              </View>

              {/* ================= Marca ================= */}

              <Text style={styles.section}>
                Marca
              </Text>

              <TextInput
                placeholder="Pesquisar marca..."
                value={brandSearch}
                onChangeText={setBrandSearch}
                style={styles.input}
              />

              <View style={styles.tags}>

                {brands
                  .filter((brand) =>
                    brand
                      .toLowerCase()
                      .includes(
                        brandSearch.toLowerCase()
                      )
                  )
                  .map((brand) => (

                    <Tag
                      key={brand}
                      text={brand}
                      selected={filters.brands.includes(brand)}
                      onPress={() =>
                        toggleItem("brands", brand)
                      }
                    />

                  ))}

              </View>

              {/* ================= Preço ================= */}

              <Text style={styles.section}>
                Faixa de preço
              </Text>

              <View style={styles.tags}>

                {prices.map((price) => (

                  <Tag
                    key={price}
                    text={price}
                    selected={filters.prices.includes(price)}
                    onPress={() =>
                      toggleItem("prices", price)
                    }
                  />

                ))}

              </View>
              {/* ================= Pagamento ================= */}

              <Text style={styles.section}>
                Forma de pagamento
              </Text>
              <View style={styles.tags}>

                {payment.map((pay) => (
                  <Tag
                    key={pay}
                    text={pay}
                    selected={filters.payment.includes(pay)}
                    onPress={() =>
                      toggleItem("payment", pay)
                    }
                  />
                ))}
              </View>
              {/* ================= Disponibilidade ================= */}

              <Text style={styles.section}>
                Disponibilidade
              </Text>
              <View style={styles.tags}>
                {disponibility.map((disp) => (
                  <Tag
                    key={disp}
                    text={disp}
                    selected={filters.disponibility.includes(disp)}
                    onPress={() =>
                      toggleItem("disponibility", disp)
                    }
                  />
                ))}
              </View>
              {/* ================= Avaliações ================= */}
              <Text style={styles.section}>
                Avaliações
              </Text>
              <View style={styles.tags}>
                {reviews.map((review) => (
                  <Tag
                    key={review}
                    text={review}
                    selected={filters.reviews.includes(review)}
                    onPress={() =>
                      toggleItem("reviews", review)
                    }
                  />
                ))}
              </View>

              {/* ================= Botões ================= */}

              <TouchableOpacity
                style={styles.applyButton}
                onPress={applyFilters}
              >

                <Text style={styles.applyText}>
                  Filtrar
                </Text>

              </TouchableOpacity>

              <TouchableOpacity
                style={styles.clearButton}
                onPress={clearFilters}
              >

                <Text style={styles.clearText}>
                  Limpar filtros
                </Text>

              </TouchableOpacity>

            </ScrollView>
        </View>
      </Modal>

    </>
  );

}
// Componente de tag reutilizável
function Tag({ text, selected,onPress,}: TagProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.tag,
        selected && styles.selectedTag,
      ]}
    >
      <Text
        style={[
          styles.tagText,
          selected && styles.selectedTagText,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}