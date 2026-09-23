import { Modal, View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SuccessModalProps {
  open: boolean;
  title: string;
  message: string;
  buttonText: string;
  onConfirm: () => void;
}

// TODO: se o projeto já tiver um arquivo de tema (ex.: src/theme/colors.ts), troque estas
// constantes pelos tokens existentes em vez de duplicar os valores aqui.
const COLOR_SUCCESS = '#2ECC71';
const COLOR_TITLE = '#222222';
const COLOR_MESSAGE = '#666666';

/**
 * Adaptado do SuccessModal web (CSS Modules) para React Native/Expo:
 * - `svg` com o path do check → ícone `checkmark` do `@expo/vector-icons` (Ionicons), já incluso no Expo.
 * - `backdrop-filter: blur(8px)` do overlay não tem equivalente nativo direto; foi usado apenas um fundo
 *   escurecido semi-transparente. Se o blur for importante, dá para usar o componente `BlurView` do pacote
 *   `expo-blur`.
 * - As animações de `fade`/`pop` em CSS (`@keyframes`) não foram recriadas — o `Modal` já anima a entrada
 *   com `animationType="fade"`. Para reproduzir o "pop" (escala), dá pra usar `Animated`/`Reanimated`.
 * - `BtnPrincipal` do projeto web não existe aqui; o botão foi recriado com `Pressable`. Se o LocatemMobile
 *   já tiver um componente de botão equivalente, prefira importá-lo no lugar deste.
 */
export default function SuccessModal({ open, title, message, buttonText, onConfirm }: SuccessModalProps) {
  return (
    <Modal visible={open} transparent animationType="fade" statusBarTranslucent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.icon}>
            <Ionicons name="checkmark" size={38} color="#FFFFFF" />
          </View>

          <Text style={styles.title}>{title}</Text>

          <Text style={styles.message}>{message}</Text>

          <Pressable style={styles.button} onPress={onConfirm}>
            <Text style={styles.buttonText}>{buttonText}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modal: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.18,
        shadowRadius: 50,
      },
      android: { elevation: 10 },
    }),
  },
  icon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLOR_SUCCESS,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLOR_TITLE,
    textAlign: 'center',
    marginBottom: 14,
  },
  message: {
    fontSize: 15,
    lineHeight: 24,
    color: COLOR_MESSAGE,
    textAlign: 'center',
    marginBottom: 28,
  },
  button: {
    width: '100%',
    height: 48,
    borderRadius: 10,
    backgroundColor: COLOR_SUCCESS,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
