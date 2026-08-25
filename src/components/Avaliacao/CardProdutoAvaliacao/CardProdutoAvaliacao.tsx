import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
} from 'react-native';

import type { ProdutoAvaliacao } from '../../../pages/Avaliacao/Avaliacao.types';

import { BadgeLoja } from '../BadgeLoja/BadgeLoja';
import { EstrelasAvaliacao } from '../EstrelaAvaliacao/EstrelaAvaliacao';

import { styles } from './styles';

interface CardProdutoAvaliacaoProps {
  produto: ProdutoAvaliacao;

  aoClicarCard: (id: string) => void;

  aoSelecionarEstrela?: (
    id: string,
    valor: number
  ) => void;
}

export function CardProdutoAvaliacao({
  produto,
  aoClicarCard,
  aoSelecionarEstrela,
}: CardProdutoAvaliacaoProps) {
  return (
    <View style={styles.grupo}>
      <BadgeLoja loja={produto.loja} />

      <Pressable
        style={styles.card}
        onPress={() =>
          aoClicarCard(produto.id)
        }
      >
        <View style={styles.conteudo}>
          <Image
            source={produto.imagem}
            style={styles.imagem}
            resizeMode="cover"
          />

          <View style={styles.info}>
            <Text style={styles.nome}>
              {produto.nome}
            </Text>

            <Text style={styles.data}>
              {produto.dataLocacao}
            </Text>

            <EstrelasAvaliacao
              notaAtual={produto.notaGlobal}
              descricaoContexto={produto.nome}
              aoSelecionar={
                aoSelecionarEstrela
                  ? (valor) =>
                      aoSelecionarEstrela(
                        produto.id,
                        valor
                      )
                  : undefined
              }
            />
          </View>
        </View>
      </Pressable>
    </View>
  );
}