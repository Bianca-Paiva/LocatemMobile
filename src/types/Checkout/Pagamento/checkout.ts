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

// 'metodoPagamento' e 'pagamento' cobrem as telas do fluxo de pagamento
// (mesmas variantes usadas no ResumoPedido da Web).
export type ResumoPedidoVariant = 'vazio' | 'carrinho' | 'metodoPagamento' | 'pagamento';

// Prazo de validade do código Pix, exibido no Resumo do Pedido.
export interface PrazoPagamento {
  texto: string; // ex: "17 de abril de 2026, 15:41"
  expirado?: boolean;
}
