import { View, Text, TouchableOpacity } from 'react-native';
import { CreditCard, QrCode, Landmark } from 'lucide-react-native';

import type { FormaPagamento } from '../../../types/cartao.types';
import colors from '../../../theme/colors';
import styles from './styles';

interface Opcao {
  id: FormaPagamento;
  label: string;
  Icone: typeof CreditCard;
}

const OPCOES: Opcao[] = [
  { id: 'credito', label: 'Cartão de Crédito', Icone: CreditCard },
  { id: 'debito', label: 'Cartão de Débito', Icone: Landmark },
  { id: 'pix', label: 'PIX', Icone: QrCode },
];

interface SeletorFormaPagamentoProps {
  /** Forma de pagamento atualmente marcada, ou null se nenhuma foi escolhida ainda. */
  selecionado: FormaPagamento | null;
  /** Disparado ao tocar em uma das opções (crédito, débito ou PIX). */
  onSelecionar: (forma: FormaPagamento) => void;
}

export function SeletorFormaPagamento({ selecionado, onSelecionar }: SeletorFormaPagamentoProps) {
  return (
    <View style={styles.card} accessibilityRole="radiogroup" accessibilityLabel="Forma de pagamento">
      <Text style={styles.titulo}>Forma de Pagamento</Text>

      <View style={styles.grupo}>
        {OPCOES.map(({ id, label, Icone }) => {
          const ativo = selecionado === id;

          return (
            <TouchableOpacity
              key={id}
              style={[styles.botao, ativo && styles.botaoAtivo]}
              onPress={() => onSelecionar(id)}
              accessibilityRole="radio"
              accessibilityState={{ checked: ativo }}
            >
              <Icone size={18} color={ativo ? colors.textDark : colors.textMuted} />
              <Text style={[styles.botaoTexto, ativo && styles.botaoTextoAtivo]}>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
