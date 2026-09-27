import { act } from 'react-test-renderer';
import type { ReactTestInstance } from 'react-test-renderer';

/** Simula um toque, chamando o onPress do elemento (TouchableOpacity/Pressable/etc). */
export function pressionar(elemento: ReactTestInstance) {
  act(() => {
    elemento.props.onPress?.();
  });
}

/**
 * Encontra as camadas externas de <Pressable> num render. Necessário porque,
 * neste ambiente de teste, `Pressable` importado de 'react-native' não bate
 * por identidade de módulo com o componente de fato instanciado na árvore
 * (que inclui camadas internas duplicadas, como um PressabilityDebugView) —
 * então localizamos pelo nome da função + a prop exclusiva `onPress`.
 */
export function encontrarPressables(renderer: { root: ReactTestInstance }): ReactTestInstance[] {
  return renderer.root.findAll(
    (no) => typeof no.type === 'function' && (no.type as any).name === 'Pressable' && 'onPress' in no.props,
  );
}

/**
 * Encontra a camada externa de um elemento tocável (Pressable ou
 * TouchableOpacity) por `accessibilityLabel` — a forma mais robusta de
 * localizar um botão específico quando o componente já expõe esse rótulo.
 */
export function encontrarPorAccessibilityLabel(
  renderer: { root: ReactTestInstance },
  label: string,
): ReactTestInstance {
  return renderer.root.find((no) => no.props.accessibilityLabel === label && 'onPress' in no.props);
}

/** Simula digitação, chamando onChangeText do TextInput. */
export function digitar(elemento: ReactTestInstance, texto: string) {
  act(() => {
    elemento.props.onChangeText?.(texto);
  });
}

/** Concatena o texto de um elemento <Text>, mesmo quando os children são um array/fragmentado. */
export function textoDe(elemento: ReactTestInstance): string {
  const { children } = elemento.props;
  if (children == null) return '';
  if (Array.isArray(children)) return children.join('');
  return String(children);
}
