import React from 'react';
import { View, Text, ScrollView } from 'react-native';


import { ProductCard } from '../../../../components/ProductCard'; 
import { Product } from '../../../../components/ProductCard/types'; 
import { ProdutosSemelhantesProps } from './types';
import { styles } from './styles';

export function ProdutosSemelhantes({ produtos, onCardClick }: ProdutosSemelhantesProps) {
  // Validação Defensiva: não renderiza a seção se a lista estiver vazia
  if (!produtos || produtos.length === 0) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Ferramentas Semelhantes</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        {produtos.map((p, index) => {
          
          
          const numericPrice = typeof p.price === 'string' 
            ? parseFloat(p.price.replace(',', '.')) 
            : p.price || 0;

          
          const adaptedProduct: Product = {
            id: p.id ? p.id.toString() : index.toString(),
            imageUrl: p.images && p.images.length > 0 ? p.images[0] : '', 
            title: p.title,
            storeName: p.marca, 
            price: isNaN(numericPrice) ? 0 : numericPrice, 
            period: 'dia' 
          };

          return (
            <ProductCard
              key={adaptedProduct.id}
              product={adaptedProduct}
              
              onPress={onCardClick ? () => onCardClick(p) : undefined}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}