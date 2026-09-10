import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '../../../components/Header';
import CabecalhoPagina from '../../../components/CabecalhoPagina/CabecalhoPagina';
import ResumoPedido from '../../../components/Carrinho/Resumo/ResumoPedido/ResumoPedido.index';
import { PagamentoPixCard } from '../../../components/Pagamento/PagamentoPixCard';

import { usePagamentoPix } from '../../../hooks/Pagamento/usePagamentoPix';

import { styles } from './styles';

interface PagamentoPixProps {
  navigate: (route: string) => void;
}

export default function PagamentoPix({ navigate }: PagamentoPixProps) {
  const {
    total,
    metodoValido,
    codigoPix,
    copiado,
    copiarCodigo,
    prazoPagamento,
    tempoRestanteSegundos,
    gerarNovoCodigo,
    confirmarPagamento,
  } = usePagamentoPix(navigate);

  // Método de pagamento ausente/inválido: o hook já disparou o redirecionamento para o Carrinho.
  if (!metodoValido) return null;

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <Header />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <CabecalhoPagina
          titulo="Pagamento com PIX"
          subtitulo="Escaneie o QR Code ou copie o código para pagar."
        />

        <PagamentoPixCard
          codigoPix={codigoPix}
          copiado={copiado}
          onCopiarCodigo={copiarCodigo}
          expirado={!!prazoPagamento.expirado}
          onGerarNovoQrCode={gerarNovoCodigo}
        />

        <ResumoPedido
          variant="pagamento"
          total={total}
          prazoPagamento={prazoPagamento}
          tempoRestanteSegundos={tempoRestanteSegundos}
          ctaLabel="Já efetuei o pagamento"
          onCtaClick={confirmarPagamento}
          ctaDisabled={!!prazoPagamento.expirado}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
