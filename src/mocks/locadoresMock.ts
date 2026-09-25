import { ImageSourcePropType } from 'react-native';

import logoLojaMS from '../../assets/images/LogosLojas/logoLojaMS.png';
import logoLojaJB from '../../assets/images/LogosLojas/logoLojaJB.png';

export interface Locador {
  nome: string;
  logoUrl?: ImageSourcePropType;
  rating: number;
  reviewCount: number;
  locacoes: number;
  verificado: boolean;
  /** Mês/ano de entrada na plataforma, ex: "jan. 2022". Exibido na Loja do Locador. */
  desde?: string;
  /** Cidade/UF onde a loja está localizada. Exibido na Loja do Locador. */
  localizacao?: string;
  /** Texto curto de apresentação da loja. Exibido na Loja do Locador. */
  descricao?: string;
}

/**
 * Catálogo central de locadores (lojas parceiras que anunciam ferramentas).
 *
 * Fonte única de verdade para os dados exibidos no card "InfoVendedor".
 *
 * `Produto.locador` (em produtos.mock.ts) guarda apenas o NOME do locador;
 * os demais dados (rating, avaliações, locações, verificado, logo) vêm
 * sempre daqui, por nome — assim um mesmo locador nunca aparece com
 * números diferentes em produtos diferentes, e nenhum componente precisa
 * hardcodar esses valores.
 */
export const LOCADORES_MOCK: Locador[] = [
  {
    nome: 'MS Ferramentas',
    logoUrl: logoLojaMS,
    rating: 4.0,
    reviewCount: 20,
    locacoes: 500,
    verificado: true,
    desde: 'mar. 2021',
    localizacao: 'São Paulo, SP',
    descricao: 'Ferramentas elétricas e de corte com manutenção em dia. Retirada rápida e suporte durante toda a locação.',
  },
  {
    nome: 'WZ Ferramentas',
    rating: 4.3,
    reviewCount: 96,
    locacoes: 180,
    verificado: true,
    desde: 'jul. 2023',
    localizacao: 'Guarulhos, SP',
    descricao: 'Equipamentos revisados a cada locação. Atendimento próximo e flexível pra pequenas e grandes reformas.',
  },
  {
    nome: 'JB Ferramentas',
    logoUrl: logoLojaJB,
    rating: 4.9,
    reviewCount: 200,
    locacoes: 500,
    verificado: true,
    desde: 'jan. 2022',
    localizacao: 'São Paulo, SP',
    descricao: 'Ferramentas profissionais e bem cuidadas para o seu projeto. Atendimento rápido e suporte durante toda a locação.',
  },
];

/**
 * Busca um locador pelo nome.
 *
 * Retorna um fallback seguro caso o locador não seja encontrado no catálogo.
 */
export const getLocadorByNome = (nome: string): Locador => {
  const encontrado = LOCADORES_MOCK.find((locador) => locador.nome === nome);

  if (encontrado) {
    return encontrado;
  }

  return {
    nome,
    rating: 0,
    reviewCount: 0,
    locacoes: 0,
    verificado: false,
  };
};
