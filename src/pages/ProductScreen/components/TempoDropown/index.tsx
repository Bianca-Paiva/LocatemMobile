import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

// Importação do tipo de props
import { TempoDropdownProps } from './types';
// Importação do icone da seta
import { Feather } from '@expo/vector-icons';
// Importação dos estilos da tela
import { styles } from './styles';

const TEMPO_OPTIONS = [
  'Selecione',
  ...Array.from({ length: 30 }, (_, i) => {
    const dia = i + 1;
    return dia === 1 ? '1 dia' : `${dia} dias`;
  }),
];

export default function TempoDropdown({ value, onChange }: TempoDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    // 🚀 ARQUITETURA MOBILE: O zIndex dinâmico garante que o container sobreponha o restante da tela
    <View style={[styles.container, isOpen && styles.containerOpen]}>
      
      {/* Botão Gatilho */}
      <TouchableOpacity
        style={[styles.trigger, isOpen && styles.triggerAtivo]}
        onPress={() => setIsOpen(!isOpen)}
        activeOpacity={0.8}
        accessibilityRole="button"
      >
        <Text style={styles.triggerText}>{value}</Text>
        <Feather
          name={isOpen ? "chevron-up" : "chevron-down"} 
          size={20} 
          color="#374151"
        />
      </TouchableOpacity>

      {/* Menu Flutuante (Renderizado condicionalmente sem Modal) */}
      {isOpen && (
        <View style={styles.dropdownMenu}>
          <FlatList
            data={TEMPO_OPTIONS}
            keyExtractor={(item) => item}
            showsVerticalScrollIndicator={true}
            // ⚠️ OBRIGATÓRIO NO MOBILE: Permite que essa lista role mesmo estando dentro da ScrollView da tela principal
            nestedScrollEnabled={true} 
            renderItem={({ item }) => {
              const isSelected = item === value;
              return (
                <TouchableOpacity
                  style={[
                    styles.option,
                    isSelected && styles.optionActive,
                  ]}
                  onPress={() => handleSelect(item)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.optionText,
                      isSelected && styles.optionTextActive,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
    </View>
  );
}