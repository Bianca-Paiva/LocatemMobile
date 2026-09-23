import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';

import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp} from "@react-navigation/stack";

// Pages
import ProductScreen from "../pages/Ferramentas/ProductScreen";
import {HomeScreen} from "../pages/home/HomeScreen";
import {SearchScreen} from "../pages/Search/SearchScreen";
import CadastroScreen from "../pages/Auth/Cadastro";
import LoginScreen from "../pages/Auth/Login";
import ReceiveTokenScreen from "../pages/Auth/RecuperarSenha/receiveToken/ReceiveToken";
import { RecoveryRequisitionScreen } from "../pages/Auth/RecuperarSenha/recoveryRequisition/RecoveryRequisition";
import RecoveryPasswordScreen from "../pages/Auth/RecuperarSenha/recoveryPassword/RecoveryPasswordScreen";
import { Avaliacao } from "../pages/Avaliacao/Avaliacao";
import DetalhesLocacao from "../pages/Locacoes/DetalhesLocacao/DetalhesLocacao";
import MinhasLocacoes from "../pages/Locacoes/MinhasLocacoes/MinhasLocacoes";
import SolicitarLocacao from "../pages/Locacoes/SolicitarLocacao/SolicitarLocacao";
import SolicitacaoEnviada from "../pages/Locacoes/SolicitacaoEnviada/SolicitacaoEnviada";
import CadastroFerramentaScreen from "../pages/Ferramentas/CadastroFerramenta";
import MinhasFerramentasScreen from "../pages/Ferramentas/MinhasFerramentas";
import Carrinho from "../pages/Checkout/Carrinho/Carrinho";
import SolicitarLocacaoCarrinho from "../pages/Checkout/Carrinho/SolicitarLocacaoCarrinho/SolicitarLocacaoCarrinho";
import Notificacoes from "../pages/Conta/Notificacoes/Notificacoes";
import HistoricoLocacoes from "../pages/Locacoes/HistoricoLocacoes/HistoricoLocacoes";
import HomeLocador from "../pages/home/HomeLocador/HomeLocador";

// Fluxo de Pagamento (Carrinho -> Método de Pagamento -> Selecionar Cartão/Pix -> Processando -> Aprovado)
import MetodoPagamento from "../pages/Checkout/Pagamento/MetodoPagamento/MetodoPagamento";
import SelecionarCartao from "../pages/Checkout/Pagamento/SelecionarCartao/SelecionarCartao";
import AdicionarCartaoCredito from "../pages/Checkout/Pagamento/AdicionarCartaoCredito/AdicionarCartaoCredito";
import AdicionarCartaoDebito from "../pages/Checkout/Pagamento/AdicionarCartaoDebito/AdicionarCartaoDebito";
import PagamentoPix from "../pages/Checkout/Pagamento/PagamentoPix/PagamentoPix";
import ProcessandoPagamento from "../pages/Checkout/Pagamento/ProcessandoPagamento/ProcessandoPagamento";
import PagamentoAprovado from "../pages/Checkout/Pagamento/PagamentoAprovado/PagamentoAprovado";
import PerfilScreenPage from "../pages/Conta/Perfil/PerfilScreen";
import { withAuthGuard } from "../components/Auth/ProtectedRoute";

export type RootStackParamList = {
  LoginScreen: undefined,
  CadastroScreen: undefined,
  HomeScreen: undefined,
  SearchScreen: { search: string },
  RecoveryRequisitionScreen: undefined,
  ReceiveTokenScreen: undefined,
  RecoveryPasswordScreen:undefined,
  Avaliacao: undefined,
  DetalhesLocacao: undefined,
  MinhasLocacoes: undefined,
  SolicitarLocacao: undefined,
  SolicitacaoEnviada: undefined,
  ProductScreen: undefined,
  CadastroFerramentaScreen: { ferramentaId?: string } | undefined,
  MinhasFerramentasScreen: undefined,
  CarrinhoScreen: undefined,
  NotificacoesScreen: undefined,
  PerfilScreen: undefined,
  HistoricoLocacoesScreen: undefined,
  HomeLocadorScreen: undefined,
  /**
   * Tela "Detalhes da Locação" do fluxo "Adicionar ao carrinho" — equivalente,
   * no Mobile, ao modal `SolicitarLocacaoModal` da Web. Os parâmetros são a
   * seleção já feita na tela do produto (quantidade/tempo/tensão), repassada
   * como valores iniciais para não fazer o usuário escolher de novo.
   */
  SolicitarLocacaoCarrinho: {
    quantidadeInicial?: number;
    diariasInicial?: number | null;
    tensaoInicial?: string | null;
    /**
     * Identifica qual botão da ProductScreen originou a navegação até aqui:
     * 'locar' (botão "Locar") ou 'carrinho' (botão "Adicionar ao carrinho").
     * Usado apenas para decidir o texto do botão amarelo desta tela — não
     * altera nenhum comportamento/navegação existente.
     */
    origem?: 'locar' | 'carrinho';
  } | undefined,

  // Fluxo de Pagamento — mesmas etapas do fluxo da Web.
  MetodoPagamentoScreen: undefined,
  SelecionarCartaoScreen: undefined,
  AdicionarCartaoCreditoScreen: undefined,
  AdicionarCartaoDebitoScreen: undefined,
  PagamentoPixScreen: undefined,
  ProcessandoPagamentoScreen: undefined,
  PagamentoAprovadoScreen: undefined,

}

