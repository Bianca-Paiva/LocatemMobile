import { NavigationContainer } from '@react-navigation/native';

import AppRoutes from './src/routes/AppRoutes';
import { useFonts } from 'expo-font';

import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
} from '@expo-google-fonts/inter';

import { FerramentasProvider } from './src/context/Ferramentas/FerramentasContext';
import { LocacaoProvider } from './src/context/Locacoes/LocacaoContext';
import { CarrinhoProvider } from "./src/context/Checkout/Carrinho/CarrinhoContext";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { CatalogoProvider } from './src/context/Ferramentas/Catalogo/CatalogoContext';
import { PagamentoProvider } from './src/context/Checkout/Pagamento/PagamentoContext';
import { AuthProvider } from './src/context/Auth/AuthContext';

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
    <AuthProvider>
      <CatalogoProvider>
        <FerramentasProvider>
          <LocacaoProvider>
            <CarrinhoProvider>
              <PagamentoProvider>
                <NavigationContainer>
                    <AppRoutes />
                </NavigationContainer>
              </PagamentoProvider>
            </CarrinhoProvider>
          </LocacaoProvider>
       </FerramentasProvider>
      </CatalogoProvider>
    </AuthProvider>
      

    </GestureHandlerRootView>
   
  );
}
