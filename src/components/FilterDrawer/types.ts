import type { FilterState } from '../../pages/Search/Searchtypes';

export type { FilterState };

// Props do componente FilterDrawer.
export interface FilterDrawerProps {
  /** Categorias/subcategorias derivadas do catálogo real, pra manter os filtros sempre em dia. */
  categorias: { categoria: string; subcategorias: string[] }[];
  /** Marcas derivadas do catálogo real. */
  marcas: string[];

  /** Filtros atualmente aplicados na tela — usados pra reabrir o drawer já com a seleção anterior. */
  filtrosAtuais: FilterState;

  /** Função chamada quando o usuário tocar em "Filtrar". */
  onApply: (filters: FilterState) => void;
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
