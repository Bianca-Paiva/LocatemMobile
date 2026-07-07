import React from "react";
import {View, Text, TouchableOpacity, Image} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";

import {styles} from "./styles";
import {StoreBadgeCardProps} from "./types";

export function StoreBadgeCard({
  storeName, averageRating, isVerifiedStore, storeBadgeImage, onVisitStorePress
}: StoreBadgeCardProps) {

    //Se for uma string (URL externa), vai montar o objeto {uri}, ja se for um require, vai usar a imagem local diretamente
    const imageSource = typeof storeBadgeImage === 'string' 
    ? { uri: storeBadgeImage } 
    : storeBadgeImage;

    return (
        <View style={styles.container}>
      
      <View style={styles.avatarContainer}>
        {storeBadgeImage ? (
          <Image 
            source={imageSource} 
            style={{ width: 48, height: 48, borderRadius: 24 }} 
            resizeMode="cover"
          />
        ) : (
            // Renderiza um texto caso a imagem não esteja disponível
          <Text style={{ fontSize: 10, color: '#666', textAlign: 'center' }}>
            Logo{"\n"}da loja
          </Text>
        )}
      </View>

      {/* Dados da Loja (resto do código continua idêntico) */}
      <View style={styles.infoContainer}>
        {/*O numberOfLines={1} evita a quebra de layout caso o lojista cadastre um nome gigante*/}
        <Text style={styles.storeName} numberOfLines={1}>{storeName}</Text>

        {/* Agrupador horizontal para alinhar o ícone de estrela, a nota e o selo na mesma linha */}
        <View style={styles.reputationRow}>
          <MaterialIcons name="star" size={16} color="#B8860B" />

          {/* Renderização Condicional: O selo só é injetado se a validação for verdadeira */}
          <Text style={styles.ratingText}>{averageRating}</Text>
          {isVerifiedStore && <Text style={styles.verifiedText}>Locador Verificado</Text>}
        </View>
      </View>

        {/*Botão de ação para ir para loja*/}
      <TouchableOpacity style={styles.actionButton} activeOpacity={0.7} onPress={onVisitStorePress}>
        <MaterialIcons name="store" size={20} color="#333" />
      </TouchableOpacity>

    </View>
    )
}