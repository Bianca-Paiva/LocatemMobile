import { ImageSourcePropType } from 'react-native';

/**
 * Tipo mestre de Produto (ferramenta).
 * Reúne TODOS os campos que qualquer página do app pode precisar exibir.
 */
export interface Produto {
    id: number;
    title: string;
    brand: string;
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

    acessorios?: string[];

    caucao?: string;

    diasIndisponiveis?: string[];

    tipoAprovacao?: 'manual' | 'automatica';
}