import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CadastroScreen from './src/pages/CadastroScreen';
import LoginScreen from './src/pages/LoginScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <CadastroScreen />
      <LoginScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    fontFamily: 'Inter',
  },
});
