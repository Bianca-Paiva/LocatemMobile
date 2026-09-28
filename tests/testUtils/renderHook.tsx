/** Cenarios cobertos pelos testes de renderHook. */
import React from 'react';
import { act, create } from 'react-test-renderer';

/**
 * Implementação mínima de `renderHook` (equivalente ao de
 * @testing-library/react-hooks / @testing-library/react-native), que não
 * está instalado neste projeto. Usa react-test-renderer diretamente, que já
 * é dependência transitiva do jest-expo.
 *
 * Suporta: valor atual do hook (`result.current`), `rerender` com novas
 * props, `unmount`, e wrapping opcional em um Provider de Context.
 */
export function renderHook<TProps, TResult>(
  callback: (props: TProps) => TResult,
  options?: {
    initialProps?: TProps;
    wrapper?: React.ComponentType<{ children: React.ReactNode }>;
  },
) {
  const result: { current: TResult | undefined; error?: unknown } = {
    current: undefined,
    error: undefined,
  };

  /** Executa o hook durante a renderizacao e guarda seu resultado atual. */
  function TestComponent({ hookProps }: { hookProps: TProps }) {
    try {
      result.current = callback(hookProps);
    } catch (error) {
      result.error = error;
    }
    return null;
  }

  const Wrapper = options?.wrapper;

  /** Monta o componente de teste, opcionalmente dentro do provider configurado. */
  function renderElement(hookProps: TProps) {
    const element = <TestComponent hookProps={hookProps} />;
    return Wrapper ? <Wrapper>{element}</Wrapper> : element;
  }

  let renderer!: ReturnType<typeof create>;
  act(() => {
    renderer = create(renderElement(options?.initialProps as TProps));
  });

  return {
    result,
    rerender: (newProps?: TProps) => {
      act(() => {
        renderer.update(renderElement(newProps as TProps));
      });
    },
    unmount: () => {
      act(() => {
        renderer.unmount();
      });
    },
  };
}

export { act };
