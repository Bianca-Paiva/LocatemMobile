import { View, Text } from 'react-native';
import { ShoppingCart } from 'lucide-react-native';

import BtnPrincipal from '../../BtnPrincipal';
import colors from '../../../theme/colors';
import styles from './styles';

interface CarrinhoVazioProps {
  onConferirProdutos?: () => void;
}

export default function CarrinhoVazio({ onConferirProdutos }: CarrinhoVazioProps) {
  return (
    <View style={styles.wrapper}>
      <ShoppingCart size={48} color={colors.textMuted2} />

      <Text style={styles.titulo}>Seu carrinho está vazio</Text>

      <Text style={styles.texto}>
        Explore nosso catálogo e encontre a ferramenta ideal para o seu projeto.
      </Text>

      {onConferirProdutos && (
        <View style={styles.botaoWrapper}>
          <BtnPrincipal title="Conferir produtos" onPress={onConferirProdutos} />
        </View>
      )}
    </View>
  );
}
