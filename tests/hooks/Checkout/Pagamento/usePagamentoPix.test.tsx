import { act } from 'react-test-renderer';
import { renderHook } from '../../../testUtils/renderHook';
import { PagamentoWrapper } from '../../../testUtils/PagamentoWrapper';

jest.mock('expo-clipboard', () => ({
  setStringAsync: jest.fn(() => Promise.resolve(true)),
}));

import * as Clipboard from 'expo-clipboard';
import { usePagamentoPix } from '../../../../src/hooks/Checkout/Pagamento/usePagamentoPix';
import { usePagamentoStore } from '../../../../src/hooks/Checkout/Pagamento/usePagamentoStore';

beforeEach(() => {
  jest.useFakeTimers();
  jest.clearAllMocks();
});

afterEach(() => {
  jest.useRealTimers();
});

/**
 * Renderiza usePagamentoStore + usePagamentoPix dentro do MESMO
 * PagamentoProvider e já ativa o método "pix" (estado válido), para que os
 * testes de fluxo não precisem repetir esse setup.
 */
function setupPixValido(navigate = jest.fn(), valor = 150) {
  const rendered = renderHook(
    () => ({
      pagamentoStore: usePagamentoStore(),
      pix: usePagamentoPix(navigate),
    }),
    { wrapper: PagamentoWrapper },
  );

  act(() => {
    rendered.result.current!.pagamentoStore.setValorPagamento(valor);
    rendered.result.current!.pagamentoStore.setMetodoPagamento('pix');
  });

  return { ...rendered, navigate };
}

describe('usePagamentoPix', () => {
  it('redireciona para "carrinho" e marca metodoValido=false quando o método ainda não é pix', () => {
    const navigate = jest.fn();
    const { result } = renderHook(
      () => ({ pagamentoStore: usePagamentoStore(), pix: usePagamentoPix(navigate) }),
      { wrapper: PagamentoWrapper },
    );

    expect(result.current!.pix.metodoValido).toBe(false);
    expect(navigate).toHaveBeenCalledWith('carrinho');
  });

  it('redireciona para "carrinho" quando o método é crédito/débito (não é pix)', () => {
    const navigate = jest.fn();
    const { result } = renderHook(
      () => ({ pagamentoStore: usePagamentoStore(), pix: usePagamentoPix(navigate) }),
      { wrapper: PagamentoWrapper },
    );

    act(() => result.current!.pagamentoStore.setMetodoPagamento('credito'));

    expect(result.current!.pix.metodoValido).toBe(false);
  });

  it('não bloqueia e expõe o total do PagamentoContext quando o método é pix', () => {
    const { result, navigate } = setupPixValido(undefined, 150);

    expect(result.current!.pix.metodoValido).toBe(true);
    expect(result.current!.pix.total).toBe(150);
  });

  it('gera um código pix não vazio e inicia o cronômetro em 15 minutos (900s)', () => {
    const { result } = setupPixValido();

    expect(result.current!.pix.codigoPix.length).toBeGreaterThan(0);
    expect(result.current!.pix.tempoRestanteSegundos).toBe(15 * 60);
    expect(result.current!.pix.prazoPagamento.expirado).toBe(false);
  });

  it('copiarCodigo chama o clipboard e alterna "copiado" por 3 segundos', async () => {
    const { result } = setupPixValido();

    await act(async () => {
      result.current!.pix.copiarCodigo();
      await Promise.resolve();
    });

    expect(Clipboard.setStringAsync).toHaveBeenCalledWith(result.current!.pix.codigoPix);
    expect(result.current!.pix.copiado).toBe(true);

    await act(async () => {
      jest.advanceTimersByTime(3000);
      await Promise.resolve();
    });

    expect(result.current!.pix.copiado).toBe(false);
  });

  it('tempoRestanteSegundos decresce a cada segundo', () => {
    const { result } = setupPixValido();
    const tempoInicial = result.current!.pix.tempoRestanteSegundos;

    act(() => jest.advanceTimersByTime(1000));

    expect(result.current!.pix.tempoRestanteSegundos).toBe(tempoInicial - 1);
  });

  it('gerarNovoCodigo reinicia o cronômetro para 900s e gera outro código', () => {
    const { result } = setupPixValido();

    act(() => jest.advanceTimersByTime(5000));
    const codigoAntigo = result.current!.pix.codigoPix;

    act(() => result.current!.pix.gerarNovoCodigo());

    expect(result.current!.pix.tempoRestanteSegundos).toBe(15 * 60);
    expect(result.current!.pix.codigoPix).not.toBe(codigoAntigo);
  });

  it('marca prazoPagamento.expirado quando o tempo chega a zero', () => {
    const { result } = setupPixValido();

    act(() => jest.advanceTimersByTime(15 * 60 * 1000 + 1000));

    expect(result.current!.pix.tempoRestanteSegundos).toBe(0);
    expect(result.current!.pix.prazoPagamento.expirado).toBe(true);
  });

  it('o cronômetro nunca fica negativo mesmo avançando bem além do prazo', () => {
    const { result } = setupPixValido();

    act(() => jest.advanceTimersByTime(60 * 60 * 1000));

    expect(result.current!.pix.tempoRestanteSegundos).toBe(0);
  });

  it('confirmarPagamento navega para "processandoPagamento" quando ainda não expirou', () => {
    const { result, navigate } = setupPixValido();

    act(() => result.current!.pix.confirmarPagamento());

    expect(navigate).toHaveBeenCalledWith('processandoPagamento');
  });

  it('confirmarPagamento não navega quando o código já expirou', () => {
    const { result, navigate } = setupPixValido();

    act(() => jest.advanceTimersByTime(15 * 60 * 1000 + 1000));
    navigate.mockClear();

    act(() => result.current!.pix.confirmarPagamento());

    expect(navigate).not.toHaveBeenCalledWith('processandoPagamento');
  });
});
