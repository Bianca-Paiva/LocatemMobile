import React from 'react';

import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Calendar, Clock, Banknote } from 'lucide-react-native';

import Header from '../../../components/Layout/Header';
import CabecalhoPagina from '../../../components/Layout/CabecalhoPagina/CabecalhoPagina';
import { EstrelasAvaliacao } from '../../../components/Avaliacao/EstrelaAvaliacao/EstrelaAvaliacao';
import HomeLocadorResumoCard from '../../../components/Home/HomeLocador/HomeLocadorResumoCard/HomeLocadorResumoCard';
import HomeLocadorSolicitacaoItem from '../../../components/Home/HomeLocador/HomeLocadorSolicitacaoItem/HomeLocadorSolicitacaoItem';
import HomeLocadorAgendaItem from '../../../components/Home/HomeLocador/HomeLocadorAgendaItem/HomeLocadorAgendaItem';
import HomeLocadorFerramentaCard from '../../../components/Home/HomeLocador/HomeLocadorFerramentaCard/HomeLocadorFerramentaCard';
import HomeLocadorCardNovaFerramenta from '../../../components/Home/HomeLocador/HomeLocadorCardNovaFerramenta/HomeLocadorCardNovaFerramenta';

import { useExigirPerfil } from '../../../hooks/Auth/useProtegerRotaPorPerfil';
import { useHomeLocador } from '../../../hooks/Home/useHomeLocador';
import { useLocacaoStore } from '../../../hooks/Locacoes/useLocacaoStore';
import { formatarValorMonetario } from '../../../utils/Formatacao/valorMonetario';
import colors from '../../../theme/colors';

import type { RootStackParamList } from '../../../routes/AppRoutes';
import type { SolicitacaoRecenteLocador } from './HomeLocador.types';

import { styles } from './styles';

interface HomeLocadorProps {
  navigate: (route: string) => void;
}

/** Cor de destaque (amarelo/dourado da marca) usada nas estrelas — mesma da Web. */
const ESTRELA_COR_MARCA = '#F9C01A';

interface CabecalhoSecaoProps {
  titulo: string;
  subtitulo: string;
  linkLabel: string;
  /** Sem `onPressLink` o link é só visual (opacidade reduzida), como na Web. */
  onPressLink?: () => void;
}

// Cabeçalho repetido nas 3 seções (título + subtítulo + link "Ver ... →").
function CabecalhoSecao({ titulo, subtitulo, linkLabel, onPressLink }: CabecalhoSecaoProps) {
  const conteudoLink = (
    <>
      <Text style={styles.linkVerMaisTexto}>{linkLabel}</Text>
      <MaterialCommunityIcons name="arrow-right" size={16} color={colors.secondary} />
    </>
  );

  return (
    <View style={styles.cabecalhoSecao}>
      <View style={styles.cabecalhoSecaoTextos}>
        <Text style={styles.tituloSecao}>{titulo}</Text>
        <Text style={styles.subtituloSecao}>{subtitulo}</Text>
      </View>

      {onPressLink ? (
        <TouchableOpacity style={styles.linkVerMais} onPress={onPressLink} activeOpacity={0.7}>
          {conteudoLink}
        </TouchableOpacity>
      ) : (
        <View style={[styles.linkVerMais, styles.linkVerMaisEstatico]}>{conteudoLink}</View>
      )}
    </View>
  );
}

