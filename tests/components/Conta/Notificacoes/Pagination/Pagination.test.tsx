/** Cenarios cobertos pelos testes de Pagination. */
import React from 'react';
import { act, create } from 'react-test-renderer';
import { Text } from 'react-native';
import Pagination from '../../../../../src/components/Conta/Notificacoes/Pagination/Pagination';
import { styles } from '../../../../../src/components/Conta/Notificacoes/Pagination/styles';
import { pressionar, encontrarPressables, textoDe } from '../../../../testUtils/componentQueries';

// Configura o componente com os callbacks necessários, facilitando a injeção do estado da página no teste
/** Monta o componente com propriedades padrao que cada teste pode substituir. */
function renderizar(props: Partial<React.ComponentProps<typeof Pagination>>) {
  let renderer: any;
  act(() => {
    renderer = create(
      <Pagination
        currentPage={1}
        totalPages={1}
        onPageChange={jest.fn()}
        onPrev={jest.fn()}
        onNext={jest.fn()}
        {...props}
      />,
    );
  });
  return renderer;
}

describe('Pagination', () => {
  // Lógica de ocultação: o componente desaparece para otimizar espaço de tela se não houver páginas para navegar
  it('não renderiza nada quando há 1 página ou menos', () => {
    const renderer = renderizar({ totalPages: 1 });
    expect(renderer.toJSON()).toBeNull();
  });

  it('não renderiza nada quando totalPages é 0', () => {
    const renderer = renderizar({ totalPages: 0 });
    expect(renderer.toJSON()).toBeNull();
  });

  // Verifica a construção da lista iterável de páginas exibidas
  it('renderiza um botão numerado para cada página', () => {
    const renderer = renderizar({ totalPages: 4, currentPage: 2 });
    const numeros = renderer.root.findAllByType(Text).map((t: any) => textoDe(t));
    expect(numeros).toEqual(['1', '2', '3', '4']);
  });

  // Garante o feedback visual que indica ao usuário em qual página ele está no momento
  it('aplica o estilo ativo apenas ao botão da página atual', () => {
    const renderer = renderizar({ totalPages: 3, currentPage: 2 });
    const textos = renderer.root.findAllByType(Text);
    const ativo = textos.find((t: any) => textoDe(t) === '2')!;
    expect(ativo.props.style).toContainEqual(styles.pageButtonTextActive);

    const inativo = textos.find((t: any) => textoDe(t) === '1')!;
    expect(inativo.props.style).not.toContainEqual(styles.pageButtonTextActive);
  });

  // Interação ao clicar em um número específico de página, burlando a ordem sequencial das setas
  it('chama onPageChange com o número da página clicada', () => {
    const onPageChange = jest.fn();
    const renderer = renderizar({ totalPages: 3, currentPage: 1, onPageChange });

    // Ordem dos Pressables: [seta anterior, página 1, página 2, página 3, seta próxima]
    const pressables = encontrarPressables(renderer);
    pressionar(pressables[3]); // botão da página 3

    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  // Lógica de bloqueio: impede que o usuário clique para retroceder quando já está no início
  it('desabilita a seta "anterior" na primeira página', () => {
    const renderer = renderizar({ totalPages: 3, currentPage: 1 });
    const [setaAnterior] = encontrarPressables(renderer);
    expect(setaAnterior.props.disabled).toBe(true);
  });

  // Lógica de bloqueio: impede avanço além da contagem máxima de páginas disponíveis
  it('desabilita a seta "próxima" na última página', () => {
    const renderer = renderizar({ totalPages: 3, currentPage: 3 });
    const pressables = encontrarPressables(renderer);
    const setaProxima = pressables[pressables.length - 1];
    expect(setaProxima.props.disabled).toBe(true);
  });

  // Situação padrão de navegação (páginas intermediárias não possuem bloqueio direcional)
  it('habilita ambas as setas numa página do meio', () => {
    const renderer = renderizar({ totalPages: 3, currentPage: 2 });
    const pressables = encontrarPressables(renderer);
    expect(pressables[0].props.disabled).toBe(false);
    expect(pressables[pressables.length - 1].props.disabled).toBe(false);
  });

  // Ações mapeadas das setas sequenciais
  it('chama onPrev ao clicar na seta anterior', () => {
    const onPrev = jest.fn();
    const renderer = renderizar({ totalPages: 3, currentPage: 2, onPrev });

    pressionar(encontrarPressables(renderer)[0]);

    expect(onPrev).toHaveBeenCalledTimes(1);
  });

  it('chama onNext ao clicar na seta próxima', () => {
    const onNext = jest.fn();
    const renderer = renderizar({ totalPages: 3, currentPage: 2, onNext });

    const pressables = encontrarPressables(renderer);
    pressionar(pressables[pressables.length - 1]);

    expect(onNext).toHaveBeenCalledTimes(1);
  });
});
