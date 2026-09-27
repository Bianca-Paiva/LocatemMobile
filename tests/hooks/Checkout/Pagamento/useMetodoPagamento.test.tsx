import { act } from 'react-test-renderer';
import { renderHook } from '../../../testUtils/renderHook';
import { PagamentoWrapper } from '../../../testUtils/PagamentoWrapper';
import { useMetodoPagamento } from '../../../../src/hooks/Checkout/Pagamento/useMetodoPagamento';
import { usePagamentoStore } from '../../../../src/hooks/Checkout/Pagamento/usePagamentoStore';

function setup(navigate = jest.fn()) {
  const rendered = renderHook(
    () => ({
      metodoPagamento: useMetodoPagamento(navigate),
      pagamentoStore: usePagamentoStore(),
    }),
    { wrapper: PagamentoWrapper },
  );
  return { ...rendered, navigate };
}

describe('useMetodoPagamento', () => {
  it('inicia sem forma selecionada e total igual ao valor do PagamentoContext', () => {
    const { result } = setup();
    expect(result.current!.metodoPagamento.formaSelecionada).toBeNull();
    expect(result.current!.metodoPagamento.total).toBe(0);
  });

  it('reflete o valor definido no PagamentoContext', () => {
    const { result } = setup();

    act(() => result.current!.pagamentoStore.setValorPagamento(199.9));

    expect(result.current!.metodoPagamento.total).toBe(199.9);
  });

  it('selecionarForma apenas marca a forma, sem navegar', () => {
    const { result, navigate } = setup();

    act(() => result.current!.metodoPagamento.selecionarForma('pix'));

    expect(result.current!.metodoPagamento.formaSelecionada).toBe('pix');
    expect(navigate).not.toHaveBeenCalled();
  });

  it('continuarPagamento não faz nada quando nenhuma forma foi selecionada', () => {
    const { result, navigate } = setup();

    act(() => result.current!.metodoPagamento.continuarPagamento());

    expect(navigate).not.toHaveBeenCalled();
  });

  it('continuarPagamento navega para "selecionarCartao" quando a forma é crédito', () => {
    const { result, navigate } = setup();

    act(() => result.current!.metodoPagamento.selecionarForma('credito'));
    act(() => result.current!.metodoPagamento.continuarPagamento());

    expect(navigate).toHaveBeenCalledWith('selecionarCartao');
  });

  it('continuarPagamento navega para "selecionarCartao" quando a forma é débito', () => {
    const { result, navigate } = setup();

    act(() => result.current!.metodoPagamento.selecionarForma('debito'));
    act(() => result.current!.metodoPagamento.continuarPagamento());

    expect(navigate).toHaveBeenCalledWith('selecionarCartao');
  });

  it('continuarPagamento navega para "pagamentoPix" quando a forma é pix', () => {
    const { result, navigate } = setup();

    act(() => result.current!.metodoPagamento.selecionarForma('pix'));
    act(() => result.current!.metodoPagamento.continuarPagamento());

    expect(navigate).toHaveBeenCalledWith('pagamentoPix');
  });

  it('guarda a forma escolhida no PagamentoContext ao continuar', () => {
    const { result } = setup();

    act(() => result.current!.metodoPagamento.selecionarForma('credito'));
    act(() => result.current!.metodoPagamento.continuarPagamento());

    expect(result.current!.pagamentoStore.metodo).toBe('credito');
  });
});
