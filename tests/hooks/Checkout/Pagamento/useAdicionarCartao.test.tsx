import { act } from 'react-test-renderer';
import { renderHook } from '../../../testUtils/renderHook';
import { PagamentoWrapper } from '../../../testUtils/PagamentoWrapper';
import { useAdicionarCartao, PARCELAS_PADRAO } from '../../../../src/hooks/Checkout/Pagamento/useAdicionarCartao';
import { usePagamentoStore } from '../../../../src/hooks/Checkout/Pagamento/usePagamentoStore';

function setup(metodo: 'credito' | 'debito' = 'credito', navigate = jest.fn()) {
  const rendered = renderHook(
    () => ({
      adicionarCartao: useAdicionarCartao(metodo, navigate),
      pagamentoStore: usePagamentoStore(),
    }),
    { wrapper: PagamentoWrapper },
  );
  return { ...rendered, navigate };
}

describe('useAdicionarCartao', () => {
  it('inicia com os dados vazios e a primeira opção de parcelamento', () => {
    const { result } = setup();

    expect(result.current!.adicionarCartao.dados.numero).toBe('');
    expect(result.current!.adicionarCartao.dados.parcelamento).toBe(PARCELAS_PADRAO[0]);
    expect(result.current!.adicionarCartao.dados.salvarCartao).toBe(true);
    expect(result.current!.adicionarCartao.bandeira).toBe('');
  });

  describe('onNumeroChange', () => {
    it('aplica a máscara e detecta a bandeira automaticamente', () => {
      const { result } = setup();

      act(() => result.current!.adicionarCartao.onNumeroChange('4111111111111111'));

      expect(result.current!.adicionarCartao.dados.numero).toBe('4111 1111 1111 1111');
      expect(result.current!.adicionarCartao.bandeira).toBe('VISA');
    });

    it('limpa o erro do campo número ao digitar novamente', () => {
      const { result } = setup();

      act(() => result.current!.adicionarCartao.confirmar()); // gera erros de validação
      expect(result.current!.adicionarCartao.erros.numero).toBeDefined();

      act(() => result.current!.adicionarCartao.onNumeroChange('4111'));

      expect(result.current!.adicionarCartao.erros.numero).toBeUndefined();
    });
  });

  describe('onNomeTitularChange', () => {
    it('permite apenas letras e espaços e converte para maiúsculo', () => {
      const { result } = setup();

      act(() => result.current!.adicionarCartao.onNomeTitularChange('joão123 silva!!'));

      expect(result.current!.adicionarCartao.dados.nomeTitular).toBe('JOÃO SILVA');
    });

    it('limita o nome a 40 caracteres', () => {
      const { result } = setup();
      const nomeLongo = 'A'.repeat(60);

      act(() => result.current!.adicionarCartao.onNomeTitularChange(nomeLongo));

      expect(result.current!.adicionarCartao.dados.nomeTitular).toHaveLength(40);
    });
  });

  describe('onValidadeChange / onValidadeBlur', () => {
    it('aplica a máscara MM/AA', () => {
      const { result } = setup();

      act(() => result.current!.adicionarCartao.onValidadeChange('1230'));

      expect(result.current!.adicionarCartao.dados.validade).toBe('12/30');
    });

    it('onValidadeBlur limpa o campo e seta erro quando a validade é inválida', () => {
      const { result } = setup();

      act(() => result.current!.adicionarCartao.onValidadeChange('0120')); // mês 01, ano 20 (vencido)
      act(() => result.current!.adicionarCartao.onValidadeBlur());

      expect(result.current!.adicionarCartao.dados.validade).toBe('');
      expect(result.current!.adicionarCartao.erros.validade).toBe('Informe a validade no formato MM/AA.');
    });

    it('onValidadeBlur não faz nada quando a validade ainda está incompleta', () => {
      const { result } = setup();

      act(() => result.current!.adicionarCartao.onValidadeChange('12'));
      act(() => result.current!.adicionarCartao.onValidadeBlur());

      expect(result.current!.adicionarCartao.dados.validade).toBe('12');
      expect(result.current!.adicionarCartao.erros.validade).toBeUndefined();
    });

    it('onValidadeBlur não altera nada quando a validade é válida', () => {
      const { result } = setup();

      act(() => result.current!.adicionarCartao.onValidadeChange('1230'));
      act(() => result.current!.adicionarCartao.onValidadeBlur());

      expect(result.current!.adicionarCartao.dados.validade).toBe('12/30');
      expect(result.current!.adicionarCartao.erros.validade).toBeUndefined();
    });
  });

  describe('onCvvChange', () => {
    it('mantém apenas números e limita a 3 dígitos', () => {
      const { result } = setup();

      act(() => result.current!.adicionarCartao.onCvvChange('12a34'));

      expect(result.current!.adicionarCartao.dados.cvv).toBe('123');
    });
  });

  describe('onParcelamentoChange / onSalvarCartaoChange', () => {
    it('atualiza o parcelamento escolhido', () => {
      const { result } = setup();

      act(() => result.current!.adicionarCartao.onParcelamentoChange('3x sem juros'));

      expect(result.current!.adicionarCartao.dados.parcelamento).toBe('3x sem juros');
    });

    it('atualiza a flag de salvar cartão', () => {
      const { result } = setup();

      act(() => result.current!.adicionarCartao.onSalvarCartaoChange(false));

      expect(result.current!.adicionarCartao.dados.salvarCartao).toBe(false);
    });
  });

  describe('validarTudo (via confirmar)', () => {
    it('acumula erros para todos os campos inválidos/incompletos', () => {
      const { result } = setup();

      act(() => result.current!.adicionarCartao.confirmar());

      expect(result.current!.adicionarCartao.erros.numero).toBe('Confira o número do cartão.');
      expect(result.current!.adicionarCartao.erros.nomeTitular).toBe('Digite o nome como aparece no cartão.');
      expect(result.current!.adicionarCartao.erros.validade).toBe('Informe a validade no formato MM/AA.');
      expect(result.current!.adicionarCartao.erros.cvv).toBe('Informe o código de segurança.');
    });

    it('não entra em processamento quando há erros de validação', () => {
      const { result } = setup();

      act(() => result.current!.adicionarCartao.confirmar());

      expect(result.current!.adicionarCartao.processando).toBe(false);
    });
  });

  describe('confirmar (fluxo completo)', () => {
    function preencherCartaoValido(result: any) {
      act(() => {
        result.current.adicionarCartao.onNumeroChange('4111111111111111');
        result.current.adicionarCartao.onNomeTitularChange('JOAO SILVA');
        result.current.adicionarCartao.onValidadeChange('1230');
        result.current.adicionarCartao.onCvvChange('123');
      });
    }

    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('entra em processamento e navega para "selecionarCartao" após 1.5s', () => {
      const { result, navigate } = setup();
      preencherCartaoValido(result);

      act(() => result.current!.adicionarCartao.confirmar());
      expect(result.current!.adicionarCartao.processando).toBe(true);
      expect(navigate).not.toHaveBeenCalled();

      act(() => jest.advanceTimersByTime(1500));

      expect(navigate).toHaveBeenCalledWith('selecionarCartao');
    });

    it('salva o cartão na lista quando "salvarCartao" é true (padrão)', () => {
      const { result } = setup('credito');
      preencherCartaoValido(result);

      act(() => result.current!.adicionarCartao.confirmar());
      act(() => jest.advanceTimersByTime(1500));

      expect(result.current!.pagamentoStore.cartoesSalvos.some((c) => c.final === '1111')).toBe(true);
    });

    it('não salva o cartão quando "salvarCartao" é false', () => {
      const { result } = setup('credito');
      preencherCartaoValido(result);
      act(() => result.current!.adicionarCartao.onSalvarCartaoChange(false));

      const totalAntes = result.current!.pagamentoStore.cartoesSalvos.length;

      act(() => result.current!.adicionarCartao.confirmar());
      act(() => jest.advanceTimersByTime(1500));

      expect(result.current!.pagamentoStore.cartoesSalvos).toHaveLength(totalAntes);
    });

    it('não faz nada ao chamar confirmar de novo enquanto já está processando', () => {
      const { result, navigate } = setup();
      preencherCartaoValido(result);

      act(() => result.current!.adicionarCartao.confirmar());
      act(() => result.current!.adicionarCartao.confirmar()); // segunda chamada, deve ser ignorada
      act(() => jest.advanceTimersByTime(1500));

      expect(navigate).toHaveBeenCalledTimes(1);
    });
  });
});
