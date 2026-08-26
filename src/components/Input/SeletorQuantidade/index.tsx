import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './styles';
import colors from '../../../theme/colors';
import type { SeletorQuantidadeProps } from './types';

export default function SeletorQuantidade({
  quantidade,
  onIncrementar,
  onDecrementar,
  minimo = 1,
  maximo = 999,
  label = 'Quantidade Disponível',
}: SeletorQuantidadeProps) {
  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View style={styles.stepper}>
        <TouchableOpacity
          style={[styles.botao, quantidade <= minimo && styles.botaoDesabilitado]}
          onPress={onDecrementar}
          disabled={quantidade <= minimo}
          accessibilityLabel="Diminuir quantidade"
        >
          <MaterialCommunityIcons name="minus" size={18} color={colors.textDark} />
        </TouchableOpacity>

        <Text style={styles.valor}>{quantidade}</Text>

        <TouchableOpacity
          style={[styles.botao, quantidade >= maximo && styles.botaoDesabilitado]}
          onPress={onIncrementar}
          disabled={quantidade >= maximo}
          accessibilityLabel="Aumentar quantidade"
        >
          <MaterialCommunityIcons name="plus" size={18} color={colors.textDark} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
