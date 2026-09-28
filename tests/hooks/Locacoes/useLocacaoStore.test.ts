/** Cenarios cobertos pelos testes de useLocacaoStore. */
import { useLocacaoStore } from '../../../src/hooks/Locacoes/useLocacaoStore';

// A store zustand é um singleton em memória compartilhado por todos os testes
// do arquivo. Como setState sem `replace` faz merge e preserva as ações
// (funções), basta resetar os campos de dados a cada teste.
// A store é usada via getState()/setState(), fora de componentes React,
// então não é necessário envolver as chamadas em act().
beforeEach(() => {
  useLocacaoStore.setState({ locacoes: [], locacaoSelecionada: null });
});

describe('useLocacaoStore', () => {
  it('inicia com lista de locacoes vazia e nenhuma selecionada', () => {
    const estado = useLocacaoStore.getState();
    expect(estado.locacoes).toEqual([]);
    expect(estado.locacaoSelecionada).toBeNull();
  });

  it('adicionarLocacao adiciona a locacao à lista com um id gerado', () => {
    const novaLocacao: any = useLocacaoStore.getState().adicionarLocacao({ produto: 'Furadeira' } as any);

    const estado = useLocacaoStore.getState();
    expect(estado.locacoes).toHaveLength(1);
    expect((estado.locacoes[0] as any).produto).toBe('Furadeira');
    expect(estado.locacoes[0].id).toEqual(expect.any(String));
    expect(novaLocacao.id).toBe(estado.locacoes[0].id);
  });

  it('adicionarLocacao acumula múltiplas locacoes preservando a ordem de inserção', () => {
    useLocacaoStore.getState().adicionarLocacao({ produto: 'A' } as any);
    useLocacaoStore.getState().adicionarLocacao({ produto: 'B' } as any);

    const locacoes = useLocacaoStore.getState().locacoes as any[];
    expect(locacoes.map((l) => l.produto)).toEqual(['A', 'B']);
  });

  it('adicionarLocacao gera ids diferentes para locacoes diferentes', () => {
    const l1: any = useLocacaoStore.getState().adicionarLocacao({ produto: 'A' } as any);
    const l2: any = useLocacaoStore.getState().adicionarLocacao({ produto: 'B' } as any);

    expect(l1.id).not.toBe(l2.id);
  });

  it('setLocacaoSelecionada define a locacao selecionada', () => {
    const locacao: any = { id: 'x1', produto: 'Serra' };

    useLocacaoStore.getState().setLocacaoSelecionada(locacao);

    expect(useLocacaoStore.getState().locacaoSelecionada).toEqual(locacao);
  });

  it('setLocacaoSelecionada aceita null para limpar a seleção', () => {
    useLocacaoStore.getState().setLocacaoSelecionada({ id: 'x1' } as any);
    useLocacaoStore.getState().setLocacaoSelecionada(null);

    expect(useLocacaoStore.getState().locacaoSelecionada).toBeNull();
  });
});
