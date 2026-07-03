// Representa todos os filtros selecionados pelo usuário.
export interface Filters {
  category: string[];
  brands: string[];
  prices: string[];
  payment: string[];
  disponibility: string[];
  reviews: string[];
}

// Props do componente FilterDrawer.
export interface FilterDrawerProps {

  // Função chamada quando o usuário clicar em "Filtrar".
  onApply: (filters: Filters) => void;
}

// Props do componente Tag.
export interface TagProps {

  // Texto exibido na tag.
  text: string;

  // Indica se a tag está selecionada.
  selected: boolean;

  // Função executada ao clicar na tag.
  onPress: () => void;
}