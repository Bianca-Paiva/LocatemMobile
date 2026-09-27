import React from 'react';
import { act, create } from 'react-test-renderer';
import { Text, TouchableOpacity } from 'react-native';
import BtnPrincipal from '../../../../src/components/Botoes/BtnPrincipal/index';
import styles from '../../../../src/components/Botoes/BtnPrincipal/styles';
import { pressionar, textoDe } from '../../../testUtils/componentQueries';

function renderizar(props: Partial<React.ComponentProps<typeof BtnPrincipal>> = {}) {
  let renderer: any;
  act(() => {
    renderer = create(<BtnPrincipal title="Confirmar" onPress={() => {}} {...props} />);
  });
  return renderer;
}

describe('BtnPrincipal', () => {
  it('renderiza o título recebido', () => {
    const renderer = renderizar({ title: 'Salvar' });
    expect(textoDe(renderer.root.findByType(Text))).toBe('Salvar');
  });

  it('chama onPress ao ser pressionado', () => {
    const onPress = jest.fn();
    const renderer = renderizar({ onPress });

    pressionar(renderer.root.findByType(TouchableOpacity));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('usa o estilo primário por padrão (sem variant informado)', () => {
    const renderer = renderizar();
    const botao = renderer.root.findByType(TouchableOpacity);
    expect(botao.props.style).toContainEqual(styles.primaryBackground);

    const texto = renderer.root.findByType(Text);
    expect(texto.props.style).toContainEqual(styles.primaryText);
  });

  it('usa o estilo secundário quando variant="secondary"', () => {
    const renderer = renderizar({ variant: 'secondary' });
    const botao = renderer.root.findByType(TouchableOpacity);
    expect(botao.props.style).toContainEqual(styles.secondaryBackground);

    const texto = renderer.root.findByType(Text);
    expect(texto.props.style).toContainEqual(styles.secondaryText);
  });
});
