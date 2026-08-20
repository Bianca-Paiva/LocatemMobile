export interface ProdutoSemelhante {
  id?: number;
  title: string;
  brand: string;
  price: string;
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