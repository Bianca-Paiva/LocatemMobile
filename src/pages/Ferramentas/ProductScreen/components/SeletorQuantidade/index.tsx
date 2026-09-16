import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// Importações locais
import { styles } from './styles';
import { SeletorQuantidadeProps } from './types';

export default function SeletorQuantidade({
  quantidade,
  estoqueDisponivel,
  onDecrementar,
  onIncrementar,
}: SeletorQuantidadeProps) {
  
  // Variaveis auxiliares para o estado disabled deixam o JSX mais limpo
  const isMinReached = quantidade <= 1;
  const isMaxReached = quantidade >= estoqueDisponivel;

  return (
    <View style={styles.wrapper}>
      {/* No React Native, aninhar <Text> dentro de <Text> faz com que 
        eles se comportem como <span> na Web (fiquem na mesma linha) 
      */}
      <Text style={styles.label}>
        Quantidade{' '}
        <Text style={styles.estoque}>
          ({estoqueDisponivel} {estoqueDisponivel === 1 ? 'disponível' : 'disponíveis'})
        </Text>
      </Text>

      <View style={styles.linha}>
        <View style={styles.controle}>
          {/* Botão de Decremento */}
          <TouchableOpacity
            style={styles.botao}
            onPress={onDecrementar}
            disabled={isMinReached}
            activeOpacity={0.6} // Feedback de clique apenas se não estiver desabilitado
            accessibilityLabel="Diminuir quantidade"
            accessibilityRole="button"
          >
            <Text style={[styles.botaoText, isMinReached && styles.botaoTextDisabled]}>
              −
            </Text>
          </TouchableOpacity>

          {/* Valor atual */}
          <View style={styles.valorContainer}>
            <Text style={styles.valor}>{quantidade}</Text>
          </View>

          {/* Botão de Incremento */}
          <TouchableOpacity
            style={styles.botao}
            onPress={onIncrementar}
            disabled={isMaxReached}
            activeOpacity={0.6}
            accessibilityLabel="Aumentar quantidade"
            accessibilityRole="button"
          >
            <Text style={[styles.botaoText, isMaxReached && styles.botaoTextDisabled]}>
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}