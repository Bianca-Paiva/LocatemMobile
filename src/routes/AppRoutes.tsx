import { createStackNavigator } from "@react-navigation/stack";

import CadastroScreen from "../pages/CadastroScreen";
import LoginScreen from "../pages/LoginScreen";

export type RootStackParamList = {
  LoginScreen: undefined,
  CadastroScreen: undefined,
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
    </Stack.Navigator>
  );
}