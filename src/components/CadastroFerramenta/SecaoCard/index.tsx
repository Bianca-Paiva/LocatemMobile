// Peça central do pedido: card compacto com ícone + nome da seção.
// Ao tocar, abre o SecaoModal correspondente (controlado pela tela principal).
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './styles';
import colors from '../../../theme/colors';
import type { SecaoCardProps } from './types';

export default function SecaoCard({
  icone,
  titulo,
  obrigatorio,
  completo,
  comErro,
  onPress,
}: SecaoCardProps) {
  return (
    <TouchableOpacity
      style={[styles.card, comErro && styles.cardErro, completo && !comErro && styles.cardCompleto]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <View style={styles.iconeBadge}>
        <MaterialCommunityIcons name={icone as any} size={20} color={colors.amber} />
      </View>

      <View>
        <Text style={styles.titulo} numberOfLines={2}>
          {titulo}
          {obrigatorio ? <Text style={styles.obrigatorio}> *</Text> : null}
        </Text>

        <View style={styles.statusRow}>
          {comErro ? (
            <>
              <MaterialCommunityIcons name="alert-circle" size={13} color={colors.error} />
              <Text style={[styles.statusTexto, styles.statusTextoErro]}>Pendente</Text>
            </>
          ) : completo ? (
            <>
              <MaterialCommunityIcons name="check-circle" size={13} color={colors.success} />
              <Text style={[styles.statusTexto, styles.statusTextoCompleto]}>Completo</Text>
            </>
          ) : (
            <Text style={styles.statusTexto}>Toque para preencher</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
