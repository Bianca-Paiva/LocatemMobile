import { ImageSourcePropType } from 'react-native';

export interface InfoVendedorProps {
  nome: string;
  logoUrl?: string | ImageSourcePropType; // Aceita tanto URL da API quanto require() local
  rating: number;
  reviewCount: number;
  locacoes: number;
  verificado: boolean;
  imageNota: ImageSourcePropType;
  onVerPerfil?: () => void; // Adicionado para lidar com o clique nativo
}
