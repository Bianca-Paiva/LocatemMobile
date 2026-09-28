/** Cenarios cobertos pelos testes de index. */
import React from 'react';
import { act, create } from 'react-test-renderer';
import { Text, TouchableOpacity } from 'react-native';
import BtnPrincipal from '../../../../src/components/Botoes/BtnPrincipal/index';
import styles from '../../../../src/components/Botoes/BtnPrincipal/styles';
import { pressionar, textoDe } from '../../../testUtils/componentQueries';

// Helper para montar o botão com as props obrigatórias, facilitando os testes individuais
/** Monta o componente com propriedades padrao que cada teste pode substituir. */
function renderizar(props: Partial<React.ComponentProps<typeof BtnPrincipal>> = {}) {
  let renderer: any;
  act(() => {
    renderer = create(<BtnPrincipal title="Confirmar" onPress={() => {}} {...props} />);
  });
  return renderer;
}

describe('BtnPrincipal', () => {
  // Verifica se a propriedade 'title' é renderizada corretamente dentro de um elemento Text
  it('renderiza o título recebido', () => {
    const renderer = renderizar({ title: 'Salvar' });
    expect(textoDe(renderer.root.findByType(Text))).toBe('Salvar');
  });

  // Assegura que o botão executa a ação passada na prop 'onPress' ao sofrer iteração
  it('chama onPress ao ser pressionado', () => {
    const onPress = jest.fn();
    const renderer = renderizar({ onPress });

    pressionar(renderer.root.findByType(TouchableOpacity));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  // Valida a aplicação das cores e estilizações padrão de destaque (call to action principal)
  it('usa o estilo primário por padrão (sem variant informado)', () => {
    const renderer = renderizar();
    const botao = renderer.root.findByType(TouchableOpacity);
    expect(botao.props.style).toContainEqual(styles.primaryBackground);

    const texto = renderer.root.findByType(Text);
    expect(texto.props.style).toContainEqual(styles.primaryText);
  });

  // Valida a troca de estilização para botões de menor importância hierárquica na tela
  it('usa o estilo secundário quando variant="secondary"', () => {
    const renderer = renderizar({ variant: 'secondary' });
    const botao = renderer.root.findByType(TouchableOpacity);
    expect(botao.props.style).toContainEqual(styles.secondaryBackground);

    const texto = renderer.root.findByType(Text);
    expect(texto.props.style).toContainEqual(styles.secondaryText);
  });
});
