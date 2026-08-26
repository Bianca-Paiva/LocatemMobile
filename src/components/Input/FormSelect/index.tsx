// Não existe <select> nativo no RN, então isso reproduz o mesmo papel do
// FormSelect da Web usando um botão que abre uma "folha" (bottom sheet) com a lista de opções.
import { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Pressable, FlatList, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './styles';
import colors from '../../../theme/colors';
import type { FormSelectProps } from './types';

export default function FormSelect({
  id,
  label,
  required,
  placeholder = 'Selecione',
  options,
  value,
  error,
  shake,
  onChange,
}: FormSelectProps) {
  const [aberto, setAberto] = useState(false);
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!shake) return;
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: -4, duration: 55, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 4, duration: 55, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -4, duration: 55, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 4, duration: 55, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 55, useNativeDriver: true }),
    ]).start();
  }, [shake]);

  return (
    <View style={styles.wrapper}>
      {label ? (
        <Text style={styles.label}>
          {label}
          {required ? <Text style={styles.obrigatorio}> *</Text> : null}
        </Text>
      ) : null}

      <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
        <TouchableOpacity
          nativeID={id}
          style={[styles.campo, error ? styles.campoErro : null]}
          onPress={() => setAberto(true)}
          activeOpacity={0.7}
        >
          <Text style={value ? styles.valorTexto : styles.placeholderTexto} numberOfLines={1}>
            {value || placeholder}
          </Text>
          <MaterialCommunityIcons name="chevron-down" size={20} color={colors.textMuted} />
        </TouchableOpacity>
      </Animated.View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Modal visible={aberto} transparent animationType="fade" onRequestClose={() => setAberto(false)}>
        <Pressable style={styles.overlay} onPress={() => setAberto(false)}>
          <Pressable style={styles.folha} onPress={(e) => e.stopPropagation()}>
            <View style={styles.folhaCabecalho}>
              <Text style={styles.folhaTitulo}>{label || placeholder}</Text>
              <TouchableOpacity onPress={() => setAberto(false)} accessibilityLabel="Fechar">
                <MaterialCommunityIcons name="close" size={22} color={colors.textMuted} />
              </TouchableOpacity>
            </View>

            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => {
                const selecionado = item === value;
                return (
                  <TouchableOpacity
                    style={[styles.opcao, selecionado && styles.opcaoSelecionada]}
                    onPress={() => {
                      onChange(item);
                      setAberto(false);
                    }}
                  >
                    <Text style={[styles.opcaoTexto, selecionado && styles.opcaoTextoSelecionado]}>
                      {item}
                    </Text>
                    {selecionado ? (
                      <MaterialCommunityIcons name="check" size={18} color={colors.textDark} />
                    ) : null}
                  </TouchableOpacity>
                );
              }}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
