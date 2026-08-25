import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import { InfoVendedorProps } from './types';
import { styles } from './styles';

// Assumindo que a imagem esteja nessa rota, ajuste se necessário
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
  // Extrai as duas primeiras letras de forma segura (fallback caso venha vazio)
  const initials = nome ? nome.slice(0, 2).toUpperCase() : 'LO';

  return (
    <View style={styles.vendedorCard}>
      <View style={styles.vendedorHeader}>
        {/* Avatar da Loja */}
        <View style={styles.avatar}>
          {logoUrl ? (
            <Image
              source={typeof logoUrl === 'string' ? { uri: logoUrl } : logoUrl}
              style={styles.avatarImg}
            />
          ) : (
            <Text style={styles.avatarInitials}>{initials}</Text>
          )}
        </View>

        {/* Informações de Nome e Avaliação */}
        <View style={styles.vendedorInfo}>
          <Text style={styles.vendedorNome} numberOfLines={1}>
            {nome}
          </Text>
          
          <View style={styles.ratingRow}>
            <Image source={imageNota} style={styles.starIcon} />
            <Text style={styles.ratingValor}>{Number(rating || 0).toFixed(1)}</Text>
            {reviewCount > 0 && (
              <Text style={styles.ratingCount}>({reviewCount})</Text>
            )}
          </View>
          
          <Text style={styles.locacoes}>+{locacoes} locações</Text>
        </View>

        {/* Selo de Verificado */}
        {verificado && (
          <View style={styles.verificadoBadge}>
            <Image source={verificadoImg} style={styles.verificadoIcon} />
          </View>
        )}
      </View>

      {/* Botão de Ver Perfil */}
      <TouchableOpacity
        style={styles.btnVerPerfil}
        activeOpacity={0.7}
        onPress={onVerPerfil}
        accessibilityRole="button"
        accessibilityLabel="Ver perfil da loja"
      >
        <Text style={styles.btnVerPerfilText}>Ver perfil da loja</Text>
      </TouchableOpacity>
    </View>
  );
}
