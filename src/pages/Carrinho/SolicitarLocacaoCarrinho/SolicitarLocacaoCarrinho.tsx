import { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import type { RootStackParamList } from '../../../routes/AppRoutes';
import type { Produto } from '../../../types/produto.types';

import Header from '../../../components/Header';
import CabecalhoPagina from '../../../components/CabecalhoPagina/CabecalhoPagina';
import ProdutoResumoCard from '../../../components/SolicitarReserva/ProdutoResumoCard/ProdutoResumoCard';
import CampoData from '../../../components/SolicitarReserva/CampoData/CampoData';
import HorarioDropdown from '../../../components/SolicitarReserva/HorarioDropdown/HorarioDropdown';
import SeletorQuantidade from '../../../components/Inputs/SeletorQuantidade/SeletorQuantidade';

import { useProdutoStore } from '../../../hooks/useProdutoStore';
import { useCarrinhoStore } from '../../../hooks/useCarrinhoStore';
import { useSolicitarLocacaoCarrinho } from '../../../hooks/Carrinho/useSolicitarLocacaoCarrinho';

import { styles } from './SolicitarLocacaoCarrinho.styles';

/**
 * Tela "Detalhes da Locação".
 * Permite definir período, horários e quantidade antes de adicionar
 * o produto ao carrinho.
 */
const PRODUTO_VAZIO: Produto = {
  id: 0,
  title: '',
  marca: '',
  price: '0',

  images: [],

  // Imagens padrão usadas quando um produto válido não está disponível.
  imageVerificado: require('../../../../assets/images/verificadoAzul.png'),
  imageNota: require('../../../../assets/images/StarFullYellow.png'),

  rating: 0,
  reviewCount: 0,

  locador: '',
  localizacao: '',
  categoria: '',

  estoqueDisponivel: 1,

  paymentMethods: [],

  available: false,
};

export default function SolicitarLocacaoCarrinho() {
  // Controla a navegação entre as telas.
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // Recupera os parâmetros enviados para esta tela.
  const route = useRoute<RouteProp<RootStackParamList, 'SolicitarLocacaoCarrinho'>>();

  // Recupera o produto selecionado e a função para adicionar ao carrinho.
  const { produtoSelecionado } = useProdutoStore();
  const { adicionarItem } = useCarrinhoStore();

  // Se nenhum produto estiver selecionado, retorna o usuário para a Home.
  useEffect(() => {
    if (!produtoSelecionado) {
      navigation.navigate('HomeScreen');
    }
  }, [produtoSelecionado, navigation]);

  // Usa o produto selecionado ou um objeto vazio como fallback.
  const produto = produtoSelecionado ?? PRODUTO_VAZIO;

  // Recupera os valores iniciais enviados pela tela anterior.
  const {
    quantidadeInicial,
    diariasInicial = null,
    tensaoInicial = null,
  } = route.params ?? {};

  // Hook responsável pelo formulário e pelos cálculos da locação.
  const {
    form,
    setCampo,
    handleDataEntregaChange,
    decrementarQuantidade,
    incrementarQuantidade,
    resumo,
    montarDadosLocacao,
    dataMinimaEntrega,
    dataMinimaDevolucao,
  } = useSolicitarLocacaoCarrinho({
    produto,
    quantidadeInicial,
    duracaoInicial: diariasInicial,
  });

  // Controla se algum dos dropdowns de horário está aberto, para travar o
  // scroll da tela enquanto o menu de opções estiver visível — mesmo padrão
  // usado no TempoDropdown da tela de produto.
  const [horarioEntregaAberto, setHorarioEntregaAberto] = useState(false);
  const [horarioDevolucaoAberto, setHorarioDevolucaoAberto] = useState(false);
  const scrollHabilitado = !horarioEntregaAberto && !horarioDevolucaoAberto;

  // Evita renderizar a tela enquanto não houver produto selecionado.
  if (!produtoSelecionado) {
    return null;
  }

  // Cancela a operação e retorna para a tela anterior.
  const handleCancelar = () => {
    navigation.goBack();
  };

  // Valida o formulário e adiciona o produto ao carrinho.
  const handleConfirmar = () => {
    // Impede a ação enquanto os dados obrigatórios não estiverem completos.
    if (!resumo.formularioCompleto) return;

    // Monta os dados finais da locação.
    const dados = montarDadosLocacao();

    // Adiciona somente o produto, quantidade e diárias ao carrinho.
    adicionarItem(produto, dados.quantidade, dados.resumo.diarias);

    // Retorna para a tela anterior após adicionar o item.
    navigation.navigate('CarrinhoScreen');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <Header />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        // Impede a tela de rolar enquanto um dropdown de horário está aberto,
        // igual ao comportamento do TempoDropdown na tela de produto.
        scrollEnabled={scrollHabilitado}
      >
        <CabecalhoPagina titulo="Detalhes da Locação" />

        {/* Exibe as principais informações do produto selecionado. */}
        <ProdutoResumoCard produto={produto} />

        {/* Mostra o aviso quando a aprovação da locação é manual. */}
        {produto.tipoAprovacao === 'manual' && (
          <Text style={styles.avisoAprovacao}>
            Este locador aprova manualmente as solicitações — ele tem até 24h para
            responder, por isso a primeira retirada disponível já considera esse prazo.
          </Text>
        )}

        <View style={styles.bloco}>
          <Text style={styles.blocoTitulo}>Entrega e devolução</Text>

          <View style={styles.gridCampos}>
            {/* Campo para selecionar a data de entrega. */}
            <CampoData
              label="Data de entrega"
              value={form.dataEntrega}
              onChange={handleDataEntregaChange}
              min={dataMinimaEntrega}
              diasIndisponiveis={produto.diasIndisponiveis}
              dataEntrega={form.dataEntrega}
              dataDevolucao={form.dataDevolucao}
              required
            />

            {/* Campo para selecionar o horário de entrega. */}
            <HorarioDropdown
              label="Horário de entrega"
              value={form.horarioEntrega}
              onChange={(valor) => setCampo('horarioEntrega', valor)}
              onOpenChange={setHorarioEntregaAberto}
              required
            />

            {/* Campo para selecionar a data de devolução. */}
            <CampoData
              label="Data de devolução"
              value={form.dataDevolucao}
              onChange={(valor) => setCampo('dataDevolucao', valor)}
              min={dataMinimaDevolucao}
              diasIndisponiveis={produto.diasIndisponiveis}
              dataEntrega={form.dataEntrega}
              dataDevolucao={form.dataDevolucao}
              required
            />

            {/* Campo para selecionar o horário de devolução. */}
            <HorarioDropdown
              label="Horário de devolução"
              value={form.horarioDevolucao}
              onChange={(valor) => setCampo('horarioDevolucao', valor)}
              onOpenChange={setHorarioDevolucaoAberto}
              required
            />

            {/* Controla a quantidade de itens da locação. */}
            <SeletorQuantidade
              quantidade={form.quantidade}
              estoqueDisponivel={produto.estoqueDisponivel}
              onDecrementar={decrementarQuantidade}
              onIncrementar={incrementarQuantidade}
            />
          </View>

          {/* Informa quando o período selecionado é inválido. */}
          {!resumo.periodoValido && form.dataEntrega && form.dataDevolucao && (
            <Text style={styles.erroPeriodo}>
              A data de devolução deve ser posterior à data de retirada.
            </Text>
          )}
        </View>

        <View style={styles.resumo}>
          <Text style={styles.blocoTitulo}>Resumo da locação</Text>

          {/* Exibe o período e a quantidade de diárias. */}
          <View style={styles.linhaResumo}>
            <Text style={styles.linhaResumoLabel}>Período</Text>
            <Text style={styles.linhaResumoValor}>
              {resumo.periodoValido
                ? `${resumo.dataEntregaFormatada} - ${resumo.dataDevolucaoFormatada} (${resumo.diarias} ${resumo.diarias === 1 ? 'diária' : 'diárias'})`
                : 'Selecione um período válido'}
            </Text>
          </View>

          {/* Exibe a quantidade selecionada. */}
          <View style={styles.linhaResumo}>
            <Text style={styles.linhaResumoLabel}>Quantidade</Text>
            <Text style={styles.linhaResumoValor}>{resumo.quantidadeFormatada}</Text>
          </View>

          {/* Exibe a tensão/alimentação quando informada. */}
          {!!tensaoInicial && (
            <View style={styles.linhaResumo}>
              <Text style={styles.linhaResumoLabel}>Voltagem/alimentação</Text>
              <Text style={styles.linhaResumoValor}>{tensaoInicial}</Text>
            </View>
          )}

          {/* Exibe o valor calculado do aluguel. */}
          <View style={styles.linhaResumo}>
            <Text style={styles.linhaResumoLabel}>Aluguel</Text>
            <Text style={styles.linhaResumoValor}>{resumo.aluguelFormatado}</Text>
          </View>

          {/* Exibe o valor estimado do frete. */}
          <View style={styles.linhaResumo}>
            <Text style={styles.linhaResumoLabel}>Frete estimado</Text>
            <Text style={styles.linhaResumoValor}>{resumo.freteFormatado}</Text>
          </View>

          {/* Destaca o valor total estimado da locação. */}
          <View style={styles.linhaResumoDestaque}>
            <Text style={styles.linhaResumoDestaqueLabel}>Valor estimado</Text>
            <Text style={styles.linhaResumoDestaqueValor}>{resumo.valorFormatado}</Text>
          </View>
        </View>

        <View style={styles.acoes}>
          {/* Cancela a operação e volta para a tela anterior. */}
          <Pressable style={styles.botaoSecundario} onPress={handleCancelar}>
            <Text style={styles.botaoTextoSecundario}>Cancelar</Text>
          </Pressable>

          {/* Botão fica desabilitado enquanto o formulário estiver incompleto. */}
          <Pressable
            style={[styles.botaoPrimario, !resumo.formularioCompleto && styles.botaoDesabilitado]}
            onPress={handleConfirmar}
            disabled={!resumo.formularioCompleto}
          >
            <Text style={styles.botaoTexto}>Continuar para pagamento</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}