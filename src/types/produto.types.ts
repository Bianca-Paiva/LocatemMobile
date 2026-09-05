import { ImageSourcePropType } from 'react-native';

/**
 * Avaliação individual de uma ferramenta, escrita por quem já a alugou.
 * Espelha `AvaliacaoProduto` do Web (ver `web/src/pages/ProdutoDetalhe/ProdutoDetalhe.types.ts`),
 * adaptado apenas no tipo de `fotos` para aceitar `require()` nativo do React Native.
 */
export interface AvaliacaoProduto {
    nome: string;
    rating: number;
    tempo: string;
    texto: string;
    fotos: ImageSourcePropType[];
    utilCount: number;
}

/**
 * Tipo mestre de Produto (ferramenta).
 * Reúne TODOS os campos que qualquer página do app pode precisar exibir.
 */
export interface Produto {
    id: number;
    title: string;
    marca: string;
    price: string;


    images: ImageSourcePropType[];

    imageVerificado: ImageSourcePropType;
    imageNota: ImageSourcePropType;

    rating: number;
    reviewCount: number;

    locador: string;
    localizacao: string;
    categoria: string;

    estoqueDisponivel: number;

    paymentMethods: string[];

    available: boolean;

    meuAnuncio?: boolean;

    descricao?: string;

    especificacoes?: {
        label: string;
        valor: string;
    }[];


    caucao?: string;

    diasIndisponiveis?: string[];

    tipoAprovacao?: 'manual' | 'automatica';

    /** Voltagem/fonte de alimentação, ex: "220V", "127V", "À bateria", "Pneumática". Espelha `voltagem` do Web (ver `produto.types.ts` do Web). */
    voltagem?: string;

    /** Itens inclusos que acompanham a ferramenta, ex: bateria, carregador, maleta. */
    acessorios?: string[];

    /**
     * Avaliações específicas desta ferramenta. A média, a quantidade e a distribuição
     * por estrela exibidas na tela devem ser sempre calculadas a partir daqui
     * (ver `utils/avaliacoesResumo.ts`), nunca lidas diretamente de `rating`/`reviewCount`
     * fixos — esses dois campos acima servem só como valor de catálogo/fallback.
     */
    avaliacoes?: AvaliacaoProduto[];

    /** Distribuição percentual das notas [5,4,3,2,1] estrelas, deve somar ~100. */
    distribuicaoAvaliacoes?: number[];
}