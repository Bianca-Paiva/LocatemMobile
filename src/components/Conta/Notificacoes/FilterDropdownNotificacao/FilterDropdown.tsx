import React, { useRef, useState } from 'react';

import {
  View,
  Text,
  Pressable,
  Modal,
} from 'react-native';

import { ChevronDown, Check } from 'lucide-react-native';

import type { FilterOption } from '../../../../pages/Conta/Notificacoes/Notificacoes.types';
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
  // Posição do menu em coordenadas de tela, calculada a partir do botão — o Modal renderiza
  // por fora da árvore da tela, então não dá pra confiar em `position: relative` do container.
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<View>(null);

  const handleSelect = (option: FilterOption) => {
    onChange(option);
    setIsOpen(false); // seleciona e já fecha o menu
  };

  const handleToggle = () => {
    if (isOpen) {
      setIsOpen(false);
      return;
    }

    // Mede a posição/tamanho reais do botão na tela (funciona em qualquer tela que use
    // este componente, independente de ter ou não uma barra de busca acima) e só então
    // abre o menu já ancorado logo abaixo dele.
    triggerRef.current?.measureInWindow((x, y, _width, height) => {
      setMenuPosition({ top: y + height + 6, left: x });
      setIsOpen(true);
    });
  };

  return (
    <View style={styles.container}>
       <Pressable ref={triggerRef} style={styles.trigger} onPress={handleToggle}>
         <Text style={styles.triggerText}>{value}</Text>
         <ChevronDown size={14} color="#4B4B4B" style={{transform: [{ rotate: isOpen ? '180deg' : '0deg' }]}} />
     </Pressable>

       <Modal visible={isOpen} transparent statusBarTranslucent animationType="fade" onRequestClose={() => setIsOpen(false)}>
        <Pressable style={styles.overlay} onPress={() => setIsOpen(false)}>
          <View style={[styles.menu, { top: menuPosition.top, left: menuPosition.left }]}>
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
