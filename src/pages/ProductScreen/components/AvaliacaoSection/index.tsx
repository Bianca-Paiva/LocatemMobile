import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // 🚀 Importação do Gradiente

import { AvaliacaoSectionProps } from './types';
import { styles } from './styles';

// Importação dos assets
const IconLike = require('../../../../../assets/images/IconLike.png');
const IconLikePreenchido = require('../../../../../assets/images/IconLikePreenchido.png');

// --- Funções Auxiliares Isoladas ---
function Estrelas({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <View style={styles.estrelasRow}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Text
          key={n}
          style={{
            fontSize: size,
            color: n <= Math.round(rating) ? '#F9C01A' : '#e5e7eb',
          }}
        >
          ★
        </Text>
      ))}
    </View>
  );
}

function getIniciais(nome: string) {
  if (!nome) return '';
  const partes = nome.trim().split(/\s+/);
  
  if (partes.length === 1) {
    return partes[0].slice(0, 2).toUpperCase();
  }
  
  const primeiraLetra = partes[0][0];
  const ultimaLetra = partes[partes.length - 1][0];
  
  return (primeiraLetra + ultimaLetra).toUpperCase();
}

// --- Componente Principal ---
export function AvaliacaoSection({
  mediaGeral,
  totalAvaliacoes,
  distribuicao,
  avaliacoes,
}: AvaliacaoSectionProps) {
  const [showAll, setShowAll] = useState(false);
  const [curtidas, setCurtidas] = useState<number[]>([]);

  if (!avaliacoes || avaliacoes.length === 0) return null;

  const visiveis = showAll ? avaliacoes : avaliacoes.slice(0, 3);

  const toggleCurtida = (index: number) => {
    setCurtidas((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.titulo}>Avaliações</Text>

      {/* Resumo (Média e Barras) */}
      <View style={styles.resumoContainer}>
        <View style={styles.mediaBox}>
          <Text style={styles.mediaNumero}>{Number(mediaGeral || 0).toFixed(1)}</Text>
          <View style={styles.mediaEstrelasRow}>
            <Estrelas rating={mediaGeral} size={18} />
          </View>
          <Text style={styles.totalText}>({totalAvaliacoes} avaliações)</Text>
        </View>

        <View style={styles.distribuicaoContainer}>
          {[5, 4, 3, 2, 1].map((star, i) => (
            <View key={star} style={styles.barraLinha}>
              <Text style={styles.barraLabel}>{star}</Text>
              <View style={styles.barraTrack}>
                <View
                  style={[styles.barraFill, { width: `${distribuicao[i] || 0}%` }]}
                />
              </View>
              <Text style={styles.barraPercent}>{distribuicao[i] || 0}%</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Lista de Avaliações */}
      <View style={styles.listaAvaliacoes}>
        {visiveis.map((av, i) => {
          const isCurtido = curtidas.includes(i);
          const isUltimo = i === visiveis.length - 1;

          return (
            <View
              key={i}
              style={[styles.avaliacaoItem, isUltimo && styles.avaliacaoItemUltimo]}
            >
              <View style={styles.avaliacaoHeader}>
                
                {/* LinearGradient*/}
                <LinearGradient
                  colors={['#F9C01A', '#f59e0b']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.avatarCircle}
                >
                  <Text style={styles.avatarTexto}>{getIniciais(av.nome)}</Text>
                </LinearGradient>

                <View style={styles.avaliacaoMeta}>
                  <Text style={styles.avaliacaoNome}>{av.nome}</Text>
                  <Text style={styles.avaliacaoTempo}>{av.tempo}</Text>
                </View>
              </View>

              <Estrelas rating={av.rating} size={13} />
              
              <Text style={styles.avaliacaoTexto}>{av.texto}</Text>

              {av.fotos && av.fotos.length > 0 && (
                <View style={styles.fotosRow}>
                  {av.fotos.map((foto, fi) => (
                    <Image
                      key={fi}
                      source={typeof foto === 'string' ? { uri: foto } : foto}
                      style={styles.fotoThumb}
                    />
                  ))}
                </View>
              )}

              <View style={styles.avaliacaoFooter}>
                <TouchableOpacity
                  style={[styles.btnUtil, isCurtido && styles.btnUtilAtivo]}
                  activeOpacity={0.7}
                  onPress={() => toggleCurtida(i)}
                  accessibilityRole="button"
                >
                  <Image
                    source={isCurtido ? IconLikePreenchido : IconLike}
                    style={styles.likeIcon}
                  />
                  <Text
                    style={[styles.btnUtilText, isCurtido && styles.btnUtilTextAtivo]}
                  >
                    Foi útil
                  </Text>
                </TouchableOpacity>
                <Text style={styles.utilCount}>
                  · {av.utilCount + (isCurtido ? 1 : 0)} pessoas acharam útil
                </Text>
              </View>
            </View>
          );
        })}
      </View>

      {/* Botão de Ver Mais */}
      {avaliacoes.length > 3 && (
        <TouchableOpacity
          style={styles.btnVerMais}
          activeOpacity={0.7}
          onPress={() => setShowAll((prev) => !prev)}
        >
          <Text style={styles.btnVerMaisText}>
            {showAll ? 'Ver menos ▲' : 'Ver mais ▾'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}