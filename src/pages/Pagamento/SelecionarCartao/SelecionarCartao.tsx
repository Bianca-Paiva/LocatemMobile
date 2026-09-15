import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Plus } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '../../../components/Header';
import CabecalhoPagina from '../../../components/CabecalhoPagina/CabecalhoPagina';
import { CartaoSelecionavel } from '../../../components/Pagamento/CartaoSelecionavel';
import BtnPrincipal from '../../../components/BtnPrincipal';

import { useSelecionarCartao } from '../../../hooks/Pagamento/useSelecionarCartao';
import colors from '../../../theme/colors';

import { styles } from './styles';

interface SelecionarCartaoProps {
  navigate: (route: string) => void;
}

export default function SelecionarCartao({ navigate }: SelecionarCartaoProps) {
  const {
    metodoPagamento,
    titulo,
    cartoesFiltrados,
    cartaoSelecionadoId,
    selecionarCartao,
    adicionarNovoCartao,
    confirmarPagamento,
    erro,
  } = useSelecionarCartao(navigate);

  // Método de pagamento ausente/inválido: o hook já disparou o redirecionamento para o Carrinho, então não há nada útil para renderizar aqui.
  if (!metodoPagamento) return null;

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <Header />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <CabecalhoPagina
          titulo={titulo}
          subtitulo="Escolha o cartão que deseja utilizar para realizar o pagamento."
        />

        <View style={styles.listaCartoes}>
          {cartoesFiltrados.length === 0 ? (
            <Text style={styles.listaVazia}>Nenhum cartão disponível para esta forma de pagamento.</Text>
          ) : (
            cartoesFiltrados.map((cartao) => (
              <CartaoSelecionavel
                key={cartao.id}
                cartao={cartao}
                selecionado={cartao.id === cartaoSelecionadoId}
                onSelecionar={selecionarCartao}
              />
            ))
          )}
        </View>

        <TouchableOpacity style={styles.btnAdicionar} onPress={adicionarNovoCartao}>
          <View style={styles.iconeAdd}>
            <Plus size={20} color={colors.textDark} />
          </View>
          <Text style={styles.btnAdicionarTexto}>Adicionar novo cartão</Text>
        </TouchableOpacity>

        {erro && <Text style={styles.erro}>{erro}</Text>}

        <BtnPrincipal title="Usar este cartão" onPress={confirmarPagamento} />
      </ScrollView>
    </SafeAreaView>
  );
}
