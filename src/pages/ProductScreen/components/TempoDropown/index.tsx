import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';

//impotacao do tipo de props
import { TempoDropdownProps } from './types';

//importacao do icone da seta
import { Feather } from '@expo/vector-icons';

//impotacao dos estilos da tela
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
    <View style={styles.container}>
      {/* Botão Gatilho */}
      <TouchableOpacity
        style={[styles.trigger, isOpen && styles.triggerAtivo]}
        onPress={() => setIsOpen(true)}
        activeOpacity={0.8}
        accessibilityRole="button"
      >
        <Text style={styles.triggerText}>{value}</Text>
        
        {/* Rotação condicional direto no React Native */}
        <Feather
            name={isOpen ? "chevron-up" : "chevron-down"} 
            size={24} 
            color="#374151"/>
      </TouchableOpacity>

      {/* Modal / Bottom Sheet nativo substituindo a <ul> */}
      <Modal
        visible={isOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setIsOpen(false)} // Comportamento do botão "voltar" do Android
      >
        {/* Detecta clique fora para fechar */}
        <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
          <View style={styles.modalOverlay}>
            
            {/* Evita que o clique na lista feche o modal */}
            <TouchableWithoutFeedback>
              <View style={styles.menuContainer}>
                
                <Text style={styles.menuHeader}>Selecione o Tempo</Text>
                
                <FlatList
                  data={TEMPO_OPTIONS}
                  keyExtractor={(item) => item}
                  showsVerticalScrollIndicator={false}
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
            </TouchableWithoutFeedback>

          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}