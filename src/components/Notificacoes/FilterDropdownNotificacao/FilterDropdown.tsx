import React, { useState } from 'react';

import {
  View,
  Text,
  Pressable,
  Modal,
} from 'react-native';

import { ChevronDown } from 'lucide-react-native';

import type { FilterOption } from '../../../pages/Notificacoes/Notificacoes.types';
import { styles } from './styles';

const OPTIONS: FilterOption[] = ['Todas', 'Hoje', 'Ontem', 'Esta semana', 'Este mês'];

interface FilterDropdownProps {
  value: FilterOption;
  onChange: (value: FilterOption) => void;
}

// Dropdown do filtro de período (segue o mesmo padrão do SortFilter já usado na Busca):
// abre/fecha com um estado local e usa um Modal transparente só pra fechar ao tocar fora.
export default function FilterDropdown({ value, onChange }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: FilterOption) => {
    onChange(option);
    setIsOpen(false); // seleciona e já fecha o menu
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.trigger} onPress={() => setIsOpen((prev) => !prev)}>
        <Text style={styles.triggerText}>{value}</Text>
        <ChevronDown size={14} color="#4B4B4B" />
      </Pressable>

      <Modal visible={isOpen} transparent animationType="fade" onRequestClose={() => setIsOpen(false)}>
        <Pressable style={styles.overlay} onPress={() => setIsOpen(false)}>
          <View style={styles.menu}>
            {OPTIONS.map((option) => {
              const active = option === value;
              return (
                <Pressable
                  key={option}
                  style={[styles.option, active && styles.optionActive]}
                  onPress={() => handleSelect(option)}
                >
                  <Text style={[styles.optionText, active && styles.optionTextActive]}>
                    {option}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
