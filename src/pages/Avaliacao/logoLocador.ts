import { ImageSourcePropType } from 'react-native';

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