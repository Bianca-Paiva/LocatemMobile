import React, { useMemo, useRef, useState } from 'react';
import { ScrollView, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Heart } from 'lucide-react-native';

// ── 1. IMPORTAÇÃO DE COMPONENTES VISUAIS ───────────────────────────
import Header from '../../../components/Layout/Header';
import { ImagemCarrossel } from './components/ImageCarrosel';
import { ProdutoInfo } from './components/ProdutoInfo';
import { ProdutosSemelhantes } from './components/ProdutoSemelhantes';
import { Descricao } from './components/Descricao';
import { EspecificacoesTecnicas } from './components/EspecificacoesTecnicas';
import { InfoVendedor } from './components/InfoVendedor';
import { AvaliacaoSection } from './components/AvaliacaoSection';
import { Acessorios } from './components/Acessorios';

// ── 2. IMPORTAÇÃO DOS HOOKS GLOBAIS (ZUSTAND) E TEMAS ──────────────
import { useProdutoStore } from '../../../hooks/Ferramentas/useProdutoStore';
import { useNotificationStore } from '../../../hooks/Conta/Notificacoes/useNotificationStore';
import colors from '../../../theme/colors';

// ── 3. IMPORTAÇÃO DE MOCKS E UTILITÁRIOS ───────────────────────────
import { getLocadorByNome } from '../../../mocks/locadoresMock';
import { PRODUTOS_MOCK } from '../../../mocks/produtos.mock';
import { toProdutoSemelhante } from '../../../mocks/produtos.adapters';
import { FALLBACK_PRODUTO } from './mocks/ProductScreen.mock';
import { calcularResumoAvaliacoes } from '../../../utils/Avaliacao/avaliacoesResumo';
import { styles } from './styles';

import type { RootStackParamList } from '../../../routes/AppRoutes';
import type { ProdutoSemelhante } from './components/ProdutoSemelhantes/types';

export default function ProductScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const scrollViewRef = useRef<ScrollView>(null); 

  const { produtoSelecionado, setProdutoSelecionado } = useProdutoStore();
  const { adicionarNotificacao } = useNotificationStore();

  const produto = produtoSelecionado ?? FALLBACK_PRODUTO;
  const locador = getLocadorByNome(produto.locador);

  const resumoAvaliacoes = calcularResumoAvaliacoes(produto.avaliacoes);

  const produtosSemelhantes = useMemo<ProdutoSemelhante[]>(
    () =>
      PRODUTOS_MOCK
        .filter((item) => item.categoria === produto.categoria && item.id !== produto.id)
        .map(toProdutoSemelhante),
    [produto.categoria, produto.id],
  );

  // ── ESTADOS LOCAIS (MODAIS, FORMULÁRIO E BLOQUEIO DE SCROLL) ───────
  const [modalAberto, setModalAberto] = useState(false);
  const [modoModal, setModoModal] = useState<'locar' | 'carrinho'>('locar');
  const [successAberto, setSuccessAberto] = useState(false);
  const [scrollBloqueado, setScrollBloqueado] = useState(false);
  
  // Estado para o botão de Favoritar
  const [favoritado, setFavoritado] = useState(false);

  const [selecaoProduto, setSelecaoProduto] = useState<{
    quantidade: number;
    diarias: number | null;
    tensao: string | null;
  }>({ quantidade: 1, diarias: null, tensao: null });

  // ── REGRAS DE NEGÓCIO E AÇÕES ────────────────────────────────────
  const handleSemelhante = (p: ProdutoSemelhante) => {
    const produtoCompleto = PRODUTOS_MOCK.find((item) => item.id === p.id);
    if (produtoCompleto) {
      setProdutoSelecionado(produtoCompleto);
    }
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  const handleAlugar = () => {
    navigation.navigate('SolicitarLocacaoCarrinho', {
      quantidadeInicial: selecaoProduto.quantidade,
      diariasInicial: selecaoProduto.diarias,
      tensaoInicial: selecaoProduto.tensao,
      origem: 'locar',
    });
  };

  const handleAdicionarCarrinho = () => {
    navigation.navigate('SolicitarLocacaoCarrinho', {
      quantidadeInicial: selecaoProduto.quantidade,
      diariasInicial: selecaoProduto.diarias,
      tensaoInicial: selecaoProduto.tensao,
      origem: 'carrinho',
    });
  };

  const handleFecharSuccess = () => {
    setSuccessAberto(false);
    navigation.navigate('ProductScreen'); 
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      
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
            {/* Wrapper adicionado para permitir o position: absolute do botão */}
            <View style={{ position: 'relative' }}>
              <ImagemCarrossel images={produto.images} />
              
              <TouchableOpacity
                style={styles.HeartConteiner}
                onPress={() => setFavoritado(!favoritado)}
                accessibilityRole="button"
                accessibilityLabel={favoritado ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
              >
                <Heart 
                  size={20} 
                  color={favoritado ? colors.error : colors.textDark} 
                  fill={favoritado ? colors.error : 'transparent'} 
                />
              </TouchableOpacity>
            </View>
            
            <ProdutoInfo
              title={produto.title}
              price={produto.price}
              rating={resumoAvaliacoes.media}
              reviewCount={resumoAvaliacoes.quantidade}
              marca={produto.marca}
              imageVerificado={produto.imageVerificado}
              imageNota={produto.imageNota}
              estoqueDisponivel={produto.estoqueDisponivel}
              opcoesTensao={produto.voltagem ? [produto.voltagem] : []}
              onAlugar={handleAlugar}
              onReservar={handleAlugar} 
              onAddCarrinho={handleAdicionarCarrinho}
              onTempoDropdownOpen={setScrollBloqueado}
              onSelecaoChange={setSelecaoProduto} 
            />
          </View>

          {/* ── PRODUTOS SEMELHANTES ── */}
          <ProdutosSemelhantes
            produtos={produtosSemelhantes}
            onCardClick={handleSemelhante}
          />

          {/* ── INFORMAÇÕES DETALHADAS ── */}
          <View style={styles.gridInferior}>
            <Descricao texto={produto.descricao ?? 'Descrição não informada pelo locador.'} />
            
            <InfoVendedor
              nome={locador.nome}
              rating={locador.rating}
              reviewCount={locador.reviewCount}
              logoUrl={locador.logoUrl}
              locacoes={locador.locacoes}
              verificado={locador.verificado}
              imageNota={produto.imageNota}
              onVerPerfil={() =>
                navigation.navigate('PerfilLojaScreen', { locadorNome: locador.nome })
              }
            />

            <EspecificacoesTecnicas especificacoes={produto.especificacoes ?? []} />

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