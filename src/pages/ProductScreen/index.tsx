import React, { useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// ── 1. IMPORTAÇÃO DE COMPONENTES VISUAIS ───────────────────────────
import Header from '../../components/Header';
import {ImagemCarrossel} from './components/ImageCarrosel';
import { ProdutoInfo } from './components/ProdutoInfo';
import { ProdutosSemelhantes } from './components/ProdutoSemelhantes';
import { Descricao } from './components/Descricao';
import { EspecificacoesTecnicas } from './components/EspecificacoesTecnicas';
import { InfoVendedor } from './components/InfoVendedor';
import { AvaliacaoSection } from './components/AvaliacaoSection';
import { Acessorios } from './components/Acessorios';

// ── 2. IMPORTAÇÃO DOS HOOKS GLOBAIS (ZUSTAND) ──────────────────────
import { useProdutoStore } from '../../hooks/useProdutoStore';
import { useReservaStore } from '../../hooks/useReservaStore';
import { useNotificationStore } from '../../hooks/useNotificationStore';
import { useCarrinhoStore } from '../../hooks/useCarrinhoStore';

// ── 3. IMPORTAÇÃO DE MOCKS E UTILITÁRIOS ───────────────────────────
import { getLocadorByNome } from '../../mocks/locadoresMock';
import {
  FALLBACK_PRODUTO,
  MOCK_SEMELHANTES,
  MOCK_ESPECIFICACOES,
} from '../../mocks/productMock';
import { calcularResumoAvaliacoes } from '../../utils/avaliacoesResumo';
import { styles } from './styles';

import type { RootStackParamList } from '../../routes/AppRoutes';

export default function ProductScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const scrollViewRef = useRef<ScrollView>(null); 

  const { produtoSelecionado, setProdutoSelecionado } = useProdutoStore();
  const { adicionarReserva } = useReservaStore();
  const { adicionarNotificacao } = useNotificationStore();
  const { adicionarItem } = useCarrinhoStore();

  const produto = produtoSelecionado ?? FALLBACK_PRODUTO;
  const locador = getLocadorByNome(produto.locador);

  // Média, quantidade e distribuição por estrela desta ferramenta são sempre
  // calculadas a partir das avaliações reais dela (`produto.avaliacoes`), nunca
  // lidas direto de `produto.rating`/`produto.reviewCount` (campos fixos do mock,
  // que podem ficar desatualizados) — mesma regra usada no Web (ver
  // utils/avaliacoesResumo.ts e components/ProdutoDetalhe/AvaliacaoSection no Web).
  const resumoAvaliacoes = calcularResumoAvaliacoes(produto.avaliacoes);

  // ── ESTADOS LOCAIS (MODAIS, FORMULÁRIO E BLOQUEIO DE SCROLL) ───────
  const [modalAberto, setModalAberto] = useState(false);
  const [modoModal, setModoModal] = useState<'locar' | 'carrinho'>('locar');
  const [successAberto, setSuccessAberto] = useState(false);
  
  // 🚀 ARQUITETURA: Estado que controla o travamento da tela principal
  const [scrollBloqueado, setScrollBloqueado] = useState(false);

  const [selecaoProduto, setSelecaoProduto] = useState<{
    quantidade: number;
    diarias: number | null;
    tensao: string | null;
  }>({ quantidade: 1, diarias: null, tensao: null });

  // ── REGRAS DE NEGÓCIO E AÇÕES ────────────────────────────────────
  const handleSemelhante = (p: any) => {
    setProdutoSelecionado(p);
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  const handleAlugar = () => {
    setModoModal('locar');
    setModalAberto(true);
  };

  const handleAdicionarCarrinho = () => {
    setModoModal('carrinho');
    setModalAberto(true);
  };

  const handleFecharSuccess = () => {
    setSuccessAberto(false);
    navigation.navigate('ProductScreen'); 
  };

  const handleAdicionarAoCarrinhoConfirmado = (dados: any) => {
    adicionarItem(produto, dados);
    setModalAberto(false);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      
      {/* 🚀 UX MOBILE: scrollEnabled dinâmico impede a tela de rolar quando o dropdown abre */}
      <ScrollView 
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        scrollEnabled={!scrollBloqueado} 
      >

        <Header/>
        <View style={styles.contentContainer}>

          {/* ── SEÇÃO HERO (Imagens e Ações Principais) ── */}
          <View style={styles.heroSection}>
            <ImagemCarrossel images={produto.images} />
            
            <ProdutoInfo
              title={produto.title}
              price={produto.price}
              rating={resumoAvaliacoes.media}
              reviewCount={resumoAvaliacoes.quantidade}
              brand={produto.brand}
              imageVerificado={produto.imageVerificado}
              imageNota={produto.imageNota}
              estoqueDisponivel={produto.estoqueDisponivel}
              opcoesTensao={produto.opcoesTensao}
              onAlugar={handleAlugar}
              onReservar={handleAlugar} 
              onAddCarrinho={handleAdicionarCarrinho}
              onTempoDropdownOpen={setScrollBloqueado} // 🚀 Repassando a função para o ProdutoInfo
            />
          </View>

          {/* ── PRODUTOS SEMELHANTES ── */}
          <ProdutosSemelhantes
            produtos={MOCK_SEMELHANTES}
            onCardClick={handleSemelhante}
          />

          {/* ── INFORMAÇÕES DETALHADAS ── */}
          <View style={styles.gridInferior}>
            <Descricao texto="Ideal para uso doméstico e profissional leve. Perfeita para montagem de móveis, instalações e pequenos reparos. Compacta, potente e fácil de manusear — resolve o problema sem complicação." />
            
            <InfoVendedor
              nome={locador.nome}
              rating={locador.rating}
              reviewCount={locador.reviewCount}
              locacoes={locador.locacoes}
              verificado={locador.verificado}
              imageNota={produto.imageNota}
            />

            <EspecificacoesTecnicas especificacoes={MOCK_ESPECIFICACOES} />

            <Acessorios itens={produto.acessorios} />

            <AvaliacaoSection
              mediaGeral={resumoAvaliacoes.media}
              totalAvaliacoes={resumoAvaliacoes.quantidade}
              distribuicao={resumoAvaliacoes.distribuicao}
              avaliacoes={produto.avaliacoes ?? []}
              imageNota={produto.imageNota}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}