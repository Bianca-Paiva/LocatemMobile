/** Cenarios cobertos pelos testes de EstrelaAvaliacao. */
import React from 'react';
import { act, create } from 'react-test-renderer';
import { Ionicons } from '@expo/vector-icons';
import { EstrelasAvaliacao } from '../../../../src/components/Avaliacao/EstrelaAvaliacao/EstrelaAvaliacao';
import { pressionar, encontrarPressables } from '../../../testUtils/componentQueries';

// Helper para renderizar o componente com uma nota inicial padrão (0), permitindo sobrescrever props
/** Monta o componente com propriedades padrao que cada teste pode substituir. */
function renderizar(props: Partial<React.ComponentProps<typeof EstrelasAvaliacao>>) {
  let renderer: any;
  act(() => {
    renderer = create(<EstrelasAvaliacao notaAtual={0} {...props} />);
  });
  return renderer;
}

// `Pressable` de 'react-native' não bate por identidade de módulo com o que
// é de fato renderizado internamente neste ambiente de teste (a árvore tem
// múltiplas cópias/camadas internas do Pressable — incluindo um
// PressabilityDebugView de depuração). Localizamos a camada externa de cada
// estrela pelo nome da função do componente + a prop exclusiva `onPress`.
/** Localiza os elementos de estrela na arvore renderizada. */
function encontrarEstrelas(renderer: any) {
  return encontrarPressables(renderer);
}

describe('EstrelasAvaliacao', () => {
  // O componente deve ter estrutura fixa de 5 ícones, independente da nota
  it('renderiza sempre 5 estrelas', () => {
    const renderer = renderizar({ notaAtual: 3 });
    expect(encontrarEstrelas(renderer)).toHaveLength(5);
  });

  // A lógica de preenchimento deve refletir a nota: estrelas preenchidas à esquerda e vazadas à direita
  it('preenche exatamente as N primeiras estrelas conforme notaAtual', () => {
    const renderer = renderizar({ notaAtual: 3 });
    const icones = renderer.root.findAllByType(Ionicons);

    expect(icones.map((i: any) => i.props.name)).toEqual([
      'star',
      'star',
      'star',
      'star-outline',
      'star-outline',
    ]);
  });

  // Valida o estado zerado (todas as estrelas vazadas)
  it('não preenche nenhuma estrela quando notaAtual é 0', () => {
    const renderer = renderizar({ notaAtual: 0 });
    const icones = renderer.root.findAllByType(Ionicons);
    expect(icones.every((i: any) => i.props.name === 'star-outline')).toBe(true);
  });

  // Valida o estado máximo (todas as estrelas preenchidas)
  it('preenche todas as estrelas quando notaAtual é 5', () => {
    const renderer = renderizar({ notaAtual: 5 });
    const icones = renderer.root.findAllByType(Ionicons);
    expect(icones.every((i: any) => i.props.name === 'star')).toBe(true);
  });

  // A cor ativa deve ser aplicada apenas nas estrelas correspondentes à nota; o restante fica cinza
  it('usa a cor ativa informada nas estrelas preenchidas e cinza nas vazias', () => {
    const renderer = renderizar({ notaAtual: 2, corAtiva: '#FF0000' });
    const icones = renderer.root.findAllByType(Ionicons);

    expect(icones[0].props.color).toBe('#FF0000');
    expect(icones[1].props.color).toBe('#FF0000');
    expect(icones[2].props.color).toBe('#DDDBD5');
  });

  // Comportamento fallback caso o desenvolvedor não passe uma cor customizada
  it('usa a cor azul padrão quando corAtiva não é informada', () => {
    const renderer = renderizar({ notaAtual: 1 });
    const icones = renderer.root.findAllByType(Ionicons);
    expect(icones[0].props.color).toBe('#1554F0');
  });

  // O componente suporta diferentes contextos visuais ("variantes") que alteram o tamanho do ícone
  describe('tamanho por variante', () => {
    it('variante "lista" (padrão) usa tamanho 22', () => {
      const renderer = renderizar({ notaAtual: 1 });
      expect(renderer.root.findAllByType(Ionicons)[0].props.size).toBe(22);
    });

    it('variante "modal" usa tamanho 17', () => {
      const renderer = renderizar({ notaAtual: 1, variante: 'modal' });
      expect(renderer.root.findAllByType(Ionicons)[0].props.size).toBe(17);
    });

    it('variante "carrossel" usa tamanho 12', () => {
      const renderer = renderizar({ notaAtual: 1, variante: 'carrossel' });
      expect(renderer.root.findAllByType(Ionicons)[0].props.size).toBe(12);
    });
  });

  // Define se o componente funciona apenas para visualização (readonly) ou se permite inserção de nota
  describe('interatividade', () => {
    it('as estrelas ficam desabilitadas quando aoSelecionar não é informado', () => {
      const renderer = renderizar({ notaAtual: 2 });
      const estrelas = encontrarEstrelas(renderer);
      expect(estrelas.every((e: any) => e.props.disabled === true)).toBe(true);
    });

    it('as estrelas ficam habilitadas quando aoSelecionar é informado', () => {
      const renderer = renderizar({ notaAtual: 2, aoSelecionar: jest.fn() });
      const estrelas = encontrarEstrelas(renderer);
      expect(estrelas.every((e: any) => e.props.disabled === false)).toBe(true);
    });

    // Garante que clicar em uma estrela retorna o valor numérico correto correspondente a ela
    it('chama aoSelecionar com o valor 1-indexado da estrela clicada', () => {
      const aoSelecionar = jest.fn();
      const renderer = renderizar({ notaAtual: 2, aoSelecionar });

      const estrelas = encontrarEstrelas(renderer);
      pressionar(estrelas[2]); // terceira estrela (índice 2) -> valor 3

      expect(aoSelecionar).toHaveBeenCalledWith(3);
    });

    it('a primeira estrela chama aoSelecionar com 1', () => {
      const aoSelecionar = jest.fn();
      const renderer = renderizar({ notaAtual: 0, aoSelecionar });

      pressionar(encontrarEstrelas(renderer)[0]);

      expect(aoSelecionar).toHaveBeenCalledWith(1);
    });
  });
});
