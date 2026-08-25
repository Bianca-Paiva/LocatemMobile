export interface ProdutoSemelhante {
  id?: string |number;
  title: string;
  brand: string;
  price: string | number;
  images: string[];
  imageVerificado?: string;
  imageNota?: string;
  rating?: number;
  reviewCount?: number;
}

export interface ProdutosSemelhantesProps {
  produtos: ProdutoSemelhante[];
  onCardClick?: (produto: ProdutoSemelhante) => void;
}