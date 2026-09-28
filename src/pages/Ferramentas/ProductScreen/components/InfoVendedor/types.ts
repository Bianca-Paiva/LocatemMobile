/**
 * Detalhe da ferramenta: apresenta dados do produto e inicia fluxos de carrinho ou locacao.
 */
import { ImageSourcePropType } from 'react-native';

export interface InfoVendedorProps {
  nome: string;
  logoUrl?:ImageSourcePropType; // Aceita tanto URL da API quanto require() local
  rating: number;
  reviewCount: number;
  locacoes: number;
  verificado: boolean;
  imageNota: ImageSourcePropType;
  onVerPerfil?: () => void; // Adicionado para lidar com o clique nativo
}
