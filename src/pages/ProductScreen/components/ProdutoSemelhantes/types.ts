import type { ImageSourcePropType } from 'react-native';

export interface ProdutoSemelhante {
  id?: string | number;
  title: string;
  brand: string;
  price: string | number;
  // Produto.images vem de require(...) (ImageSourcePropType), não de URLs
  // string — aceitar os dois evita descolar esse tipo do catálogo real.
  images: (string | ImageSourcePropType)[];
  imageVerificado?: string | ImageSourcePropType;
  imageNota?: string | ImageSourcePropType;
  rating?: number;
  reviewCount?: number;
}

export interface ProdutosSemelhantesProps {
  produtos: ProdutoSemelhante[];
  onCardClick?: (produto: ProdutoSemelhante) => void;
}