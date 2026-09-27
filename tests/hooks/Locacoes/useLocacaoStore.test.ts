import { act } from 'react-test-renderer';
import { useLocacaoStore } from '../../../src/hooks/Locacoes/useLocacaoStore';

// Estado inicial usado para resetar a store zustand entre os testes, já que
// ela é um singleton em memória compartilhado por todos os testes do arquivo.
const ESTADO_INICIAL = useLocacaoStore.getState();

beforeEach(() => {
  act(() => {
    useLocacaoStore.setState({ locacoes: [], locacaoSelecionada: null }, true);
    // Garante que as funções da store não sejam perdidas pelo replace acima.
    useLocacaoStore.setState(ESTADO_INICIAL, false);
    useLocacaoStore.setState({ locacoes: [], locacaoSelecionada: null }, false);
  });
});

describe('useLocacaoStore', () => {
  it('inicia com lista de locacoes vazia e nenhuma selecionada', () => {
    const estado = useLocacaoStore.getState();
    expect(estado.locacoes).toEqual([]);
    expect(estado.locacaoSelecionada).toBeNull();
  });

  it('adicionarLocacao adiciona a locacao à lista com um id gerado', () => {
    let novaLocacao: any;
    act(() => {
      novaLocacao = useLocacaoStore.getState().adicionarLocacao({ produto: 'Furadeira' });
    });

    const estado = useLocacaoStore.getState();
    expect(estado.locacoes).toHaveLength(1);
    expect(estado.locacoes[0].produto).toBe('Furadeira');
    expect(estado.locacoes[0].id).toEqual(expect.any(String));
    expect(novaLocacao.id).toBe(estado.locacoes[0].id);
  });

  it('adicionarLocacao acumula múltiplas locacoes preservando a ordem de inserção', () => {
    act(() => {
      useLocacaoStore.getState().adicionarLocacao({ produto: 'A' });
      useLocacaoStore.getState().adicionarLocacao({ produto: 'B' });
    });

    const locacoes = useLocacaoStore.getState().locacoes;
    expect(locacoes.map((l) => l.produto)).toEqual(['A', 'B']);
  });

  it('adicionarLocacao gera ids diferentes para locacoes diferentes', () => {
    let l1: any;
    let l2: any;
    act(() => {
      l1 = useLocacaoStore.getState().adicionarLocacao({ produto: 'A' });
      l2 = useLocacaoStore.getState().adicionarLocacao({ produto: 'B' });
    });

    expect(l1.id).not.toBe(l2.id);
  });

  it('setLocacaoSelecionada define a locacao selecionada', () => {
    const locacao = { id: 'x1', produto: 'Serra' };
    act(() => {
      useLocacaoStore.getState().setLocacaoSelecionada(locacao);
    });

    expect(useLocacaoStore.getState().locacaoSelecionada).toEqual(locacao);
  });

  it('setLocacaoSelecionada aceita null para limpar a seleção', () => {
    act(() => {
      useLocacaoStore.getState().setLocacaoSelecionada({ id: 'x1' });
      useLocacaoStore.getState().setLocacaoSelecionada(null);
    });

    expect(useLocacaoStore.getState().locacaoSelecionada).toBeNull();
  });
});
