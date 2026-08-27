// Modal de tela cheia que abre quando o usuário toca em um SecaoCard.
// É aqui que o formulário "grande" de cada seção da Web vira uma tela dedicada no mobile.

import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { NestableScrollContainer } from 'react-native-draggable-flatlist';

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
}: SecaoModalProps) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.safe}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
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
                <Text style={styles.obrigatorio}> *</Text>
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

        {/* 
          IMPORTANTE:
          Este container substitui o ScrollView comum porque dentro dele
          existe uma NestableDraggableFlatList.
          
          Isso permite que:
          - o modal continue rolando normalmente;
          - a lista de fotos receba o gesto de arrastar;
          - seja possível arrastar uma foto para outra posição.
        */}
        <NestableScrollContainer
          contentContainerStyle={styles.conteudo}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {children}
        </NestableScrollContainer>

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