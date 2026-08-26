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
  
};

function useLegacyNavigate() {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList>>();

  return (route: string) => {
    const nomeReal = MAPA_ROTAS_LEGADAS[route] ?? (route as keyof RootStackParamList);
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
            backgroundColor: "#f9fafb",
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

    </Stack.Navigator>
  );
}