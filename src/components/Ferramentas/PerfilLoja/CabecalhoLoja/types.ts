import { ImageSourcePropType } from 'react-native';

export interface CabecalhoLojaProps {
  nome: string;
  logoUrl?: ImageSourcePropType;
  verificado: boolean;
  desde?: string;
  localizacao?: string;
  descricao?: string;
  rating: number;
  reviewCount: number;
  /** Quantidade de ferramentas anunciadas por essa loja (derivada do catálogo real). */
  ferramentasAnunciadas: number;
  /** Quantidade de locações já concluídas pela loja. */
  locacoesConcluidas: number;
}
