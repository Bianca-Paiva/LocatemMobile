/**
 * Detalhe da ferramenta: apresenta dados do produto e inicia fluxos de carrinho ou locacao.
 */
import { ImageSourcePropType } from 'react-native';

export interface Avaliacao {
  nome: string;
  rating: number;
  tempo: string;
  texto: string;
  fotos?: any[]; // Aceita strings (URI) ou ImageSourcePropType (require)
  utilCount: number;
}

export interface AvaliacaoSectionProps {
  mediaGeral: number;
  totalAvaliacoes: number;
  distribuicao: number[]; // [5estrelas%, 4%, 3%, 2%, 1%]
  avaliacoes: Avaliacao[];
  imageNota?: ImageSourcePropType;
}