import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, TouchableWithoutFeedback } from 'react-native';
import { TempoDropdownProps } from './types';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles';

const TEMPO_OPTIONS = [
  'Selecione',
  ...Array.from({ length: 30 }, (_, i) => {
    const dia = i + 1;
    return dia === 1 ? '1 dia' : `${dia} dias`;
  }),
];

export default function TempoDropdown({ value, onChange, onOpenChange }: TempoDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
    if (onOpenChange) onOpenChange(false);
  };

  const toggleDropdown = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (onOpenChange) onOpenChange(newState);
  };

  return (
    <View style={styles.container}>
      
      {/* Botão Gatilho */}
      <TouchableOpacity
        style={[styles.trigger, isOpen && styles.triggerAtivo]}
        onPress={toggleDropdown}
        activeOpacity={0.8}
      >
        <Text style={styles.triggerText}>{value}</Text>
        <Feather
          name={isOpen ? "chevron-up" : "chevron-down"} 
          size={20} 
          color="#374151"
        />
      </TouchableOpacity>

      {/* 🚀 O PULO DO GATO: Modal Transparente para capturar o Scroll */}
      <Modal
        visible={isOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={toggleDropdown}
      >
        {/* Overlay invisível que fecha o menu se clicar fora */}
        <TouchableOpacity 
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.2)' }} 
          activeOpacity={1} 
          onPress={toggleDropdown}
        >
          <TouchableWithoutFeedback>
            {/* A caixinha flutuante que você desenhou, agora centralizada e rolável! */}
            <View style={[styles.dropdownMenu, { position: 'relative', top: 0, width: '80%' }]}>
              <ScrollView
                showsVerticalScrollIndicator={true}
                keyboardShouldPersistTaps="handled"
              >
                {TEMPO_OPTIONS.map((item) => {
                  const isSelected = item === value;
                  return (
                    <TouchableOpacity
                      key={item}
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
                })}
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}