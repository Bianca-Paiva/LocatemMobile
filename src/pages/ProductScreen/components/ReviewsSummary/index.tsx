import React from 'react';
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from './styles';

interface ReviewsSummaryProps {
  averageRating: number;
  totalReviews: number;
}

export function ReviewsSummary({ averageRating, totalReviews }: ReviewsSummaryProps) {
  // Proporção de votos para pintar as barras (80% deram 5 estrelas, 15% deram 4, etc.)
  // No futuro, isso pode vir da sua API.
  const distributionPercentages = [80, 15, 5, 0, 0]; 

  return (
    <View style={styles.container}>
      
      {/* Coluna da Esquerda (Nota Gigante e Estrelinhas) */}
      <View style={styles.leftColumn}>
        <Text style={styles.averageText}>{averageRating.toFixed(1)}</Text>
        
        <View style={styles.starsRow}>
          {Array.from({ length: 5 }).map((_, i) => (
             <MaterialIcons 
               key={i} 
               name="star" 
               size={16} 
               color={i < Math.round(averageRating) ? "#FFC107" : "#EAEAEA"} 
             />
          ))}
        </View>

        <Text style={styles.totalReviewsText}>({totalReviews})</Text>
      </View>

      {/* Coluna da Direita (Barras de Progresso) */}
      <View style={styles.rightColumn}>
        {[5, 4, 3, 2, 1].map((star, index) => (
          <View key={star} style={styles.barRow}>
            <Text style={styles.starNumber}>{star}</Text>
            
            {/* O "Trilho" cinza da barra */}
            <View style={styles.barBackground}>
              {/* O preenchimento amarelo da barra */}
              <View 
                style={[
                  styles.barFill, 
                  { width: `${distributionPercentages[index]}%` } // Tamanho dinâmico
                ]} 
              />
            </View>
          </View>
        ))}
      </View>

    </View>
  );
}