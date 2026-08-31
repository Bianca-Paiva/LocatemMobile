import { View, Text, TouchableOpacity } from 'react-native';
import { Check } from 'lucide-react-native';

import ItemCarrinho from '../ItemCarrinho';
import styles from './styles';
import type { LojaGroupData } from '../../../types/checkout';

interface LojaGroupProps {
  loja: LojaGroupData;
  onQuantidadeChange: (id: string, quantidade: number) => void;
  onDiasChange: (id: string, dias: number) => void;
  onRemoveItem: (id: string) => void;
  onSelecionarItem: (id: string) => void;
  onSelecionarLoja: (ids: string[], selecionado: boolean) => void;
}

export default function LojaGroup({
  loja,
  onQuantidadeChange,
  onDiasChange,
  onRemoveItem,
  onSelecionarItem,
  onSelecionarLoja,
}: LojaGroupProps) {
  const todosSelecionados = loja.itens.length > 0 && loja.itens.every((item) => item.selecionado);

  return (
    <View style={styles.card}>
      <View style={styles.cabecalho}>
        <TouchableOpacity
          style={styles.selecionarLoja}
          onPress={() => onSelecionarLoja(loja.itens.map((item) => item.id), !todosSelecionados)}
          accessibilityLabel={`Selecionar todos os produtos de ${loja.nomeLoja}`}
        >
          <View style={[styles.checkbox, todosSelecionados && styles.checkboxMarcado]}>
            {todosSelecionados && <Check size={12} color="#FFFFFF" strokeWidth={3} />}
          </View>

          <Text style={styles.nomeLoja}>{loja.nomeLoja}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.itens}>
        {loja.itens.map((item) => (
          <ItemCarrinho
            key={item.id}
            item={item}
            onQuantidadeChange={onQuantidadeChange}
            onDiasChange={onDiasChange}
            onRemove={onRemoveItem}
            onSelecionar={onSelecionarItem}
          />
        ))}
      </View>
    </View>
  );
}
