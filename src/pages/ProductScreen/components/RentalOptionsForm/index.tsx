import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { styles } from './styles';
import { RentalOptionsFormProps } from './types';

export function RentalOptionsForm({ availableVoltages }: RentalOptionsFormProps) {
  // Estados Locais para guardar as escolhas do usuário
  const [selectedVoltage, setSelectedVoltage] = useState<string | null>(availableVoltages[0] || null);
  const [quantity, setQuantity] = useState<number>(1);

  // Regra de negócio: Impede que a quantidade seja menor que 1
  const handleQuantityChange = (type: 'increase' | 'decrease') => {
    if (type === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    } else if (type === 'increase') {
      setQuantity(prev => prev + 1);
    }
  };

  return (
    <View style={styles.container}>
      
      {/* Bloco de Voltagem */}
      <View style={styles.voltageRow}>
        {availableVoltages.map((voltage) => (
          <TouchableOpacity
            key={voltage}
            activeOpacity={0.7}
            style={[
              styles.chip,
              selectedVoltage === voltage && styles.chipSelected
            ]}
            onPress={() => setSelectedVoltage(voltage)}
          >
            <Text style={[
              styles.chipText,
              selectedVoltage === voltage && styles.chipTextSelected
            ]}>
              {voltage}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bloco de Tempo e Quantidade */}
      <View style={styles.selectorsRow}>
        
        {/* Seletor de Tempo */}
        <View style={styles.selectorBox}>
          <Text style={styles.sectionTitle}>Tempo</Text>
          <TouchableOpacity style={styles.inputContainer} activeOpacity={0.7}>
            <Text style={styles.inputText}>em dias</Text>
            <MaterialIcons name="keyboard-arrow-down" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Seletor de Quantidade */}
        <View style={styles.selectorBox}>
          <Text style={styles.sectionTitle}>Quantidade</Text>
          <View style={styles.inputContainer}>
            <TouchableOpacity onPress={() => handleQuantityChange('decrease')} style={styles.actionBtn}>
              <MaterialIcons name="remove" size={18} color={quantity > 1 ? "#000" : "#CCC"} />
            </TouchableOpacity>
            
            <Text style={styles.inputText}>{quantity}</Text>
            
            <TouchableOpacity onPress={() => handleQuantityChange('increase')} style={styles.actionBtn}>
              <MaterialIcons name="add" size={18} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </View>
  );
}