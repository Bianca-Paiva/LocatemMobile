import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import AppRoutes from "./src/routes/AppRoutes";
import CadastroScreen from "./src/pages/CadastroScreen";

import { useFonts } from "expo-font";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
  );
}