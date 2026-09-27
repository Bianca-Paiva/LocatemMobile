import { act } from 'react-test-renderer';
import { renderHook } from '../../testUtils/renderHook';
import { useMinhasLocacoes } from '../../../src/hooks/Locacoes/useMinhasLocacoes';
import { useLocacaoStore } from '../../../src/hooks/Locacoes/useLocacaoStore';

const ESTADO_INICIAL = useLocacaoStore.getState();

beforeEach(() => {
  act(() => {
    useLocacaoStore.setState(ESTADO_INICIAL, false);
    useLocacaoStore.setState({ locacoes: [], locacaoSelecionada: null }, false);
  });
});

function popularLocacoes(statusList: string[]) {
  act(() => {
    statusList.forEach((status, index) => {
      useLocacaoStore.getState().adicionarLocacao({ status, produto: `Produto ${index}` });
    });
  });
}

describe('useMinhasLocacoes', () => {
  it('começa com o filtro "todas" selecionado', () => {
    const { result } = renderHook(() => useMinhasLocacoes());
    expect(result.current!.filtro).toBe('todas');
  });

  it('retorna todas as locacoes quando o filtro é "todas"', () => {
    popularLocacoes(['pendente', 'finalizada', 'cancelada']);
    const { result } = renderHook(() => useMinhasLocacoes());

    expect(result.current!.locacoesFiltradas).toHaveLength(3);
  });

  it('filtra as locacoes pelo status selecionado', () => {
    popularLocacoes(['pendente', 'finalizada', 'pendente']);
    const { result } = renderHook(() => useMinhasLocacoes());

    act(() => result.current!.setFiltro('pendente' as any));

    expect(result.current!.locacoesFiltradas).toHaveLength(2);
    expect(result.current!.locacoesFiltradas.every((l: any) => l.status === 'pendente')).toBe(true);
  });

  it('retorna lista vazia quando nenhuma locacao bate com o filtro', () => {
    popularLocacoes(['pendente']);
    const { result } = renderHook(() => useMinhasLocacoes());

    act(() => result.current!.setFiltro('cancelada' as any));

    expect(result.current!.locacoesFiltradas).toHaveLength(0);
  });

  it('contagem inclui o total em "todas" e a contagem por status', () => {
    popularLocacoes(['pendente', 'pendente', 'finalizada', 'cancelada']);
    const { result } = renderHook(() => useMinhasLocacoes());

    expect(result.current!.contagem.todas).toBe(4);
    expect(result.current!.contagem.pendente).toBe(2);
    expect(result.current!.contagem.finalizada).toBe(1);
    expect(result.current!.contagem.cancelada).toBe(1);
    expect(result.current!.contagem.recusada).toBe(0);
  });

  it('contagem zera todos os status quando não há locacoes', () => {
    const { result } = renderHook(() => useMinhasLocacoes());

    expect(result.current!.contagem.todas).toBe(0);
    expect(Object.values(result.current!.contagem).every((valor) => valor === 0)).toBe(true);
  });
});
