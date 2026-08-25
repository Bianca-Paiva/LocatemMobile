import React from 'react';
import {
  View,
  Pressable,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { styles } from './styles';

type VarianteEstrelas =
  | 'lista'
  | 'modal'
  | 'carrossel';

interface EstrelasAvaliacaoProps {
  notaAtual: number;

  aoSelecionar?: (
    valor: number
  ) => void;

  variante?: VarianteEstrelas;

  descricaoContexto?: string;
}

const QUANTIDADE_ESTRELAS = 5;

export function EstrelasAvaliacao({
  notaAtual,
  aoSelecionar,
  variante = 'lista',
}: EstrelasAvaliacaoProps) {
  const interativo =
    Boolean(aoSelecionar);

  const tamanho =
    variante === 'lista'
      ? 22
      : variante === 'modal'
      ? 17
      : 12;

  return (
    <View style={styles.fileira}>
      {Array.from(
        { length: QUANTIDADE_ESTRELAS },
        (_, indice) => {
          const preenchida =
            indice < notaAtual;

          return (
         <Pressable
            key={indice}
            disabled={!interativo}
            hitSlop={8}
            onPress={() =>
                aoSelecionar?.(indice + 1)
            }
            style={({ pressed }) => [
                styles.estrelaPress,
                {
                transform: [
                    {
                    scale: pressed ? 1.15 : 1,
                    },
                ],
                },
            ]}
            >
            <Ionicons
                name={
                preenchida
                    ? 'star'
                    : 'star-outline'
                }
                size={tamanho}
                color={
                preenchida
                    ? '#1554F0'
                    : '#DDDBD5'
                }
            />
            </Pressable>

          );
        }
      )}
    </View>
  );
}