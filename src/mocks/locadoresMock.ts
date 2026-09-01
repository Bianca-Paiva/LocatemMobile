import { ImageSourcePropType } from 'react-native';

export interface Locador {
    nome: string;
    // 🚀 ESTRATÉGIA: Permitimos string (URL web) ou ImageSourcePropType (require() local)
    logoUrl?: string | ImageSourcePropType; 
    rating: number;
    reviewCount: number;
    locacoes: number;
    verificado: boolean;
}

export const LOCADORES_MOCK: Locador[] = [
    {
        nome: 'JB Ferramentas',
        rating: 4.9,
        reviewCount: 200,
        locacoes: 500,
        verificado: true,
    },
    {
        nome: 'WZ Ferramentas',
        rating: 4.3,
        reviewCount: 96,
        locacoes: 180,
        verificado: true,
    },
    {
        nome: 'João Ferramentas',
        rating: 4.7,
        reviewCount: 150,
        locacoes: 310,
        verificado: true,
    },
    {
        nome: 'MS Ferramentas',
        rating: 4.0,
        reviewCount: 20,
        locacoes: 500,
        verificado: true,
    },
    {
        nome: 'HomePro Pro Store', // 🚀 Adicionei o que usamos no mock anterior!
        rating: 4.9,
        reviewCount: 350,
        locacoes: 1200,
        verificado: true,
    }
];

/** 
 * Busca um locador pelo nome; retorna um fallback seguro caso não seja encontrado no catálogo. 
 */
export const getLocadorByNome = (nome: string): Locador => {
    const encontrado = LOCADORES_MOCK.find((l) => l.nome === nome);
    if (encontrado) return encontrado;

    return {
        nome,
        rating: 0,
        reviewCount: 0,
        locacoes: 0,
        verificado: false,
    };
};