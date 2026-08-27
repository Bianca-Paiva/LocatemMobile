import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

// Importante: ScrollView vem daqui (react-native-gesture-handler), não de
// 'react-native'. Essa versão participa do mesmo sistema de reconhecimento
// de gestos usado pelo Gesture.Pan() do FotosFerramenta, permitindo que o
// scroll ceda a vez pro gesto de arrastar reordenar as fotos.
import { ScrollView } from 'react-native-gesture-handler';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import styles from './styles';

import colors from '../../../theme/colors';

import type { SecaoModalProps } from './types';

export default function SecaoModal({
  visible,
  onClose,
  icone,
  titulo,
  obrigatorio,
  subtitulo,
  children,
  scrollEnabled = true,
}: SecaoModalProps) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.safe}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : undefined
        }
      >
        <View style={styles.cabecalho}>
          <View style={styles.iconeBadge}>
            <MaterialCommunityIcons
              name={icone as any}
              size={20}
              color={colors.amber}
            />
          </View>

          <View style={styles.textos}>
            <Text style={styles.titulo}>
              {titulo}
              {obrigatorio ? (
                <Text style={styles.obrigatorio}>
                  {' '}*
                </Text>
              ) : null}
            </Text>

            <Text style={styles.subtitulo}>
              {subtitulo}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.botaoFechar}
            onPress={onClose}
            accessibilityLabel="Fechar seção"
          >
            <MaterialCommunityIcons
              name="close"
              size={22}
              color={colors.textMuted}
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.conteudo}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          scrollEnabled={scrollEnabled}
        >
          {children}
        </ScrollView>

        <View style={styles.rodape}>
          <TouchableOpacity
            style={styles.botaoConcluir}
            onPress={onClose}
            activeOpacity={0.85}
          >
            <Text style={styles.botaoConcluirTexto}>
              Concluído
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