/**
 * As telas do fluxo de Locacoes (DetalhesLocacao, MinhasLocacoes,
 * SolicitarLocacao, SolicitacaoEnviada) foram escritas recebendo uma prop
 * `navigate: (route: string) => void`, usando chaves "de tela" em minúsculo
 * (ex.: 'minhasLocacoes', 'detalhesLocacao') em vez dos nomes registrados
 * no `RootStackParamList` (ex.: 'MinhasLocacoes', 'DetalhesLocacao').
 *
 * Esse mapa traduz essas chaves para os nomes reais de rota, e o hook abaixo
 * gera a função `navigate` que essas telas esperam a partir da navegação
 * real do React Navigation.
 *
 * TODO: 'produtoDetalhe' ainda não tem uma tela própria no RootStackParamList;
 * por ora cai em 'HomeScreen' até essa tela ser implementada.
 */

const MAPA_ROTAS_LEGADAS: Record<string, keyof RootStackParamList> = {
  home: "HomeScreen",
  HomeScreen: "HomeScreen",
  busca: "SearchScreen",
  avaliacao: "Avaliacao",
  detalhesLocacao: "DetalhesLocacao",
  minhasLocacoes: "MinhasLocacoes",
  solicitarLocacao: "SolicitarLocacao",
  solicitacaoEnviada: "SolicitacaoEnviada",
  produtoDetalhe: "HomeScreen",
  CadastroFerramentaScreen: "CadastroFerramentaScreen",
  carrinho: "CarrinhoScreen",
  notificacoes: "NotificacoesScreen",
  // Fluxo de Pagamento — chaves usadas pelos hooks em hooks/Pagamento/*.
  metodoPagamento: "MetodoPagamentoScreen",
  selecionarCartao: "SelecionarCartaoScreen",
  adicionarCartaoCredito: "AdicionarCartaoCreditoScreen",
  adicionarCartaoDebito: "AdicionarCartaoDebitoScreen",
  pagamentoPix: "PagamentoPixScreen",
  processandoPagamento: "ProcessandoPagamentoScreen",
  pagamentoAprovado: "PagamentoAprovadoScreen",
  PerfilScreen: "PerfilScreen",
  // Saída de "Pagamento Aprovado" para "Minhas Locacoes". Chave própria (em vez de
  // reaproveitar "minhasLocacoes") porque só esta saída precisa do reset de pilha
  // abaixo — os demais usos de "minhasLocacoes" (ex.: DetalhesLocacao, SolicitacaoEnviada)
  // devem continuar empilhando normalmente.
  minhasLocacoesPosPagamento: "MinhasLocacoes",
  historicoLocacoes: "HistoricoLocacoesScreen",
  homeLocador: "HomeLocadorScreen",
  HomeLocadorScreen: "HomeLocadorScreen",
};

// Rotas cujo destino deve substituir toda a pilha de navegação (equivalente a um
// "popToTop" + push), em vez de empilhar sobre as telas atuais. Necessário para as
// saídas finais do funil de pagamento: as telas anteriores do funil (Selecionar
// Cartão/Pix, Processando Pagamento) ficam montadas por baixo na pilha e têm guards
// que redirecionam para o Carrinho assim que o PagamentoContext é limpo (ver
// usePagamentoAprovado.ts). Se a navegação de saída apenas empilhasse uma tela nova,
// esses guards disparariam pouco depois (de forma assíncrona) e empurrariam o
// Carrinho por cima do destino correto. Resetar a pilha remove essas telas antes que
// os guards tenham chance de agir.
const ROTAS_QUE_RESETAM_PILHA = new Set<string>(['home', 'HomeScreen', 'homeLocador', 'minhasLocacoesPosPagamento']);

