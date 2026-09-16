import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '../../../../components/Layout/Header';
import CabecalhoPagina from '../../../../components/Layout/CabecalhoPagina/CabecalhoPagina';
import ResumoPedido from '../../../../components/Checkout/Carrinho/Resumo/ResumoPedido/ResumoPedido.index';
import { AdicionarCartaoForm } from '../../../../components/Checkout/Pagamento/AdicionarCartaoForm';

import { useAdicionarCartao } from '../../../../hooks/Checkout/Pagamento/useAdicionarCartao';

import { styles } from './styles';

interface AdicionarCartaoCreditoProps {
  navigate: (route: string) => void;
}

export default function AdicionarCartaoCredito({ navigate }: AdicionarCartaoCreditoProps) {
  const {
    valor,
    dados,
    bandeira,
    erros,
    processando,
    onNumeroChange,
    onNomeTitularChange,
    onValidadeChange,
    onValidadeBlur,
    onCvvChange,
    onParcelamentoChange,
    onSalvarCartaoChange,
    confirmar,
  } = useAdicionarCartao('credito', navigate);

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <Header />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <CabecalhoPagina
          titulo="Pagamento com Cartão de Crédito"
          subtitulo="Insira os dados do seu cartão para continuar o pagamento."
        />

        <AdicionarCartaoForm
          dados={dados}
          bandeira={bandeira}
          erros={erros}
          mostrarParcelamento
          onNumeroChange={onNumeroChange}
          onNomeTitularChange={onNomeTitularChange}
          onValidadeChange={onValidadeChange}
          onValidadeBlur={onValidadeBlur}
          onCvvChange={onCvvChange}
          onParcelamentoChange={onParcelamentoChange}
          onSalvarCartaoChange={onSalvarCartaoChange}
        />

        <ResumoPedido
          variant="pagamento"
          total={valor}
          ctaLabel={processando ? 'Processando pagamento...' : 'Continuar Pagamento'}
          onCtaClick={confirmar}
          ctaDisabled={processando}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
