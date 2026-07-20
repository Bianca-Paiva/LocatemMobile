import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {CustomerFeedbackCardProps} from './types';
import { styles } from './styles';

export function CustomerFeedbackCard({
    reviewerName,
    starRating,
    feedbackMessage,
    hasAttachedPhotos,
    usefulCount = 0, // Valor padrão caso não seja fornecido
}: CustomerFeedbackCardProps) {

    // Função para pegar as iniciais do nome do avaliador
    const getInitials = (name: string) => {
        const names = name.split(' ');
        if (names.length >= 2) return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }

    //Estados para logica do botão de util
    const [isUseful, setIsUseful] = useState(false);
    const [currentUsefulCount, setCurrentUsefulCount] = useState(usefulCount);

    // Lógica para alternar o estado do botão "Útil
    const handleToggleUseful = () => {
        if (isUseful) {
            //Se ja tava clicado, tira o voto (subtrai 1) e marca como falso
            setCurrentUsefulCount(prev => prev - 1);
            setIsUseful(false);
        } else{
            // Se não tava clicado, adiciona o voto (soma 1) e marca como verdadeiro
            setCurrentUsefulCount(prev => prev + 1);
            setIsUseful(true);
        }
    }

    return (
        <View style={styles.cardContainer}>
      
      {/* 1. Cabeçalho (Avatar, Nome, Estrelas e Data) */}
      <View style={styles.headerRow}>
        <View style={styles.profileGroup}>
          
          {/* Avatar com as iniciais */}
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{getInitials(reviewerName)}</Text>
          </View>
          
          <View>
            <Text style={styles.reviewerName}>{reviewerName}</Text>
            {/* Estrelas da Nota */}
            <View style={styles.starsRow}>
              {Array.from({ length: 5 }).map((_, index) => (
                <MaterialIcons 
                  key={index} 
                  name="star" 
                  size={14} 
                  color={index < starRating ? "#FFC107" : "#EAEAEA"} 
                />
              ))}
            </View>
          </View>
        </View>

        {/* Data da avaliação */}
        <Text style={styles.dateText}>Há 1 mês</Text>
      </View>

      {/* 2. Texto do Feedback */}
      <Text style={styles.feedbackText}>{feedbackMessage}</Text>

      {/* 3. Fotos Anexadas (Se houver) */}
      {hasAttachedPhotos && (
        <View style={styles.photosContainer}>
          <Image 
            source={{ uri: 'https://via.placeholder.com/100' }} 
            style={styles.attachedPhoto}
          />
          <Image 
            source={{ uri: 'https://via.placeholder.com/100' }} 
            style={styles.attachedPhoto}
          />
        </View>
      )}

      {/* 4. Rodapé (Botões de Interação) */}
      <View style={styles.footerRow}>
        <TouchableOpacity 
          style={[
            styles.usefulButton, 
            isUseful && { borderColor: '#1A1A1A', backgroundColor: '#FAFAFA' } // Muda o fundo/borda se ativo
          ]} 
          activeOpacity={0.7}
          onPress={handleToggleUseful}
        >
          <MaterialIcons 
            name={isUseful ? "thumb-up" : "thumb-up-off-alt"} // Ícone preenchido se ativo
            size={16} 
            color={isUseful ? "#1A1A1A" : "#666"} // Cor mais forte se ativo
            style={styles.usefulIcon} 
          />
          <Text style={[
            styles.usefulButtonText, 
            isUseful && { color: '#1A1A1A', fontWeight: '700' } // Texto mais forte se ativo
          ]}>
            Útil ({currentUsefulCount})
          </Text>
        </TouchableOpacity>

      </View>

    </View>
    );
};