import { View, Text, TouchableOpacity } from 'react-native';
import { Plus } from 'lucide-react-native';

import colors from '../../../../theme/colors';

import { styles } from './styles';

interface HomeLocadorCardNovaFerramentaProps {
  onPress: () => void;
}

/** Card "+ Cadastrar nova ferramenta" ao final do carrossel de "Minhas Ferramentas" da Home do Locador. */
export default function HomeLocadorCardNovaFerramenta({
  onPress,
}: HomeLocadorCardNovaFerramentaProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.iconeWrapper}>
        <Plus size={22} strokeWidth={2} color={colors.textMuted} />
      </View>

      <Text style={styles.texto}>Cadastrar nova ferramenta</Text>
    </TouchableOpacity>
  );
}
