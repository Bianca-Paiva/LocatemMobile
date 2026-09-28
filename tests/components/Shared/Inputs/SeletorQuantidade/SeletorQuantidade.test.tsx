/** Cenarios cobertos pelos testes de SeletorQuantidade. */
import React from 'react';
import { act, create } from 'react-test-renderer';
import { Text } from 'react-native';
import SeletorQuantidade from '../../../../../src/components/Shared/Inputs/SeletorQuantidade/SeletorQuantidade';
import { pressionar, encontrarPorAccessibilityLabel, textoDe } from '../../../../testUtils/componentQueries';

// Instanciação base para suprir dados como valor atual (quantidade) e os eventos de botões
/** Monta o componente com propriedades padrao que cada teste pode substituir. */
function renderizar(props: Partial<React.ComponentProps<typeof SeletorQuantidade>> = {}) {
  let renderer: any;
  act(() => {
    renderer = create(
      <SeletorQuantidade quantidade={1} onDecrementar={jest.fn()} onIncrementar={jest.fn()} {...props} />,
    );
  });
  return renderer;
}

// Helpers que localizam os botões de ação na árvore baseados no label dinâmico, garantindo a acessibilidade correta
/** Localiza o controle que reduz a quantidade. */
function botaoDiminuir(renderer: any, label = 'Quantidade') {
  return encontrarPorAccessibilityLabel(renderer, `Diminuir ${label}`);
}
/** Localiza o controle que aumenta a quantidade. */
function botaoAumentar(renderer: any, label = 'Quantidade') {
  return encontrarPorAccessibilityLabel(renderer, `Aumentar ${label}`);
}

describe('SeletorQuantidade', () => {
  // Verifica se o painel central exibe o número instanciado
  it('exibe o valor atual da quantidade', () => {
    const renderer = renderizar({ quantidade: 3 });
    const textos = renderer.root.findAllByType(Text).map((t: any) => textoDe(t));
    expect(textos).toContain('3');
  });

  // O componente suporta mudança de contexto do item que está sendo selecionado ("Quantidade" ou nome customizado)
  it('usa "Quantidade" como label padrão', () => {
    const renderer = renderizar();
    expect(() => botaoAumentar(renderer)).not.toThrow();
  });

  it('usa o label customizado quando informado', () => {
    const renderer = renderizar({ label: 'Período (dias)' });
    expect(() => botaoAumentar(renderer, 'Período (dias)')).not.toThrow();
  });

  // Mostra feedback visual (*) caso o preenchimento/seleção seja exigido no formulário pai
  it('exibe o asterisco quando required=true', () => {
    const renderer = renderizar({ required: true });
    const label = renderer.root.findAllByType(Text)[0];
    // O texto do label é composto por múltiplos <Text> aninhados; garantimos
    // que o asterisco aparece em algum <Text> filho.
    const textos = renderer.root.findAllByType(Text).map((t: any) => textoDe(t));
    expect(textos.some((t: string) => t.includes('*'))).toBe(true);
  });

  it('não exibe o asterisco quando required=false (padrão)', () => {
    const renderer = renderizar();
    const textos = renderer.root.findAllByType(Text).map((t: any) => textoDe(t));
    expect(textos.some((t: string) => t.includes('*'))).toBe(false);
  });

  // Verifica as ramificações de regras de negócio em relação a visualização de limite de inventário
  describe('exibição de estoque disponível', () => {
    it('mostra "(N disponíveis)" no plural quando estoqueDisponivel > 1', () => {
      const renderer = renderizar({ estoqueDisponivel: 5 });
      const textos = renderer.root.findAllByType(Text).map((t: any) => textoDe(t));
      expect(textos.some((t: string) => t.includes('5') && t.includes('disponíveis'))).toBe(true);
    });

    it('mostra "(1 disponível)" no singular quando estoqueDisponivel === 1', () => {
      const renderer = renderizar({ estoqueDisponivel: 1 });
      const textos = renderer.root.findAllByType(Text).map((t: any) => textoDe(t));
      expect(textos.some((t: string) => t.includes('1') && t.includes('disponível') && !t.includes('disponíveis'))).toBe(
        true,
      );
    });

    it('não mostra o estoque quando exibirEstoqueDisponivel=false', () => {
      const renderer = renderizar({ estoqueDisponivel: 5, exibirEstoqueDisponivel: false });
      const textos = renderer.root.findAllByType(Text).map((t: any) => textoDe(t));
      expect(textos.some((t: string) => t.includes('disponíveis'))).toBe(false);
    });

    it('não mostra o estoque quando estoqueDisponivel não é informado', () => {
      const renderer = renderizar();
      const textos = renderer.root.findAllByType(Text).map((t: any) => textoDe(t));
      expect(textos.some((t: string) => t.includes('disponível'))).toBe(false);
    });
  });

  // Validações de limites interativos: bloqueios ao alcançar teto ou chão da contagem permitida
  describe('limites mínimo/máximo', () => {
    it('desabilita o botão de diminuir quando quantidade === minimo', () => {
      const renderer = renderizar({ quantidade: 1, minimo: 1 });
      expect(botaoDiminuir(renderer).props.disabled).toBe(true);
    });

    it('habilita o botão de diminuir quando quantidade > minimo', () => {
      const renderer = renderizar({ quantidade: 2, minimo: 1 });
      expect(botaoDiminuir(renderer).props.disabled).toBe(false);
    });

    it('desabilita o botão de aumentar quando quantidade === maximo', () => {
      const renderer = renderizar({ quantidade: 5, maximo: 5 });
      expect(botaoAumentar(renderer).props.disabled).toBe(true);
    });

    // Caso de uso em e-commerce: o botão bloqueia com base no estoque se o máximo não for explícito
    it('desabilita o botão de aumentar quando quantidade === estoqueDisponivel (sem maximo explícito)', () => {
      const renderer = renderizar({ quantidade: 3, estoqueDisponivel: 3 });
      expect(botaoAumentar(renderer).props.disabled).toBe(true);
    });

    // Hierarquia de regras: 'maximo' sobresscreve o 'estoqueDisponivel' na lógica de bloqueio
    it('"maximo" tem prioridade sobre estoqueDisponivel quando ambos são informados', () => {
      const renderer = renderizar({ quantidade: 3, maximo: 10, estoqueDisponivel: 3 });
      expect(botaoAumentar(renderer).props.disabled).toBe(false);
    });

    // Limite técnico fallback (para prevenir loops infinitos em inputs não controlados ou muito longos)
    it('sem maximo nem estoqueDisponivel, o limite é 999', () => {
      const renderer = renderizar({ quantidade: 998 });
      expect(botaoAumentar(renderer).props.disabled).toBe(false);
    });
  });

  // Testes das chamadas que sobem a informação atualizada para o componente pai
  describe('interação', () => {
    it('chama onDecrementar ao clicar em diminuir', () => {
      const onDecrementar = jest.fn();
      const renderer = renderizar({ quantidade: 2, onDecrementar });

      pressionar(botaoDiminuir(renderer));

      expect(onDecrementar).toHaveBeenCalledTimes(1);
    });

    it('chama onIncrementar ao clicar em aumentar', () => {
      const onIncrementar = jest.fn();
      const renderer = renderizar({ quantidade: 2, onIncrementar });

      pressionar(botaoAumentar(renderer));

      expect(onIncrementar).toHaveBeenCalledTimes(1);
    });
  });
});
