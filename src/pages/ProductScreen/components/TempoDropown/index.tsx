import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { TempoDropdownProps } from './types';
import { styles } from './styles';

// Mesmas opções da versão Web (PeriodoLocacaoDropdown): "Selecione" + 1 a 30 dias
const TEMPO_OPTIONS = [
  'Selecione',
  ...Array.from({ length: 30 }, (_, i) => {
    const dia = i + 1;
    return dia === 1 ? '1 dia' : `${dia} dias`;
  }),
];

export default function TempoDropdown({ value, onChange, onOpenChange }: TempoDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const closeDropdown = () => {
    setIsOpen(false);
    onOpenChange?.(false);
  };

  const toggleDropdown = () => {
    const next = !isOpen;
    setIsOpen(next);
    onOpenChange?.(next);
  };

  const handleSelect = (option: string) => {
    onChange(option);
    closeDropdown();
  };

  return (
    // Sem Modal: o menu é uma View absoluta ancorada sob o botão, igual ao HorarioDropdown que já existe no projeto. zIndex/elevation sobem quando aberto pra não ficar atrás de outros cards da tela (ProdutosSemelhantes etc).
    <View style={[styles.container, isOpen && styles.containerOpen]}>
      {/* Botão Gatilho */}
      <TouchableOpacity
        style={[styles.trigger, isOpen && styles.triggerAtivo]}
        onPress={toggleDropdown}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityState={{ expanded: isOpen }}
      >
        <Text style={styles.triggerText} numberOfLines={1}>
          {value}
        </Text>
        <Feather
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          size={18}
          color="#374151"
          style={styles.chevron}
        />
      </TouchableOpacity>

      {isOpen && (
        // O ScrollView não tem nenhum Touchable/Pressable como ancestral aqui, então o gesto de rolagem chega até ele sem disputa.
        <View style={styles.menu}>
          <ScrollView showsVerticalScrollIndicator keyboardShouldPersistTaps="handled">
            {TEMPO_OPTIONS.map((item) => {
              const isSelected = item === value;
              return (
                <TouchableOpacity
                  key={item}
                  style={[styles.option, isSelected && styles.optionActive]}
                  onPress={() => handleSelect(item)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.optionText, isSelected && styles.optionTextActive]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
}