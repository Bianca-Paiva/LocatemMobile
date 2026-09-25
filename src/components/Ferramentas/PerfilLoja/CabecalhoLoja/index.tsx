import React from 'react';
import { View, Text, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../../../../theme/colors';
import { styles } from './styles';
import type { CabecalhoLojaProps } from './types';

const verificadoImg = require('../../../../../assets/images/verificadoAzul.png');

/**
 * Cabeçalho da tela "Loja do Locador": identidade da loja (avatar, nome,
 * selo de verificado), avaliação média, localização, descrição livre e as
 * duas métricas de reputação (ferramentas anunciadas / locações concluídas).
 *
 * Reaproveita os mesmos dados do card "InfoVendedor" (ver
 * `mocks/locadoresMock.ts`), só que em formato expandido — essa é a tela
 * pra onde o botão "Ver perfil da loja" do InfoVendedor leva.
 */
export function CabecalhoLoja({
  nome,
  logoUrl,
  verificado,
  desde,
  localizacao,
  descricao,
  rating,
  reviewCount,
  ferramentasAnunciadas,
  locacoesConcluidas,
}: CabecalhoLojaProps) {
  const iniciais = nome ? nome.slice(0, 2).toUpperCase() : 'LO';
  const estrelas = Math.round(rating);

  return (
    <View style={styles.card}>
      <View style={styles.topo}>
        <View style={styles.avatar}>
          {logoUrl ? (
            <Image source={logoUrl} style={styles.avatarImg} resizeMode="cover" />
          ) : (
            <Text style={styles.avatarInitials}>{iniciais}</Text>
          )}
        </View>

        <View style={styles.info}>
          <View style={styles.nomeLinha}>
            <Text style={styles.nome}>{nome}</Text>
            {verificado && <Image source={verificadoImg} style={styles.verificadoIcon} />}
          </View>

          {desde && <Text style={styles.desde}>Locador desde {desde}</Text>}

          <View style={styles.ratingLinha}>
            {Array.from({ length: 5 }).map((_, index) => (
              <MaterialCommunityIcons
                key={index}
                name={index < estrelas ? 'star' : 'star-outline'}
                size={15}
                color={colors.primary}
              />
            ))}
            <Text style={styles.ratingValor}>{Number(rating || 0).toFixed(1)}</Text>
            {reviewCount > 0 && (
              <Text style={styles.ratingCount}>({reviewCount} avaliações)</Text>
            )}
          </View>

          {localizacao && (
            <View style={styles.localizacaoLinha}>
              <MaterialCommunityIcons name="map-marker-outline" size={15} color={colors.textMuted} />
              <Text style={styles.localizacaoTexto}>{localizacao}</Text>
            </View>
          )}
        </View>
      </View>

      {descricao && <Text style={styles.descricao}>{descricao}</Text>}

      <View style={styles.divisor} />

      <View style={styles.stats}>
        <View style={styles.statItem}>
          <View style={styles.statIcone}>
            <MaterialCommunityIcons name="package-variant-closed" size={18} color={colors.textDark} />
          </View>
          <View>
            <Text style={styles.statValor}>{ferramentasAnunciadas}</Text>
            <Text style={styles.statLabel}>ferramentas{'\n'}anunciadas</Text>
          </View>
        </View>

        <View style={styles.statDivisor} />

        <View style={styles.statItem}>
          <View style={styles.statIcone}>
            <MaterialCommunityIcons name="clipboard-text-outline" size={18} color={colors.textDark} />
          </View>
          <View>
            <Text style={styles.statValor}>{locacoesConcluidas}</Text>
            <Text style={styles.statLabel}>locações{'\n'}concluídas</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
