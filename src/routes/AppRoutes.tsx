import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp} from "@react-navigation/stack";

// Pages
import ProductScreen from "../pages/ProductScreen";
import {HomeScreen} from "../pages/home/HomeScreen";
import {SearchScreen} from "../pages/Search/SearchScreen";
import CadastroScreen from "../pages/Cadastro";
import LoginScreen from "../pages/Login";
import ReceiveTokenScreen from "../pages/receiveToken/ReceiveToken";
import { RecoveryRequisitionScreen } from "../pages/recoveryRequisition/RecoveryRequisition";
import RecoveryPasswordScreen from "../pages/recoveryPassword/RecoveryPasswordScreen";
import { Avaliacao } from "../pages/Avaliacao/Avaliacao";
import DetalhesReserva from "../pages/Reservas/DetalhesReserva/DetalhesReserva";
import MinhasReservas from "../pages/Reservas/MinhasReservas/MinhasReservas";
import SolicitarReserva from "../pages/Reservas/SolicitarReserva/SolicitarReserva";
import SolicitacaoEnviada from "../pages/Reservas/SolicitacaoEnviada/SolicitacaoEnviada";
import CadastroFerramentaScreen from "../pages/CadastroFerramenta";
import MinhasFerramentasScreen from "../pages/MinhasFerramentas";
import Carrinho from "../pages/Carrinho/Carrinho";
import SolicitarLocacaoCarrinho from "../pages/Carrinho/SolicitarLocacaoCarrinho/SolicitarLocacaoCarrinho";
import Notificacoes from "../pages/Notificacoes/Notificacoes";

// Fluxo de Pagamento (Carrinho -> Método de Pagamento -> Selecionar Cartão/Pix -> Processando -> Aprovado)
import MetodoPagamento from "../pages/Pagamento/MetodoPagamento/MetodoPagamento";
import SelecionarCartao from "../pages/Pagamento/SelecionarCartao/SelecionarCartao";
import AdicionarCartaoCredito from "../pages/Pagamento/AdicionarCartaoCredito/AdicionarCartaoCredito";
import AdicionarCartaoDebito from "../pages/Pagamento/AdicionarCartaoDebito/AdicionarCartaoDebito";
import PagamentoPix from "../pages/Pagamento/PagamentoPix/PagamentoPix";
import ProcessandoPagamento from "../pages/Pagamento/ProcessandoPagamento/ProcessandoPagamento";
import PagamentoAprovado from "../pages/Pagamento/PagamentoAprovado/PagamentoAprovado";

export type RootStackParamList = {
  LoginScreen: undefined,
  CadastroScreen: undefined,
  HomeScreen: undefined,
  SearchScreen: { search: string },
  RecoveryRequisitionScreen: undefined,
  ReceiveTokenScreen: undefined,
  RecoveryPasswordScreen:undefined,
  Avaliacao: undefined,
  DetalhesReserva: undefined,
  MinhasReservas: undefined,
  SolicitarReserva: undefined,
  SolicitacaoEnviada: undefined,
  ProductScreen: undefined,
  CadastroFerramentaScreen: { ferramentaId?: string } | undefined,
  MinhasFerramentasScreen: undefined,
  CarrinhoScreen: undefined,
  NotificacoesScreen: undefined,
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
 * As telas do fluxo de Reservas (DetalhesReserva, MinhasReservas,
 * SolicitarReserva, SolicitacaoEnviada) foram escritas recebendo uma prop
 * `navigate: (route: string) => void`, usando chaves "de tela" em minúsculo
 * (ex.: 'minhasReservas', 'detalhesReserva') em vez dos nomes registrados
 * no `RootStackParamList` (ex.: 'MinhasReservas', 'DetalhesReserva').
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
  detalhesReserva: "DetalhesReserva",
  minhasReservas: "MinhasReservas",
  solicitarReserva: "SolicitarReserva",
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
};

function useLegacyNavigate() {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList>>();

  return (route: string) => {
    const nomeReal =
      MAPA_ROTAS_LEGADAS[route] ??
      (route as keyof RootStackParamList);

    if (nomeReal === 'HomeScreen') {
      navigation.reset({
        index: 0,
        routes: [{ name: 'HomeScreen' }],
      });

      return;
    }

    navigation.navigate(nomeReal as any);
  };
}

function DetalhesReservaScreen() {
  const navigate = useLegacyNavigate();
  return <DetalhesReserva navigate={navigate} />;
}

function MinhasReservasScreen() {
  const navigate = useLegacyNavigate();
  return <MinhasReservas navigate={navigate} />;
}

function SolicitarReservaScreen() {
  const navigate = useLegacyNavigate();
  return <SolicitarReserva navigate={navigate} />;
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

const Stack = createStackNavigator<RootStackParamList>();

export default function AppRoutes() {
  return (
    <Stack.Navigator
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
          component={CadastroFerramentaScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="MinhasFerramentasScreen"
          component={MinhasFerramentasScreen}
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
          name="DetalhesReserva"
          component={DetalhesReservaScreen}
          options={{
            headerShown: false,
            title:"",
        
          }}
          />
          <Stack.Screen
          name="MinhasReservas"
          component={MinhasReservasScreen}
           options={{
            headerShown: false,
            title:"",
         
          }}
          />
          <Stack.Screen
          name="SolicitarReserva"
          component={SolicitarReservaScreen}
           options={{
            headerShown: false,
            title:"",
          }}
          />
          <Stack.Screen
          name="SolicitacaoEnviada"
          component={SolicitacaoEnviadaScreen}
           options={{
            headerShown: false,
            title:"",
          }}
          />

          <Stack.Screen
          name="CarrinhoScreen"
          component={CarrinhoScreen}
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
          component={NotificacoesScreen}
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

    </Stack.Navigator>
  );
}