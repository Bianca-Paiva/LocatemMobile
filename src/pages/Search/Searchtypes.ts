import type { ImageSourcePropType } from 'react-native';

/**
 * Tipos da tela de Busca (Search).
 * Espelham `Busca.types.ts` do LOCATEM-WEB-REACT, adaptados aos tipos de
 * imagem do React Native (`ImageSourcePropType` em vez de `string`).
 */

export interface ProdutoBusca {
  id: number;
  title: string;
  marca: string;
  categoria: string;
  price: string;
  images: ImageSourcePropType[];
  imageVerificado: ImageSourcePropType;
  imageNota: ImageSourcePropType;
  rating: number;
  reviewCount: number;
  paymentMethods: string[];
  available: boolean;
  locador: string;
  localizacao: string;
  estoqueDisponivel: number;
  /** Voltagem/fonte de alimentação, ex: "220V", "127V", "Bivolt", "Bateria", "Manual". */
  voltagem?: string;
}

export interface FilterState {
  categories: string[];
  brands: string[];
  brandSearch: string;
  voltagens: string[];
  priceRanges: string[];
  paymentMethods: string[];
  availability: string | null;
  minRating: number | null;
}

export const FILTROS_VAZIOS: FilterState = {
  categories: [],
  brands: [],
  brandSearch: '',
  voltagens: [],
  priceRanges: [],
  paymentMethods: [],
  availability: null,
  minRating: null,
};
