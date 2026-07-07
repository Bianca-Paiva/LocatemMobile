import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { styles } from './styles';
import { AccordionProps } from './types';

export function Accordion({ title, children }: AccordionProps) {
  // Nota: Deixei true por padrão só para você ver o layout logo de cara, 
  // mas depois você pode voltar para false se quiser que comece fechado.
  const [isExpanded, setIsExpanded] = useState(true); 

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.header} 
        activeOpacity={0.7} 
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <Text style={styles.title}>{title}</Text>
        <MaterialIcons 
          name={isExpanded ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
          size={24} 
          color="#333" 
        />
      </TouchableOpacity>

      {/* Renderiza o "recheio" dinâmico */}
      {isExpanded && (
        <View style={styles.contentContainer}>
          {children}
        </View>
      )}
    </View>
  );
}