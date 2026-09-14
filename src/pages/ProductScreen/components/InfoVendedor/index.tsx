import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import { InfoVendedorProps } from './types';
import { styles } from './styles';

const verificadoImg = require('../../../../../assets/images/verificadoAzul.png');

export function InfoVendedor({
  nome,
  logoUrl,
  rating,
  reviewCount,
  locacoes,
  verificado,
  imageNota,
  onVerPerfil,
}: InfoVendedorProps) {
  const initials = nome ? nome.slice(0, 2).toUpperCase() : 'LO';

  return (
    <View style={styles.vendedorCard}>
      <View style={styles.vendedorHeader}>
        <View style={styles.avatar}>
          {logoUrl ? (
            <Image
              source={logoUrl}
              style={styles.avatarImg}
              resizeMode="contain"
            />
          ) : (
            <Text style={styles.avatarInitials}>{initials}</Text>
          )}
        </View>

        <View style={styles.vendedorInfo}>
          <View style={styles.nomeVendedor}>
            <Text style={styles.vendedorNome} numberOfLines={1}>
              {nome}
            </Text>

            {verificado && (
              <View style={styles.verificadoBadge}>
                <Image
                  source={verificadoImg}
                  style={styles.verificadoIcon}
                />
              </View>
            )}
          </View>

          <View style={styles.ratingRow}>
            <Image source={imageNota} style={styles.starIcon} />

            <Text style={styles.ratingValor}>
              {Number(rating || 0).toFixed(1)}
            </Text>

            {reviewCount > 0 && (
              <Text style={styles.ratingCount}>
                ({reviewCount})
              </Text>
            )}
          </View>

          <Text style={styles.locacoes}>
            +{locacoes} locações
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.btnVerPerfil}
        activeOpacity={0.7}
        onPress={onVerPerfil}
        accessibilityRole="button"
        accessibilityLabel="Ver perfil da loja"
      >
        <Text style={styles.btnVerPerfilText}>
          Ver perfil da loja
        </Text>
      </TouchableOpacity>
    </View>
  );
}