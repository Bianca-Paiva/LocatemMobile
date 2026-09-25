import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import colors from '../../../../theme/colors';
import { styles } from './styles';
import type { CardFerramentaLojaProps } from './types';

const iconLike = require('../../../../../assets/images/IconLike.png');
const iconLikePreenchido = require('../../../../../assets/images/IconLikePreenchido.png');

/**
 * Card de ferramenta da grade "Ferramentas da loja" (tela Loja do Locador).
 * Diferente do `ProductCard` já existente (usado na Home/Busca), este card
 * expõe o estoque (badge "Disponível"/"Última unidade") e o favoritar, que
 * fazem sentido especificamente na vitrine de uma loja.
 */
export function CardFerramentaLoja({
  produto,
  favoritado,
  onToggleFavorito,
  onVerDetalhes,
}: CardFerramentaLojaProps) {
  const precoFormatado = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(parseFloat(produto.price.replace(',', '.')) || 0);

  const ultimaUnidade = produto.available && produto.estoqueDisponivel === 1;
  const disponivel = produto.available && produto.estoqueDisponivel > 0;

  return (
     <TouchableOpacity
     style={styles.container}
     onPress={() => onVerDetalhes(produto)}
     >

      <View style={styles.imagemWrapper}>
        <Image source={produto.images[0]} style={styles.imagem} resizeMode="cover" />

        {disponivel && (
          <View style={[styles.badge, ultimaUnidade && styles.badgeUltimaUnidade]}>
            <View style={[styles.badgePonto, ultimaUnidade && styles.badgePontoUltimaUnidade]} />
            <Text style={[styles.badgeTexto, ultimaUnidade && styles.badgeTextoUltimaUnidade]}>
              {ultimaUnidade ? 'Última unidade' : 'Disponível'}
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.favoritoBtn}
          onPress={() => onToggleFavorito(produto.id)}
          accessibilityRole="button"
          accessibilityLabel={favoritado ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <Image
            source={favoritado ? iconLikePreenchido : iconLike}
            style={styles.favoritoIcone}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.conteudo}>
        <Text style={styles.titulo} numberOfLines={2} ellipsizeMode="tail">
          {produto.title}
        </Text>
        <Text style={styles.locador} numberOfLines={1}>
          {produto.locador}
        </Text>

        <View style={styles.precoERatingLinha}>
          <View style={styles.precoLinha}>
            <Text style={styles.preco}>{precoFormatado}</Text>
            <Text style={styles.periodo}>/dia</Text>
          </View>

          <View style={styles.ratingLinha}>
            <Image source={produto.imageNota} style={styles.ratingIcone} resizeMode="contain" />
            <Text style={styles.ratingValor}>{produto.rating.toFixed(1)}</Text>
            <Text style={styles.ratingCount}>({produto.reviewCount})</Text>
          </View>
        </View>

      </View>
      
  </TouchableOpacity>
  );
}
