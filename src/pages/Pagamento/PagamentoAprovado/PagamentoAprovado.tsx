import { Image, ScrollView, Text, View } from 'react-native';
import { Calendar, CheckCircle2, CreditCard, Info, QrCode } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BtnPrincipal from '../../../components/BtnPrincipal';

import { usePagamentoAprovado } from '../../../hooks/Pagamento/usePagamentoAprovado';
import colors from '../../../theme/colors';

import { styles } from './styles';

/* ============================================================
  Fluxo: Processando Pagamento -> Pagamento Aprovado
============================================================ */

interface PagamentoAprovadoProps {
  navigate: (route: string) => void;
}

const formatarPreco = (valor: number) => `R$ ${valor.toFixed(2).replace('.', ',')}`;

export default function PagamentoAprovado({ navigate }: PagamentoAprovadoProps) {
  const { acessoValido, total, metodo, metodoFormatado, dataHora, produtos, verDetalhesDoAluguel, voltarParaInicio } =
    usePagamentoAprovado(navigate);

  // Acesso direto/indevido (sem passar por "Processando Pagamento"): o hook já disparou o redirecionamento para o Carrinho, então não há nada útil para renderizar aqui.
  if (!acessoValido) return null;

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={styles.successIcon}>
            <CheckCircle2 size={48} color={colors.success} />
          </View>

          <Text style={styles.heroTitle}>Pagamento aprovado com sucesso</Text>
          <Text style={styles.heroSubtitle}>Sua transação foi processada.</Text>
          <Text style={styles.heroPrice}>{formatarPreco(total)}</Text>
        </View>

        <View style={styles.pickupAlert}>
          <Info size={20} color={colors.success} />
          <Text style={styles.pickupAlertTexto}>Seu aluguel será entregue em até 3 horas.</Text>
        </View>

        <View style={styles.resumoCard}>
          <Text style={styles.sectionTitle}>Resumo do pedido</Text>

          <View style={styles.detailsList}>
            <View style={styles.detailRow}>
              <View style={styles.label}>
                {metodo === 'pix' ? (
                  <QrCode size={14} color={colors.textMuted} />
                ) : (
                  <CreditCard size={14} color={colors.textMuted} />
                )}
                <Text style={styles.labelTexto}>Método de pagamento</Text>
              </View>
              <Text style={styles.value}>{metodoFormatado}</Text>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.label}>
                <Calendar size={14} color={colors.textMuted} />
                <Text style={styles.labelTexto}>Data e Hora</Text>
              </View>
              <Text style={styles.value}>{dataHora}</Text>
            </View>
          </View>
        </View>

        {produtos.length > 0 && (
          <View style={styles.produtosSection}>
            <Text style={styles.sectionTitle}>Itens alugados</Text>

            <View style={styles.listaProdutos}>
              {produtos.map((produto) => {
                const labelUnid = produto.unidades === 1 ? 'unidade' : 'unidades';
                const labelDia = produto.dias === 1 ? 'dia' : 'dias';

                return (
                  <View key={produto.id} style={styles.productCard}>
                    <Image source={produto.imagem} style={styles.productImagem} />
                    <View style={styles.productInfo}>
                      <Text style={styles.productNome}>{produto.nome}</Text>
                      <Text style={styles.productDetalhe}>
                        Quantidade: {produto.unidades} {labelUnid} • Locação: {produto.dias} {labelDia}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        )}

        <View style={styles.actions}>
          <BtnPrincipal title="Ver detalhes do aluguel" onPress={verDetalhesDoAluguel} />
          <BtnPrincipal title="Voltar para a página inicial" onPress={voltarParaInicio} variant="secondary" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
