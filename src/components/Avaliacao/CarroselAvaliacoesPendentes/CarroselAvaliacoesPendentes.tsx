import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
} from 'react-native';

import type { ProdutoAvaliacao } from '../../../pages/Avaliacao/Avaliacao.types';

import { EstrelasAvaliacao } from '../EstrelaAvaliacao/EstrelaAvaliacao';

import { styles } from './styles';

interface CarrosselAvaliacoesPendentesProps {
  itens: ProdutoAvaliacao[];
  aoSelecionarItem: (id: string) => void;
}

/**
 * Faixa horizontal com os outros produtos
 * ainda pendentes dentro do modal.
 */
export function CarrosselAvaliacoesPendentes({
  itens,
  aoSelecionarItem,
}: CarrosselAvaliacoesPendentesProps) {
  if (itens.length === 0) {
    return null;
  }

  return (
    <>
      <Text style={styles.titulo}>
        Outros itens para avaliar
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={
          styles.carrossel
        }
      >
        {itens.map((item) => (
          <Pressable
            key={item.id}
            style={styles.card}
            onPress={() =>
              aoSelecionarItem(item.id)
            }
          >
            <Image
              source={item.imagem}
              style={styles.imagem}
              resizeMode="contain"
            />

            <Text
              style={styles.nome}
              numberOfLines={2}
            >
              {item.nome}
            </Text>

            <Text style={styles.data}>
              {item.dataLocacao}
            </Text>

            <EstrelasAvaliacao
              notaAtual={item.notaGlobal}
              variante="carrossel"
              descricaoContexto={item.nome}
            />
          </Pressable>
        ))}
      </ScrollView>
    </>
  );
}