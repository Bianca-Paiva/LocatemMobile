import React from 'react';
import { ScrollView, Pressable, Text } from 'react-native';

import { styles } from './styles';

interface CategoriasLojaProps {
  categorias: string[];
  ativa: string;
  onChange: (categoria: string) => void;
}

/**
 * Barra horizontal de chips pra filtrar as ferramentas da loja por categoria.
 * "Todas" sempre aparece primeiro; as demais são derivadas do catálogo real
 * dessa loja (ver `extrairCategoriaTopo` em utils/Ferramentas/Catalogo/categorias),
 * nunca uma lista fixa que possa ficar dessincronizada.
 */
export function CategoriasLoja({ categorias, ativa, onChange }: CategoriasLojaProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {categorias.map((categoria) => {
        const ativo = categoria === ativa;

        return (
          <Pressable
            key={categoria}
            onPress={() => onChange(categoria)}
            accessibilityRole="button"
            accessibilityState={{ selected: ativo }}
            style={[styles.chip, ativo && styles.chipAtivo]}
          >
            <Text style={[styles.chipTexto, ativo && styles.chipTextoAtivo]}>{categoria}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
