import { createStackNavigator } from "@react-navigation/stack";

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
  
}

const Stack = createStackNavigator();

export default function AppRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="CadastroScreen"
        component={CadastroScreen}
      />

      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
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
          name="Avaliacao"
          component={Avaliacao}
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
          name="DetalhesReserva"
          component={DetalhesReserva}
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
          name="MinhasReservas"
          component={MinhasReservas}
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
          name="SolicitarReserva"
          component={SolicitarReserva}
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
          name="SolicitacaoEnviada"
          component={SolicitacaoEnviada}
           options={{
            headerShown: true,
            title:"",
            headerStyle: {
             backgroundColor: "#f9fafb",
            },
            headerShadowVisible: false,
          }}
          />

    </Stack.Navigator>
  );
}