function useLegacyNavigate() {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList>>();

  return (route: string) => {
    const nomeReal =
      MAPA_ROTAS_LEGADAS[route] ??
      (route as keyof RootStackParamList);

    if (ROTAS_QUE_RESETAM_PILHA.has(route)) {
      navigation.reset({
        index: 0,
        routes: [{ name: nomeReal }],
      });

      return;
    }

    navigation.navigate(nomeReal as any);
  };
}

function DetalhesLocacaoScreen() {
  const navigate = useLegacyNavigate();
  return <DetalhesLocacao navigate={navigate} />;
}

function MinhasLocacoesScreen() {
  const navigate = useLegacyNavigate();
  return <MinhasLocacoes navigate={navigate} />;
}

function SolicitarLocacaoScreen() {
  const navigate = useLegacyNavigate();
  return <SolicitarLocacao navigate={navigate} />;
}

function SolicitacaoEnviadaScreen() {
  const navigate = useLegacyNavigate();
  return <SolicitacaoEnviada navigate={navigate} />;

}

function CarrinhoScreen() {
  const navigate = useLegacyNavigate();
  return <Carrinho navigate={navigate} />;
}

function NotificacoesScreen() {
  const navigate = useLegacyNavigate();
  return <Notificacoes navigate={navigate} />;
}

function MetodoPagamentoScreen() {
  const navigate = useLegacyNavigate();
  return <MetodoPagamento navigate={navigate} />;
}

function SelecionarCartaoScreen() {
  const navigate = useLegacyNavigate();
  return <SelecionarCartao navigate={navigate} />;
}

function AdicionarCartaoCreditoScreen() {
  const navigate = useLegacyNavigate();
  return <AdicionarCartaoCredito navigate={navigate} />;
}

function AdicionarCartaoDebitoScreen() {
  const navigate = useLegacyNavigate();
  return <AdicionarCartaoDebito navigate={navigate} />;
}

function PagamentoPixScreen() {
  const navigate = useLegacyNavigate();
  return <PagamentoPix navigate={navigate} />;
}

function ProcessandoPagamentoScreen() {
  const navigate = useLegacyNavigate();
  return <ProcessandoPagamento navigate={navigate} />;
}

function PagamentoAprovadoScreen() {
  const navigate = useLegacyNavigate();
  return <PagamentoAprovado navigate={navigate} />;
}

function PerfilRoute() {
    const navigate = useLegacyNavigate();

    return (
        <PerfilScreenPage
            onNavigate={navigate}
            onEntrar={() => navigate("LoginScreen")}
            onLogout={() => navigate("home")}
        />
    );
}

function HistoricoLocacoesScreen() {
  const navigate = useLegacyNavigate();
  return <HistoricoLocacoes navigate={navigate} />;
}

function HomeLocadorRoute() {
  const navigate = useLegacyNavigate();
  return <HomeLocador navigate={navigate} />;
}

const Stack = createStackNavigator<RootStackParamList>();

