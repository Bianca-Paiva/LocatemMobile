import React, { useRef, useState } from 'react';
import { ScrollView, View, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// ── 1. IMPORTAÇÃO DE COMPONENTES VISUAIS ───────────────────────────
// 🚀 ARQUITETURA: Ajuste os caminhos relativos conforme a estrutura real das suas pastas.
import Header from '../../components/Header';
import {ImagemCarrossel} from './components/ImageCarrosel';
import { ProdutoInfo } from './components/ProdutoInfo';
import { ProdutosSemelhantes } from './components/ProdutoSemelhantes';
import { Descricao } from './components/Descricao';
import { EspecificacoesTecnicas } from './components/EspecificacoesTecnicas';
import { InfoVendedor } from './components/InfoVendedor';
import { AvaliacaoSection } from './components/AvaliacaoSection';
// import SolicitarReservaModal from '../../components/SolicitarReservaModal';
// import SuccessModal from '../../components/SuccessModal';


// ── 2. IMPORTAÇÃO DOS HOOKS GLOBAIS (ZUSTAND) ──────────────────────
import { useProdutoStore } from '../../hooks/useProdutoStore';
import { useReservaStore } from '../../hooks/useReservaStore';
import { useNotificationStore } from '../../hooks/useNotificationStore';
import { useCarrinhoStore } from '../../hooks/useCarrinhoStore';

// ── 3. IMPORTAÇÃO DE MOCKS E UTILITÁRIOS ───────────────────────────
import { getLocadorByNome } from '../../mocks/locadoresMock';
// import { montarReservaPendente, montarNotificacaoSolicitacaoEnviada } from '../../utils/montarReservaData';
import {
  FALLBACK_PRODUTO,
  MOCK_SEMELHANTES,
  MOCK_ESPECIFICACOES,
  MOCK_AVALIACOES
} from '../../mocks/productMock';
import { styles } from './styles';

import type { RootStackParamList } from '../../routes/AppRoutes';

export default function ProductScreen() {
  // ── HOOKS DE NAVEGAÇÃO E REFERÊNCIA ──────────────────────────────
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const scrollViewRef = useRef<ScrollView>(null); 

  // ── CONEXÃO COM O ESTADO GLOBAL (ZUSTAND) ────────────────────────
  // 🚀 ARQUITETURA: A tela apenas "lê" ou "despacha" ações, a lógica pesada fica nos hooks.
  const { produtoSelecionado, setProdutoSelecionado } = useProdutoStore();
  const { adicionarReserva } = useReservaStore();
  const { adicionarNotificacao } = useNotificationStore();
  const { adicionarItem } = useCarrinhoStore();

  // Validação Defensiva: Garante que a tela nunca quebre se o usuário entrar direto sem selecionar nada
  const produto = produtoSelecionado ?? FALLBACK_PRODUTO;
  const locador = getLocadorByNome(produto.locador);

  // ── ESTADOS LOCAIS (MODAIS E FORMULÁRIO) ─────────────────────────
  const [modalAberto, setModalAberto] = useState(false);
  const [modoModal, setModoModal] = useState<'locar' | 'carrinho'>('locar');
  const [successAberto, setSuccessAberto] = useState(false);

  const [selecaoProduto, setSelecaoProduto] = useState<{
    quantidade: number;
    diarias: number | null;
    tensao: string | null;
  }>({ quantidade: 1, diarias: null, tensao: null });

  // ── REGRAS DE NEGÓCIO E AÇÕES ────────────────────────────────────

  // UX: Simula transição de página rolando suavemente para o topo ao clicar num similar
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

//   const handleContinuar = (dados: any) => {
//     setProdutoSelecionado(produto);
//     setModalAberto(false);

//     if (produto.tipoAprovacao === 'manual') {
//       // Fluxo Assíncrono: Grava a reserva pendente e dispara a notificação
//       const novaReserva = adicionarReserva(montarReservaPendente(produto, dados));
//       adicionarNotificacao(
//         montarNotificacaoSolicitacaoEnviada(produto, novaReserva.id, novaReserva.periodo)
//       );
//       setSuccessAberto(true);
//     } else {
//       // navigation.navigate('PagamentoScreen'); // Rota futura
//     }
//   };

  const handleFecharSuccess = () => {
    setSuccessAberto(false);
    navigation.navigate('ProductScreen'); // Arrumar isso para MinhasLocacoes quando a rota estiver pronta
  };

  const handleAdicionarAoCarrinhoConfirmado = (dados: any) => {
    adicionarItem(produto, dados);
    setModalAberto(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header/>

      {/* 🚀 UX MOBILE: ScrollView ocultando a barra lateral para visual mais limpo */}
      <ScrollView 
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          
          {/* ── SEÇÃO HERO (Imagens e Ações Principais) ── */}
          <View style={styles.heroSection}>
            <ImagemCarrossel images={produto.images} />
            
            <ProdutoInfo
              title={produto.title}
              price={produto.price}
              rating={produto.rating}
              reviewCount={produto.reviewCount}
              brand={produto.brand}
              imageVerificado={produto.imageVerificado}
              imageNota={produto.imageNota}
              estoqueDisponivel={produto.estoqueDisponivel}
              onAlugar={handleAlugar}
              onReservar={handleAlugar} 
              onAddCarrinho={handleAdicionarCarrinho}
            />
          </View>

          {/* ── PRODUTOS SEMELHANTES (Carrossel Horizontal) ── */}
          <ProdutosSemelhantes
            produtos={MOCK_SEMELHANTES}
            onCardClick={handleSemelhante}
          />

          {/* ── INFORMAÇÕES DETALHADAS (Grid Inferior Empilhado) ── */}
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

            <AvaliacaoSection
              mediaGeral={produto.rating}
              totalAvaliacoes={produto.reviewCount}
              distribuicao={[72, 18, 6, 2, 2]}
              avaliacoes={MOCK_AVALIACOES}
              imageNota={produto.imageNota}
            />
          </View>
        </View>
      </ScrollView>

      {/* ── MODAIS (Renderizados sobrepondo a tela inteira) ── */}
      {/* <SolicitarReservaModal
        aberto={modalAberto}
        produto={produto}
        modo={modoModal}
        quantidadeInicial={selecaoProduto.quantidade}
        duracaoInicial={selecaoProduto.diarias ?? undefined}
        tensaoSelecionada={selecaoProduto.tensao}
        onClose={() => setModalAberto(false)}
        onContinuar={handleContinuar}
        onAdicionarCarrinho={handleAdicionarAoCarrinhoConfirmado}
      /> */}

      {/* <SuccessModal
        open={successAberto}
        title="Solicitação enviada!"
        message="Sua solicitação de locação foi enviada ao locador, que tem até 24h para responder. Você pode acompanhar o status em Minhas Locações."
        buttonText="Ver Minhas Locações"
        onConfirm={handleFecharSuccess}
      /> */}
    </SafeAreaView>
  );
}