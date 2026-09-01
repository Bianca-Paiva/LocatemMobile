import { ImageSourcePropType } from 'react-native';

/**
 * Tipo mestre de Produto (ferramenta).
 * Reúne TODOS os campos que qualquer página do app pode precisar exibir.
 */
export interface Produto {
    id: number;
    title: string;
    marca: string;
    price: string;
    voltagem?: string;

    images: ImageSourcePropType[];

    imageVerificado: ImageSourcePropType;
    imageNota: ImageSourcePropType;

    rating: number;
    reviewCount: number;

    locador: string;
    localizacao: string;
    category: string;

    estoqueDisponivel: number;

    paymentMethods: string[];

    available: boolean;

    meuAnuncio?: boolean;

    descricao?: string;

    especificacoes?: {
        label: string;
        valor: string;
    }[];

    acessorios?: string[];

    caucao?: string;

    diasIndisponiveis?: string[];

    tipoAprovacao?: 'manual' | 'automatica';
}