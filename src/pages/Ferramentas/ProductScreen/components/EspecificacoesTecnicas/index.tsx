import React from 'react';
import { View, Text } from 'react-native';

import { EspecificacoesTecnicasProps } from './types';
import { styles } from './styles';

export function EspecificacoesTecnicas({ especificacoes }: EspecificacoesTecnicasProps) {
  // Validação defensiva: se não houver especificações, não renderiza o bloco vazio
  if (!especificacoes || especificacoes.length === 0) {
    return null;
  }

  return (
    <View style={styles.wrapper}>
      <Text style={styles.titulo}>Especificações Técnicas</Text>
      
      <View style={styles.tabela}>
        {especificacoes.map((esp, i) => (
          <View 
            key={i} 
            // Intercala os estilos baseando-se no índice par/ímpar (Efeito Zebra)
            style={[
              styles.linha, 
              i % 2 === 0 ? styles.linhaClara : styles.linhaEscura
            ]}
          >
            <Text style={styles.label}>{esp.label}</Text>
            <Text style={styles.valor}>{esp.valor}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}