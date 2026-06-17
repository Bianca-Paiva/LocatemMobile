import { createStackNavigator } from "@react-navigation/stack";

import CadastroScreen from "../pages/CadastroScreen";
import LoginScreen from "../pages/LoginScreen";
import ReceiveTokenScreen from "../pages/receiveToken/ReceiveToken";
import { RecoveryRequisitionScreen } from "../pages/recoveryRequisition/RecoveryRequisition";

export type RootStackParamList = {
  LoginScreen: undefined,
  CadastroScreen: undefined,
  RecoveryRequisitionScreen: undefined,
  ReceiveTokenScreen: undefined,
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
        name="RecoveryRequisitionScreen"
        component={RecoveryRequisitionScreen}
        options={{headerShown: true, title:""}}
      />

      <Stack.Screen
        name="ReceiveTokenScreen"
        component={ReceiveTokenScreen}/>
    </Stack.Navigator>
  );
}