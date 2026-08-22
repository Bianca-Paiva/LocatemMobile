import { createStackNavigator } from "@react-navigation/stack";

import {HomeScreen} from "../pages/home/HomeScreen";
import {SearchScreen} from "../pages/Search/SearchScreen";
import CadastroScreen from "../pages/Cadastro";
import LoginScreen from "../pages/Login";
import ReceiveTokenScreen from "../pages/receiveToken/ReceiveToken";
import { RecoveryRequisitionScreen } from "../pages/recoveryRequisition/RecoveryRequisition";
import RecoveryPasswordScreen from "../pages/recoveryPassword/RecoveryPasswordScreen";
import  ProductScreen  from "../pages/ProductScreen";
import CadastroFerramentaScreen from "../pages/CadastroFerramenta";

export type RootStackParamList = {
  LoginScreen: undefined,
  CadastroScreen: undefined,
  HomeScreen: undefined,
  SearchScreen: { search: string },
  RecoveryRequisitionScreen: undefined,
  ReceiveTokenScreen: undefined,
  RecoveryPasswordScreen:undefined,
  ProductScreen: undefined,
  CadastroFerramentaScreen: undefined,
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
    </Stack.Navigator>
  );
}