export default function HomeLocador({ navigate }: HomeLocadorProps) {
  // Todos os hooks ficam ANTES do `return null` (regra dos hooks).
  const acessoPermitido = useExigirPerfil(navigate, 'locador', 'home');
  const { usuario, resumo, solicitacoesRecentes, agendaSemana, minhasFerramentas } =
    useHomeLocador();
  const { setLocacaoSelecionada } = useLocacaoStore();

  // `navigate` (prop) só recebe a rota; editar precisa do param `ferramentaId`,
  // então usamos a navegação do React Navigation direto nesse caso — mesmo
  // padrão de MinhasFerramentas.
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  if (!acessoPermitido || !usuario) {
    return null;
  }

  const handleVerDetalhesSolicitacao = (solicitacao: SolicitacaoRecenteLocador) => {
    setLocacaoSelecionada(solicitacao);
    navigate('detalhesLocacao');
  };

  // TODO: ainda não existe a tela de detalhe da ferramenta (a Web tem "Ver"
  // → ferramentaDetalhe), por isso só há "Editar" no card.
  const handleEditarFerramenta = (id: string) => {
    navigation.navigate('CadastroFerramentaScreen', { ferramentaId: id });
  };

  const handleCadastrarFerramenta = () => navigate('CadastroFerramentaScreen');

  const percentualFaturamento =
    resumo.faturamentoMesAnterior > 0
      ? Math.round(
          ((resumo.faturamentoMesAtual - resumo.faturamentoMesAnterior) /
            resumo.faturamentoMesAnterior) *
            100
        )
      : null;

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Header />

        <View style={styles.pagina}>
          <CabecalhoPagina
            titulo={`Olá, ${usuario.nome.split(' ')[0]}!`}
            subtitulo="Aqui está um resumo das suas ferramentas, locações e desempenho da conta."
          />

          {/* ── Cards de resumo ───────────────────────────────────────── */}
          <View style={styles.gradeResumo}>
            <HomeLocadorResumoCard
              icone={<MaterialCommunityIcons name="tools" size={22} color="#005D75" />}
              fundoIcone="#EAF6FF"
              label="Ferramentas ativas"
              valor={String(resumo.ferramentasAtivas)}
              tendencia={
                resumo.ferramentasCadastradasEsteMes > 0
                  ? `+${resumo.ferramentasCadastradasEsteMes} este mês`
                  : undefined
              }
            />

            <HomeLocadorResumoCard
              icone={<Calendar size={22} strokeWidth={2} color="#005D75" />}
              fundoIcone="#EAF6FF"
              label="Locações em andamento"
              valor={String(resumo.locacoesEmAndamento)}
              legenda={`de ${resumo.ferramentasAtivas} ferramentas ativas`}
            />

            <HomeLocadorResumoCard
              icone={<Clock size={22} strokeWidth={2} color="#7A5A00" />}
              fundoIcone="#FFF4DD"
              label="Solicitações pendentes"
              valor={String(resumo.solicitacoesPendentes)}
              legenda="Aguardando sua resposta"
            />

            <HomeLocadorResumoCard
              icone={<Banknote size={22} strokeWidth={2} color="#137333" />}
              fundoIcone="#E6F4EA"
              label="Faturamento do mês"
              valor={formatarValorMonetario(resumo.faturamentoMesAtual)}
              tendencia={
                percentualFaturamento !== null
                  ? `${percentualFaturamento >= 0 ? '+' : ''}${percentualFaturamento}% em relação ao mês anterior`
                  : undefined
              }
            />

            <HomeLocadorResumoCard
              icone={<MaterialCommunityIcons name="star" size={22} color={ESTRELA_COR_MARCA} />}
              fundoIcone="#FFF4DD"
              label="Avaliação média"
              valor={usuario.reputacao.rating.toFixed(1)}
              extra={
                <View style={styles.estrelasAvaliacao}>
                  <EstrelasAvaliacao
                    notaAtual={usuario.reputacao.rating}
                    variante="lista"
                    corAtiva={ESTRELA_COR_MARCA}
                  />
                  <Text style={styles.legendaAvaliacoes}>
                    ({usuario.reputacao.totalAvaliacoes} avaliações)
                  </Text>
                </View>
              }
            />
          </View>

          {/* ── Solicitações Recentes ─────────────────────────────────── */}
          <View style={styles.cartaoSecao}>
            {/* TODO: ligar a "Gerenciar Locações" quando essa tela existir no Mobile
                (não navegar para rota inexistente: o React Navigation lança erro). */}
            <CabecalhoSecao
              titulo="Solicitações Recentes"
              subtitulo="Confira as últimas solicitações de locação das suas ferramentas."
              linkLabel="Ver todas"
            />

            {solicitacoesRecentes.length === 0 ? (
              <Text style={styles.estadoVazio}>Nenhuma solicitação por aqui ainda.</Text>
            ) : (
              <View>
                {solicitacoesRecentes.map((solicitacao, indice, lista) => (
                  <HomeLocadorSolicitacaoItem
                    key={solicitacao.id}
                    solicitacao={solicitacao}
                    onVerDetalhes={() => handleVerDetalhesSolicitacao(solicitacao)}
                    ultimo={indice === lista.length - 1}
                  />
                ))}
              </View>
            )}
          </View>

          {/* ── Agenda da Semana ──────────────────────────────────────── */}
          <View style={styles.cartaoSecao}>
            {/* "Ver agenda completa" aparece no layout, mas ainda não existe uma
                página de agenda — sem navegação por enquanto (igual à Web). */}
            <CabecalhoSecao
              titulo="Agenda da Semana"
              subtitulo="Próximos movimentos logísticos das suas ferramentas."
              linkLabel="Ver agenda completa"
            />

            {agendaSemana.length === 0 ? (
              <Text style={styles.estadoVazio}>
                Nenhum movimento logístico previsto no momento.
              </Text>
            ) : (
              <View>
                {agendaSemana.map((evento, indice, lista) => (
                  <HomeLocadorAgendaItem
                    key={evento.id}
                    evento={evento}
                    ultimo={indice === lista.length - 1}
                  />
                ))}
              </View>
            )}
          </View>

          {/* ── Minhas Ferramentas ────────────────────────────────────── */}
          <View style={styles.cartaoSecao}>
            <CabecalhoSecao
              titulo="Minhas Ferramentas"
              subtitulo="Acesse e gerencie suas ferramentas cadastradas."
              linkLabel="Ver todas"
              onPressLink={() => navigate('MinhasFerramentasScreen')}
            />

            {/* O arraste horizontal é nativo do ScrollView (a Web precisa de
                pointer events para isso). */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.carrossel}
            >
              {minhasFerramentas.map((ferramenta) => (
                <HomeLocadorFerramentaCard
                  key={ferramenta.id}
                  ferramenta={ferramenta}
                  onEditar={handleEditarFerramenta}
                />
              ))}

              <HomeLocadorCardNovaFerramenta onPress={handleCadastrarFerramenta} />
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
