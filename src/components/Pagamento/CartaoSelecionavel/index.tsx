import { View, Text, TouchableOpacity } from 'react-native';

import type { Cartao } from '../../../types/cartao.types';
import colors from '../../../theme/colors';
import styles from './styles';

// Sigla curta exibida no selo da bandeira. A Web usa imagens (Visa/Master/etc.)
// que não fazem parte dos assets do Mobile — aqui o mesmo papel visual é
// cumprido por um selo com a sigla, mantendo o layout do card.
function siglaBandeira(bandeira: string): string {
  const nome = bandeira.trim().toLowerCase();

  if (nome.includes('visa')) return 'VISA';
  if (nome.includes('master')) return 'MC';
  if (nome.includes('elo')) return 'ELO';
  if (nome.includes('amex') || nome.includes('american')) return 'AMEX';
  if (nome.includes('diners')) return 'DIN';
  if (nome.includes('discover')) return 'DISC';

  return 'CARTÃO';
}

interface CartaoSelecionavelProps {
  cartao: Cartao;
  selecionado: boolean;
  onSelecionar: (id: number) => void;
}

export function CartaoSelecionavel({ cartao, selecionado, onSelecionar }: CartaoSelecionavelProps) {
  return (
    <TouchableOpacity
      style={[styles.cartao, selecionado && styles.cartaoAtivo]}
      onPress={() => onSelecionar(cartao.id)}
      accessibilityRole="radio"
      accessibilityState={{ checked: selecionado }}
    >
      <View style={styles.cartaoIcone}>
        <Text style={styles.cartaoIconeTexto}>{siglaBandeira(cartao.bandeira)}</Text>
      </View>

      <View style={styles.cartaoInfo}>
        <Text style={styles.cartaoTitulo}>
          {cartao.bandeira} - Final {cartao.final}
        </Text>
        <Text style={styles.cartaoTitular}>{cartao.titular}</Text>
      </View>

      <View style={[styles.radioExterno, selecionado && styles.radioExternoAtivo]}>
        {selecionado && <View style={styles.radioInterno} />}
      </View>
    </TouchableOpacity>
  );
}
