import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { styles } from './styles';
import { RentalOptionsFormProps } from './types';

export function RentalOptionsForm({
  availableVoltages,
}: RentalOptionsFormProps) {
  /**
   * Armazena a voltagem atualmente selecionada.
   * Caso exista pelo menos uma opção disponível, a primeira é definida
   * automaticamente como valor inicial.
   */
  const [selectedVoltage, setSelectedVoltage] = useState<string | null>(
    availableVoltages[0] || null
  );

  /**
   * Controla a quantidade de itens que o usuário deseja alugar.
   * O valor inicial é sempre 1.
   */
  const [quantity, setQuantity] = useState<number>(1);

  /**
   * Atualiza a quantidade de produtos.
   *
   * Regras:
   * - Increase: adiciona uma unidade.
   * - Decrease: remove uma unidade, respeitando o limite mínimo de 1.
   */
  const handleQuantityChange = (
    type: 'increase' | 'decrease'
  ) => {
    if (type === 'decrease' && quantity > 1) {
      setQuantity((prev) => prev - 1);
    } else if (type === 'increase') {
      setQuantity((prev) => prev + 1);
    }
  };

  return (
    <View style={styles.container}>

      {/* ==================== Seleção de Voltagem ==================== */}
      <View style={styles.voltageRow}>
        {availableVoltages.map((voltage) => (
          <TouchableOpacity
            key={voltage}
            activeOpacity={0.7}
            style={[
              styles.chip,
              selectedVoltage === voltage && styles.chipSelected,
            ]}
            onPress={() => setSelectedVoltage(voltage)}
          >
            <Text
              style={[
                styles.chipText,
                selectedVoltage === voltage && styles.chipTextSelected,
              ]}
            >
              {voltage}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ================= Tempo e Quantidade ================= */}
      <View style={styles.selectorsRow}>

        {/* Seletor de período de locação */}
        <View style={styles.selectorBox}>
          <Text style={styles.sectionTitle}>Tempo</Text>

          {/* Futuramente este botão abrirá um seletor de dias */}
          <TouchableOpacity
            style={styles.inputContainer}
            activeOpacity={0.7}
          >
            <Text style={styles.inputText}>em dias</Text>

            <MaterialIcons
              name="keyboard-arrow-down"
              size={20}
              color="#666"
            />
          </TouchableOpacity>
        </View>

        {/* Controle da quantidade de itens */}
        <View style={styles.selectorBox}>
          <Text style={styles.sectionTitle}>Quantidade</Text>

          <View style={styles.inputContainer}>

            {/* Diminui a quantidade respeitando o limite mínimo */}
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => handleQuantityChange('decrease')}
            >
              <MaterialIcons
                name="remove"
                size={18}
                color={quantity > 1 ? '#000' : '#CCC'}
              />
            </TouchableOpacity>

            {/* Quantidade atualmente selecionada */}
            <Text style={styles.inputText}>
              {quantity}
            </Text>

            {/* Incrementa a quantidade */}
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => handleQuantityChange('increase')}
            >
              <MaterialIcons
                name="add"
                size={18}
                color="#000"
              />
            </TouchableOpacity>

          </View>
        </View>

      </View>
    </View>
  );
}