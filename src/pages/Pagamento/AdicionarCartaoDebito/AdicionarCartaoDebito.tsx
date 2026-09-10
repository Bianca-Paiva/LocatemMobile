import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '../../../components/Header';
import CabecalhoPagina from '../../../components/CabecalhoPagina/CabecalhoPagina';
import ResumoPedido from '../../../components/Carrinho/Resumo/ResumoPedido';
import { AdicionarCartaoForm } from '../../../components/Pagamento/AdicionarCartaoForm';

import { useAdicionarCartao } from '../../../hooks/Pagamento/useAdicionarCartao';

import { styles } from './styles';

interface AdicionarCartaoDebitoProps {
  navigate: (route: string) => void;
}

export default function AdicionarCartaoDebito({ navigate }: AdicionarCartaoDebitoProps) {
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
    onSalvarCartaoChange,
    confirmar,
  } = useAdicionarCartao('debito', navigate);

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <Header />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <CabecalhoPagina
          titulo="Pagamento com Cartão de Débito"
          subtitulo="Insira os dados do seu cartão para continuar o pagamento."
        />

        <AdicionarCartaoForm
          dados={dados}
          bandeira={bandeira}
          erros={erros}
          onNumeroChange={onNumeroChange}
          onNomeTitularChange={onNomeTitularChange}
          onValidadeChange={onValidadeChange}
          onValidadeBlur={onValidadeBlur}
          onCvvChange={onCvvChange}
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
