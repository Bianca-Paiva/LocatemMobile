import { createContext, useState } from 'react';
import type { ReactNode } from 'react';

import type {
  Cartao,
  CartaoPagamentoArmazenado,
  FormaPagamento,
} from '../types/cartao.types';

// ============================================================
//  PagamentoContext
//  Equivalente mobile de utils/Pagamento/pagamentoStorage.ts (Web).
//  Na Web esses dados ficam no localStorage (sobrevivem a reload de página).
//  No app mobile não existe localStorage e a navegação é uma pilha de telas,
//  então o mesmo papel é cumprido por um Context em memória — igual ao
//  padrão já usado em CarrinhoContext/ProdutoContext/ReservaContext.
// ============================================================

/** Item exibido em "Itens alugados" quando a locação não passa pelo carrinho
 * (equivalente ao fluxo "Locar Agora" da Web). O Mobile ainda não tem essa
 * tela, mas o campo já fica pronto para quando ela existir. */
export interface ItemPagamentoAvulso {
  id: string;
  nome: string;
  imagem: string;
  dias: number;
  unidades: number;
}

// Cartões salvos "de fábrica" — mesmos 4 cartões de exemplo usados na Web,
// só para a tela não ficar vazia enquanto não existe cadastro real vindo da API.
const CARTOES_PADRAO: Cartao[] = [
  { id: 1, metodoPagamento: 'credito', bandeira: 'Visa', final: '1234', titular: 'JOÃO SILVA' },
  { id: 2, metodoPagamento: 'credito', bandeira: 'Mastercard', final: '5678', titular: 'JOÃO SILVA' },
  { id: 3, metodoPagamento: 'debito', bandeira: 'Visa', final: '9012', titular: 'JOÃO SILVA' },
  { id: 4, metodoPagamento: 'debito', bandeira: 'Elo', final: '3456', titular: 'JOÃO SILVA' },
];

interface PagamentoContextType {
  /** Total da compra, definido pelo Carrinho ao continuar para o pagamento. */
  valor: number;
  setValorPagamento: (valor: number) => void;

  /** Forma de pagamento escolhida em "Método de Pagamento". */
  metodo: FormaPagamento | null;
  setMetodoPagamento: (metodo: FormaPagamento) => void;

  /** Dados não sensíveis do cartão usado no pagamento atual. */
  cartao: CartaoPagamentoArmazenado | null;
  setCartaoPagamento: (cartao: CartaoPagamentoArmazenado) => void;

  /** Marca que a etapa "Processando Pagamento" já concluiu a simulação atual. */
  processado: boolean;
  marcarPagamentoProcessado: () => void;

  /** Item avulso (fluxo fora do carrinho) — ver ItemPagamentoAvulso acima. */
  itemAvulso: ItemPagamentoAvulso | null;
  setItemPagamentoAvulso: (item: ItemPagamentoAvulso) => void;

  /** Carteira de cartões salvos do usuário (independente do fluxo de checkout em si). */
  cartoesSalvos: Cartao[];
  adicionarCartaoSalvo: (cartao: Cartao) => void;

  /** Limpa os dados do funil de pagamento após a confirmação, evitando que
   * reapareçam numa compra futura. */
  limparDadosPagamento: () => void;
}

export const PagamentoContext = createContext<PagamentoContextType | null>(null);

export function PagamentoProvider({ children }: { children: ReactNode }) {
  const [valor, setValor] = useState(0);
  const [metodo, setMetodo] = useState<FormaPagamento | null>(null);
  const [cartao, setCartao] = useState<CartaoPagamentoArmazenado | null>(null);
  const [processado, setProcessado] = useState(false);
  const [itemAvulso, setItemAvulso] = useState<ItemPagamentoAvulso | null>(null);
  const [cartoesSalvos, setCartoesSalvos] = useState<Cartao[]>(CARTOES_PADRAO);

  function setValorPagamento(novoValor: number) {
    setValor(Number.isFinite(novoValor) ? novoValor : 0);
  }

  function setMetodoPagamento(novoMetodo: FormaPagamento) {
    setMetodo(novoMetodo);
  }

  function setCartaoPagamento(novoCartao: CartaoPagamentoArmazenado) {
    setCartao(novoCartao);
  }

  function marcarPagamentoProcessado() {
    setProcessado(true);
  }

  function setItemPagamentoAvulso(item: ItemPagamentoAvulso) {
    setItemAvulso(item);
  }

  function adicionarCartaoSalvo(novoCartao: Cartao) {
    setCartoesSalvos((atuais) => [...atuais, novoCartao]);
  }

  // Reseta o funil (valor, forma, cartão, item avulso e o carimbo de
  // processado) — mesma limpeza feita pela Web após "Pagamento Aprovado".
  // A carteira de cartões salvos (cartoesSalvos) não é afetada.
  function limparDadosPagamento() {
    setValor(0);
    setMetodo(null);
    setCartao(null);
    setProcessado(false);
    setItemAvulso(null);
  }

  return (
    <PagamentoContext.Provider
      value={{
        valor,
        setValorPagamento,
        metodo,
        setMetodoPagamento,
        cartao,
        setCartaoPagamento,
        processado,
        marcarPagamentoProcessado,
        itemAvulso,
        setItemPagamentoAvulso,
        cartoesSalvos,
        adicionarCartaoSalvo,
        limparDadosPagamento,
      }}
    >
      {children}
    </PagamentoContext.Provider>
  );
}
