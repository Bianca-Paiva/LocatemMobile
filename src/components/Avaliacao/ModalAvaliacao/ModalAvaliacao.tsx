import React, { useState } from 'react';

import {
  Modal,
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  TextInput,
} from 'react-native';

import {
  ImageOff,
  ChevronLeft,
  ChevronDown,
} from 'lucide-react-native';

import type {
  ChaveSubAvaliacao,
  ProdutoAvaliacao,
} from '../../../pages/Avaliacao/Avaliacao.types';

import {
  LABEL_SUB_AVALIACAO,
} from '../../../pages/Avaliacao/Avaliacao.types';

import { EstrelasAvaliacao } from '../EstrelaAvaliacao/EstrelaAvaliacao';
import { CarrosselAvaliacoesPendentes } from '../CarroselAvaliacoesPendentes/CarroselAvaliacoesPendentes';

import { styles } from './styles';

interface ModalAvaliacaoProps {
  produto: ProdutoAvaliacao | null;

  itensCarrossel: ProdutoAvaliacao[];

  observacao: string;

  camposComErro: ChaveSubAvaliacao[];

  erroVisivel: boolean;

  aoFechar: () => void;

  aoMudarObservacao: (
    texto: string
  ) => void;

  aoSelecionarSubNota: (
    chave: ChaveSubAvaliacao,
    valor: number
  ) => void;

  aoSelecionarProdutoCarrossel: (
    id: string
  ) => void;

  aoEnviar: () => void;
}

export function ModalAvaliacao({
  produto,
  itensCarrossel,
  observacao,
  camposComErro,
  erroVisivel,
  aoFechar,
  aoMudarObservacao,
  aoSelecionarSubNota,
  aoSelecionarProdutoCarrossel,
  aoEnviar,
}: ModalAvaliacaoProps) {
  const [obsExpandida, setObsExpandida] =
    useState(true);

  const aberto = produto !== null;

  if (!produto) {
    return null;
  }

  const iconesPorSub: Record<
    ChaveSubAvaliacao,
    any
  > = {
    locador: produto.loja.logo,
    entrega: require('../../../assets/Icons/IconCaminhao.png'),
    produto: produto.imagem,
  };

  return (
    <Modal
      visible={aberto}
      transparent
      animationType="slide"
      onRequestClose={aoFechar}
    >
      <View style={styles.overlay}>
        <ScrollView
          style={styles.modal}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}

          <View style={styles.header}>
            <Pressable
              style={styles.voltar}
              onPress={aoFechar}
            >
              <ChevronLeft
                size={18}
                color="#6B6860"
              />

              <Text style={styles.voltarTexto}>
                Voltar
              </Text>
            </Pressable>
          </View>

          {/* Produto */}

          <View style={styles.produto}>
            <View style={styles.produtoTopo}>
              <Image
                source={produto.imagem}
                style={styles.produtoImagem}
                resizeMode="contain"
              />

              <View style={styles.produtoInfo}>
                <Text style={styles.produtoNome}>
                  {produto.nome}
                </Text>

                <Text style={styles.produtoData}>
                  {produto.dataLocacao}
                </Text>
              </View>
            </View>

            {/* Avaliações */}

            <View style={styles.subRatings}>
              {(
                Object.keys(
                  produto.subAvaliacoes
                ) as ChaveSubAvaliacao[]
              ).map((chave) => (
                <View
                  key={chave}
                  style={styles.subRating}
                >
                  <Text
                    style={[
                      styles.subRatingLabel,

                      camposComErro.includes(
                        chave
                      ) && {
                        color: '#E03E2D',
                      },
                    ]}
                  >
                    {
                      LABEL_SUB_AVALIACAO[
                        chave
                      ]
                    }
                  </Text>

                  <View
                    style={[
                      styles.subRatingIcone,

                      camposComErro.includes(
                        chave
                      ) &&
                        styles.subRatingErro,
                    ]}
                  >
                    {iconesPorSub[chave] ? (
                      <Image
                        source={
                          iconesPorSub[chave]
                        }
                        style={{
                          width: '100%',
                          height: '100%',
                        }}
                        resizeMode="contain"
                      />
                    ) : (
                      <ImageOff
                        size={20}
                        color="#A09E99"
                      />
                    )}
                  </View>

                  <EstrelasAvaliacao
                    notaAtual={
                      produto
                        .subAvaliacoes[
                        chave
                      ]
                    }
                    variante="modal"
                    descricaoContexto={
                      LABEL_SUB_AVALIACAO[
                        chave
                      ]
                    }
                    aoSelecionar={(
                      valor
                    ) =>
                      aoSelecionarSubNota(
                        chave,
                        valor
                      )
                    }
                  />
                </View>
              ))}
            </View>

            {erroVisivel && (
              <Text style={styles.erro}>
                Avalie o locador,
                a entrega e o produto
                antes de enviar.
              </Text>
            )}
          </View>

          {/* Observação */}

          <View style={styles.obs}>
            <Pressable
              style={styles.obsToggle}
              onPress={() =>
                setObsExpandida(
                  !obsExpandida
                )
              }
            >
              <Text
                style={styles.obsTitulo}
              >
                Observações
                (opcional)
              </Text>

              <ChevronDown
                size={16}
                style={{
                  transform: [
                    {
                      rotate:
                        obsExpandida
                          ? '180deg'
                          : '0deg',
                    },
                  ],
                }}
              />
            </Pressable>

            {obsExpandida && (
              <TextInput
                multiline
                value={observacao}
                placeholder="Compartilhe sua experiência com este produto..."
                onChangeText={
                  aoMudarObservacao
                }
                style={
                  styles.obsTextarea
                }
              />
            )}
          </View>

          {/* Footer */}

          <View style={styles.footer}>
            <Pressable
              style={styles.btnEnviar}
              onPress={aoEnviar}
            >
              <Text
                style={
                  styles.btnEnviarTexto
                }
              >
                {produto.status ===
                'realizada'
                  ? 'Editar'
                  : 'Enviar'}
              </Text>
            </Pressable>
          </View>

          <CarrosselAvaliacoesPendentes
            itens={itensCarrossel}
            aoSelecionarItem={
              aoSelecionarProdutoCarrossel
            }
          />
        </ScrollView>
      </View>
    </Modal>
  );
}