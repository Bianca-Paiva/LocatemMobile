import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { AcessoriosProps } from './types';
import { styles } from './styles';

/**
 * Card "Acessórios Inclusos" da tela de Produto.
 * Adaptado de `web/src/components/ProdutoDetalhe/Acessorios/Acessorios.tsx`,
 * seguindo o mesmo padrão visual/arquitetural já usado em `EspecificacoesTecnicas`
 * (wrapper branco, título e conteúdo em card com borda).
 */
export function Acessorios({ itens }: AcessoriosProps) {
  // Validação defensiva: sem itens, não renderiza o bloco vazio
  // (mesma regra usada no Web: `produto.acessorios && produto.acessorios.length > 0`).
  if (!itens || itens.length === 0) {
    return null;
  }

  return (
    <View style={styles.wrapper}>
      <Text style={styles.titulo}>Acessórios Inclusos</Text>

      <View style={styles.lista}>
        {itens.map((item, i) => (
          <View key={i} style={styles.item}>
            <MaterialCommunityIcons
              name="check"
              size={16}
              color="#9ca3af"
              style={styles.icone}
            />
            <Text style={styles.itemTexto}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
