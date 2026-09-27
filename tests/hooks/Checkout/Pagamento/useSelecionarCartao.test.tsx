import { act } from 'react-test-renderer';
import { renderHook } from '../../../testUtils/renderHook';
import { PagamentoWrapper } from '../../../testUtils/PagamentoWrapper';
import { useSelecionarCartao } from '../../../../src/hooks/Checkout/Pagamento/useSelecionarCartao';
import { usePagamentoStore } from '../../../../src/hooks/Checkout/Pagamento/usePagamentoStore';

function setup(navigate = jest.fn()) {
  const rendered = renderHook(
    () => ({
      selecionarCartao: useSelecionarCartao(navigate),
      pagamentoStore: usePagamentoStore(),
    }),
    { wrapper: PagamentoWrapper },
  );
  return { ...rendered, navigate };
}

describe('useSelecionarCartao', () => {
  it('redireciona para "carrinho" quando nenhum método de pagamento foi escolhido', () => {
    const { navigate } = setup();
    expect(navigate).toHaveBeenCalledWith('carrinho');
  });

  it('redireciona para "carrinho" quando o método escolhido é pix (inválido aqui)', () => {
    const navigate = jest.fn();
    const { result, rerender } = renderHook(
      () => ({
        selecionarCartao: useSelecionarCartao(navigate),
        pagamentoStore: usePagamentoStore(),
      }),
      { wrapper: PagamentoWrapper },
    );

    act(() => result.current!.pagamentoStore.setMetodoPagamento('pix'));

    expect(navigate).toHaveBeenCalledWith('carrinho');
  });

  it('não redireciona e expõe os 4 cartões padrão filtrados por método (crédito)', () => {
    const navigate = jest.fn();
    const { result } = renderHook(
      () => ({
        selecionarCartao: useSelecionarCartao(navigate),
        pagamentoStore: usePagamentoStore(),
      }),
      { wrapper: PagamentoWrapper },
    );

    const chamadasAntes = navigate.mock.calls.length;
    act(() => result.current!.pagamentoStore.setMetodoPagamento('credito'));

    // Nenhum redirecionamento adicional deve ocorrer após o método se tornar válido
    // (o guard de "carrinho" só dispara quando o método está ausente/inválido).
    expect(navigate.mock.calls.length).toBe(chamadasAntes);
    expect(result.current!.selecionarCartao.metodoPagamento).toBe('credito');
    expect(result.current!.selecionarCartao.titulo).toBe('Selecionar Cartão de Crédito');
    expect(result.current!.selecionarCartao.cartoesFiltrados).toHaveLength(2);
    expect(result.current!.selecionarCartao.cartoesFiltrados.every((c: any) => c.metodoPagamento === 'credito')).toBe(
      true,
    );
  });

  it('filtra corretamente os cartões de débito', () => {
    const navigate = jest.fn();
    const { result } = renderHook(
      () => ({
        selecionarCartao: useSelecionarCartao(navigate),
        pagamentoStore: usePagamentoStore(),
      }),
      { wrapper: PagamentoWrapper },
    );

    act(() => result.current!.pagamentoStore.setMetodoPagamento('debito'));

    expect(result.current!.selecionarCartao.titulo).toBe('Selecionar Cartão de Débito');
    expect(result.current!.selecionarCartao.cartoesFiltrados).toHaveLength(2);
    expect(result.current!.selecionarCartao.cartoesFiltrados.every((c: any) => c.metodoPagamento === 'debito')).toBe(
      true,
    );
  });

  it('confirmarPagamento gera erro quando nenhum cartão foi selecionado', () => {
    const navigate = jest.fn();
    const { result } = renderHook(
      () => ({
        selecionarCartao: useSelecionarCartao(navigate),
        pagamentoStore: usePagamentoStore(),
      }),
      { wrapper: PagamentoWrapper },
    );

    act(() => result.current!.pagamentoStore.setMetodoPagamento('credito'));
    act(() => result.current!.selecionarCartao.confirmarPagamento());

    expect(result.current!.selecionarCartao.erro).toBe('Selecione um cartão para continuar.');
    expect(navigate).not.toHaveBeenCalledWith('processandoPagamento');
  });

  it('selecionarCartao limpa o erro anterior', () => {
    const navigate = jest.fn();
    const { result } = renderHook(
      () => ({
        selecionarCartao: useSelecionarCartao(navigate),
        pagamentoStore: usePagamentoStore(),
      }),
      { wrapper: PagamentoWrapper },
    );

    act(() => result.current!.pagamentoStore.setMetodoPagamento('credito'));
    act(() => result.current!.selecionarCartao.confirmarPagamento());
    expect(result.current!.selecionarCartao.erro).not.toBeNull();

    act(() => result.current!.selecionarCartao.selecionarCartao(1));
    expect(result.current!.selecionarCartao.erro).toBeNull();
  });

  it('confirmarPagamento salva o cartão escolhido no PagamentoContext e navega', () => {
    const navigate = jest.fn();
    const { result } = renderHook(
      () => ({
        selecionarCartao: useSelecionarCartao(navigate),
        pagamentoStore: usePagamentoStore(),
      }),
      { wrapper: PagamentoWrapper },
    );

    act(() => result.current!.pagamentoStore.setMetodoPagamento('credito'));
    act(() => result.current!.selecionarCartao.selecionarCartao(1));
    act(() => result.current!.selecionarCartao.confirmarPagamento());

    expect(navigate).toHaveBeenCalledWith('processandoPagamento');
    expect(result.current!.pagamentoStore.cartao).toEqual({
      id: '1',
      bandeira: 'Visa',
      ultimosDigitos: '1234',
    });
  });

  it('adicionarNovoCartao navega para o cadastro correto conforme o método', () => {
    const navigate = jest.fn();
    const { result } = renderHook(
      () => ({
        selecionarCartao: useSelecionarCartao(navigate),
        pagamentoStore: usePagamentoStore(),
      }),
      { wrapper: PagamentoWrapper },
    );

    act(() => result.current!.pagamentoStore.setMetodoPagamento('debito'));
    act(() => result.current!.selecionarCartao.adicionarNovoCartao());

    expect(navigate).toHaveBeenCalledWith('adicionarCartaoDebito');
  });
});
