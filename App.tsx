import { NavigationContainer } from '@react-navigation/native';

import AppRoutes from './src/routes/AppRoutes';
import CadastroScreen from "./src/pages/Cadastro/index";
import { useFonts } from 'expo-font';

import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
} from '@expo-google-fonts/inter';

import { FerramentasProvider } from './src/context/FerramentasContext';
import { ReservaProvider } from './src/context/ReservaContext';
import { CarrinhoProvider } from "./src/context/CarrinhoContext";

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
      <CatalogoProvider>
      <FerramentasProvider>
          <ReservaProvider>
              <NavigationContainer>
              <AppRoutes />
            </NavigationContainer>
            </ReservaProvider>
        </FerramentasProvider>
    </GestureHandlerRootView>
    </CatalogoProvider>
  );
}