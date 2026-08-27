import { NavigationContainer } from "@react-navigation/native";

import AppRoutes from "./src/routes/AppRoutes";

import { useFonts } from "expo-font";

import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

import { FerramentasProvider } from "./src/context/FerramentasContext";
import { ReservaProvider } from "./src/context/ReservaContext";

import { GestureHandlerRootView } from "react-native-gesture-handler";

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <FerramentasProvider>
        <ReservaProvider>
          <NavigationContainer>
            <AppRoutes />
          </NavigationContainer>
        </ReservaProvider>
      </FerramentasProvider>
    </GestureHandlerRootView>
  );
}