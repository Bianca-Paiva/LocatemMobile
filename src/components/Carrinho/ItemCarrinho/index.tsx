import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Trash2, Check } from 'lucide-react-native';

import SeletorQuantidade from '../../Input/SeletorQuantidade';
import colors from '../../../theme/colors';
import styles from './styles';
import type { CarrinhoItemData } from '../../../types/checkout';

interface ItemCarrinhoProps {
  item: CarrinhoItemData;
  /** Máximo de dias que dá pra escolher no seletor de período (padrão 30, igual à Web) */
  diasMaximo?: number;
  onQuantidadeChange: (id: string, quantidade: number) => void;
  onDiasChange: (id: string, dias: number) => void;
  onRemove: (id: string) => void;
  onSelecionar: (id: string) => void;
}

const formatarPreco = (valor: number) => `R$ ${valor.toFixed(2).replace('.', ',')}`;

export default function ItemCarrinho({
  item,
  diasMaximo = 30,
  onQuantidadeChange,
  onDiasChange,
  onRemove,
  onSelecionar,
}: ItemCarrinhoProps) {
  const total = item.precoUnitario * item.quantidade * item.dias;

  return (
    <View style={styles.item}>
      <View style={styles.linhaPrincipal}>
        <TouchableOpacity
          style={[styles.checkbox, item.selecionado && styles.checkboxMarcado]}
          onPress={() => onSelecionar(item.id)}
          accessibilityLabel={`Selecionar ${item.title}`}
        >
          {item.selecionado && <Check size={12} color="#FFFFFF" strokeWidth={3} />}
        </TouchableOpacity>

        <Image source={item.image} style={styles.imagem} resizeMode="contain" />

        <View style={styles.info}>
          <Text style={styles.titulo} numberOfLines={2}>
            {item.title}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.remover}
          onPress={() => onRemove(item.id)}
          accessibilityLabel="Remover item"
        >
          <Trash2 size={18} color={colors.textMuted2} />
        </TouchableOpacity>
      </View>

      <View style={styles.controles}>
        <View style={styles.controle}>
          <SeletorQuantidade
            quantidade={item.dias}
            minimo={1}
            maximo={diasMaximo}
            label="Período (dias)"
            onDecrementar={() => onDiasChange(item.id, item.dias - 1)}
            onIncrementar={() => onDiasChange(item.id, item.dias + 1)}
          />
        </View>

        <View style={styles.controle}>
          <SeletorQuantidade
            quantidade={item.quantidade}
            minimo={1}
            maximo={item.estoqueDisponivel ?? 999}
            label="Quantidade"
            onDecrementar={() => onQuantidadeChange(item.id, item.quantidade - 1)}
            onIncrementar={() => onQuantidadeChange(item.id, item.quantidade + 1)}
          />
        </View>
      </View>

      <Text style={styles.total}>Total: {formatarPreco(total)}</Text>
    </View>
  );
}
