import React from 'react';
import { Text, View } from 'react-native';
import { ProductCard } from '../../Ferramentas/ProductCard';
import { toLegacyProduct } from '../../../mocks/produtos.adapters';
import type { ProdutoBusca } from '../../../pages/Search/Searchtypes';
import { styles } from './styles';

interface ProdutosRecomendadosProps {
  /** Catálogo completo (não filtrado) de onde tirar as recomendações. */
  produtos: ProdutoBusca[];
  /** Chamado quando o usuário toca em um produto recomendado. */
  onSelect: (produto: ProdutoBusca) => void;
  /** Título da seção. */
  titulo?: string;
  /** Quantidade máxima de produtos recomendados exibidos. */
  limite?: number;
}

/**
 * Seleciona os produtos recomendados a partir do catálogo: só produtos
 * disponíveis pra locação, ordenados por melhor avaliação e, em caso de
 * empate, por quantidade de avaliações (mais avaliações = recomendação
 * mais confiável). Extraída como função pura pra poder ser testada
 * separadamente da renderização.
 */
export function selecionarRecomendados(
  produtos: ProdutoBusca[],
  limite: number = 6
): ProdutoBusca[] {
  return [...produtos]
    .filter((produto) => produto.available)
    .sort((a, b) => {
      if (b.rating !== a.rating) return b.rating - a.rating;
      return b.reviewCount - a.reviewCount;
    })
    .slice(0, limite);
}

export default function ProdutosRecomendados({
  produtos,
  onSelect,
  titulo = 'Recomendados pra você',
  limite = 6,
}: ProdutosRecomendadosProps) {
  const recomendados = selecionarRecomendados(produtos, limite);

  if (recomendados.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{titulo}</Text>

      <View style={styles.grid}>
        {recomendados.map((produto) => (
          <ProductCard
            key={produto.id}
            product={toLegacyProduct(produto)}
            onPress={() => onSelect(produto)}
          />
        ))}
      </View>
    </View>
  );
}
