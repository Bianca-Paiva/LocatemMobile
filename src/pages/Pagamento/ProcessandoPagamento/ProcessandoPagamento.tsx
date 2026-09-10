import { ActivityIndicator, Text, View } from 'react-native';
import { Lock } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useProcessandoPagamento } from '../../../hooks/Pagamento/useProcessandoPagamento';
import colors from '../../../theme/colors';

import { styles } from './styles';

/* ============================================================
  Fluxo: Selecionar Cartão / Pix -> Processando Pagamento -> Pagamento Aprovado
============================================================ */

interface ProcessandoPagamentoProps {
  navigate: (route: string) => void;
}

export default function ProcessandoPagamento({ navigate }: ProcessandoPagamentoProps) {
  const { metodoValido } = useProcessandoPagamento(navigate);

  // Método de pagamento ausente/inválido: o hook já disparou o redirecionamento para o Carrinho, então não há nada útil para renderizar aqui.
  if (!metodoValido) return null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.painel}>
        <ActivityIndicator size="large" color={colors.primary} accessibilityLabel="Processando pagamento" />

        <View style={styles.textos}>
          <Text style={styles.titulo}>Processando pagamento...</Text>
          <Text style={styles.subtitulo}>Estamos finalizando sua transação. Por favor, aguarde um momento.</Text>
        </View>

        <View style={styles.seguranca}>
          <Lock size={12} color={colors.textMuted2} />
          <Text style={styles.segurancaTexto}>Conexão segura — não feche esta tela</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
