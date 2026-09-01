import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../theme/colors";
import styles from "./styles";

interface PaginacaoProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Paginacao({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: PaginacaoProps) {
  // Arredonda para cima. Ex: 25 itens / 10 por página = 3 páginas.
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Se não houver itens ou tiver apenas 1 página, não renderiza a paginação.
  if (totalPages <= 1) return null;

  const podeVoltar = currentPage > 1;
  const podeAvancar = currentPage < totalPages;

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={[styles.navBtn, !podeVoltar && styles.navBtnDisabled]}
        onPress={() => podeVoltar && onPageChange(currentPage - 1)}
        disabled={!podeVoltar}
      >
        <Ionicons name="chevron-back" size={16} color={colors.textDark} />
      </TouchableOpacity>

      <Text style={styles.pageInfo}>
        Página {currentPage} de {totalPages}
      </Text>

      <TouchableOpacity
        style={[styles.navBtn, !podeAvancar && styles.navBtnDisabled]}
        onPress={() => podeAvancar && onPageChange(currentPage + 1)}
        disabled={!podeAvancar}
      >
        <Ionicons name="chevron-forward" size={16} color={colors.textDark} />
      </TouchableOpacity>
    </View>
  );
}
