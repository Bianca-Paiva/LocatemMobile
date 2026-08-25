/// <reference types="expo/types" />

/**
 * O projeto majoritariamente carrega imagens via `require('...png')`, que o
 * TypeScript já trata como `any` sem precisar de declaração. Alguns poucos
 * componentes (ex: CampoData, HorarioDropdown) usam a sintaxe
 * `import x from '...png'` em vez disso, que exige que o tipo do módulo
 * seja declarado explicitamente — é isso que as declarações abaixo fazem.
 */
declare module '*.png' {
  import type { ImageSourcePropType } from 'react-native';
  const value: ImageSourcePropType;
  export default value;
}

declare module '*.jpg' {
  import type { ImageSourcePropType } from 'react-native';
  const value: ImageSourcePropType;
  export default value;
}

declare module '*.jpeg' {
  import type { ImageSourcePropType } from 'react-native';
  const value: ImageSourcePropType;
  export default value;
}

declare module '*.svg' {
  import type { ImageSourcePropType } from 'react-native';
  const value: ImageSourcePropType;
  export default value;
}
