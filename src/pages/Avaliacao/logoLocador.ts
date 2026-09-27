import { ImageSourcePropType } from 'react-native';

// Mapa estático "nome do locador/loja" -> imagem da logo (bundle local, via
// require). Usado para exibir a marca da loja nos cards de avaliação sem
// depender de uma URL remota.
const LOGO_POR_LOCADOR: Record<
  string,
  ImageSourcePropType
> = {
  'MS Ferramentas': require('../../../assets/images/LogosLojas/logoLojaMS.png'),
  'JB Ferramentas': require('../../../assets/images/LogosLojas/logoLojaJB.png'),
};

/**
 * Retorna a logo do locador informado,
 * ou null caso não exista.
 */
export function obterLogoLocador(
  nomeLocador: string
): ImageSourcePropType | null {
  return LOGO_POR_LOCADOR[nomeLocador] ?? null;
}