export default function AppRoutes() {

  // Obtenm os dados do usuário e o status de carregamento do seu gerenciador de estado
  // const { user, isLoading } = useAuth(); 
  
  // MOCK PARA EXEMPLO (substitua pelo seu hook real):
  const isLoading = false;
  const user = { tipo: 'locador' }; 

  // Segura a renderização das rotas enquanto verifica o usuário
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  //  Define qual será a tela inicial com base no tipo
  let telaInicial: keyof RootStackParamList = "HomeScreen"; // Padrão para não logado / locatário

  if (user) {
    switch (user.tipo) {
      case 'locador':
        telaInicial = "HomeLocadorScreen";
        break;
      case 'adm':
        // telaInicial = "HomeAdmScreen"; // Crie/adicione a tela de ADM
        telaInicial = "HomeScreen";
        break;
      case 'locatario':
        telaInicial = "HomeScreen"; 
        break;
      default:
        telaInicial = "HomeScreen";
    }
  }

  return (
    <Stack.Navigator
      initialRouteName={telaInicial}
      screenOptions={{
        headerShown: false,
      }}
    >

      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
      />

      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
           title:"",
           headerShown: true,
           headerShadowVisible: false,
        }}
        
      />

      <Stack.Screen
        name="CadastroScreen"
        component={CadastroScreen}
      />
      
       <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
      />

      <Stack.Screen
        name="RecoveryRequisitionScreen"
        component={RecoveryRequisitionScreen}
        options={{
          headerShown: true, 
          title:"",
          headerStyle: {
            backgroundColor: "#f9fafb",
          },
          headerShadowVisible: false,
        }}
      />

      <Stack.Screen
        name="ReceiveTokenScreen"
        component={ReceiveTokenScreen}
        options={{
          headerShown: true, 
          title:"",
          headerStyle: {
            backgroundColor: "#f9fafb",
          },
          headerShadowVisible: false,
        }}/>

        <Stack.Screen
          name="RecoveryPasswordScreen"
          component={RecoveryPasswordScreen}
          options={{
          headerShown: true, 
          title:"",
          headerStyle: {
            backgroundColor: "#f9fafb",
          },
          headerShadowVisible: false,
        }}
        />

        <Stack.Screen
          name="ProductScreen"
          component={ProductScreen}
          options={{
          headerShown: false, 
          title:"",
          headerStyle: {
            
          },
          headerShadowVisible: false,
        }}
        />

        <Stack.Screen
          name="CadastroFerramentaScreen"
          component={withAuthGuard(CadastroFerramentaScreen)}
          options={{
             headerShown: true,
             title:"",
             headerTitle:"",
             headerShadowVisible: false,
             headerStyle: {
            
            },
          }}
        />

        <Stack.Screen
          name="MinhasFerramentasScreen"
          component={withAuthGuard(MinhasFerramentasScreen)}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Avaliacao"
          component={Avaliacao}
          options={{
            headerShown: false, 
            title:"",
          }}
        />
        <Stack.Screen
          name="DetalhesLocacao"
          component={withAuthGuard(DetalhesLocacaoScreen)}
          options={{
            headerShown: false,
            title:"",
        
          }}
          />
          <Stack.Screen
          name="MinhasLocacoes"
          component={withAuthGuard(MinhasLocacoesScreen)}
           options={{
            headerShown: false,
            title:"",
         
          }}
          />
          <Stack.Screen
          name="SolicitarLocacao"
          component={withAuthGuard(SolicitarLocacaoScreen)}
           options={{
            headerShown: false,
            title:"",
          }}
          />
          <Stack.Screen
          name="SolicitacaoEnviada"
          component={withAuthGuard(SolicitacaoEnviadaScreen)}
           options={{
            headerShown: false,
            title:"",
          }}
          />

          <Stack.Screen
          name="CarrinhoScreen"
          component={withAuthGuard(CarrinhoScreen)}
           options={{
            headerShown: false,
            title:"",
          }}
          />

          <Stack.Screen
          name="SolicitarLocacaoCarrinho"
          component={SolicitarLocacaoCarrinho}
           options={{
            headerShown: false,
            title:"",
          }}
          />

          <Stack.Screen
          name="NotificacoesScreen"
          component={withAuthGuard(NotificacoesScreen)}
           options={{
            headerShown: false,
            title:"",
          }}
          />

          {/* Fluxo de Pagamento */}
          <Stack.Screen
          name="MetodoPagamentoScreen"
          component={MetodoPagamentoScreen}
           options={{
            headerShown: false,
            title:"",
          }}
          />

          <Stack.Screen
          name="SelecionarCartaoScreen"
          component={SelecionarCartaoScreen}
           options={{
            headerShown: false,
            title:"",
          }}
          />

          <Stack.Screen
          name="AdicionarCartaoCreditoScreen"
          component={AdicionarCartaoCreditoScreen}
           options={{
            headerShown: false,
            title:"",
          }}
          />

          <Stack.Screen
          name="AdicionarCartaoDebitoScreen"
          component={AdicionarCartaoDebitoScreen}
           options={{
            headerShown: false,
            title:"",
          }}
          />

          <Stack.Screen
          name="PagamentoPixScreen"
          component={PagamentoPixScreen}
           options={{
            headerShown: false,
            title:"",
          }}
          />

          <Stack.Screen
          name="ProcessandoPagamentoScreen"
          component={ProcessandoPagamentoScreen}
           options={{
            headerShown: false,
            title:"",
          }}
          />

          <Stack.Screen
          name="PagamentoAprovadoScreen"
          component={PagamentoAprovadoScreen}
           options={{
            headerShown: false,
            title:"",
          }}
          />

       <Stack.Screen
        name="PerfilScreen"
        component={PerfilRoute}
        options={{
           headerShown: false,
          }}
          />

      <Stack.Screen
        name="HistoricoLocacoesScreen"
        component={withAuthGuard(HistoricoLocacoesScreen)}
        options={{ headerShown: false, title: "" }}
      />

      <Stack.Screen
        name="HomeLocadorScreen"
        component={withAuthGuard(HomeLocadorRoute)}
        options={{ headerShown: false, title: "" }}
      />

    </Stack.Navigator>
  );
}
