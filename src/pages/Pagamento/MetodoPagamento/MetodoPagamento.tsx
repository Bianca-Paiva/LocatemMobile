import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '../../../components/Header';
import CabecalhoPagina from '../../../components/CabecalhoPagina/CabecalhoPagina';
import { SeletorFormaPagamento } from '../../../components/Pagamento/SeletorFormaPagamento';
import ResumoPedido from '../../../components/Carrinho/Resumo/ResumoPedido';

import { useMetodoPagamento } from '../../../hooks/Pagamento/useMetodoPagamento';

import { styles } from './styles';

/* ============================================================
  Fluxo: Carrinho -> Método de Pagamento -> Selecionar Cartão (crédito/débito) ou Pix
============================================================ */

interface MetodoPagamentoProps {
  navigate: (route: string) => void;
}

export default function MetodoPagamento({ navigate }: MetodoPagamentoProps) {
  const { total, formaSelecionada, selecionarForma, continuarPagamento } = useMetodoPagamento(navigate);

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <Header />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <CabecalhoPagina titulo="Escolha como Pagar" />

        <SeletorFormaPagamento selecionado={formaSelecionada} onSelecionar={selecionarForma} />

        <ResumoPedido
          variant="metodoPagamento"
          total={total}
          ctaLabel="Continuar Pagamento"
          onCtaClick={continuarPagamento}
          ctaDisabled={!formaSelecionada}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
