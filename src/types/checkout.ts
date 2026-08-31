import type { ImageSourcePropType } from 'react-native';

// Tipos compartilhados do fluxo de Carrinho (equivalente a src/types/checkout.ts do Web)

export interface CarrinhoItemData {
  id: string;
  title: string;
  image: ImageSourcePropType;
  dias: number;
  precoUnitario: number;
  quantidade: number;
  selecionado: boolean;
  estoqueDisponivel?: number;
}

export interface LojaGroupData {
  id: string;
  nomeLoja: string; // ex: "Produto de JB Ferramentas"
  verificado: boolean;
  itens: CarrinhoItemData[];
}

export type ResumoPedidoVariant = 'vazio' | 'carrinho';
