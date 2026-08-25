import React, { useState } from 'react';

import {
  FlatList,
  Pressable,
  Text,
  View,
} from 'react-native';

import Header from '../../components/Header';
import CabecalhoPagina from '../../components/CabecalhoPagina/CabecalhoPagina';

import { CardProdutoAvaliacao } from '../../components/Avaliacao/CardProdutoAvaliacao/CardProdutoAvaliacao';
import { ModalAvaliacao } from '../../components/Avaliacao/ModalAvaliacao/ModalAvaliacao';
import { ToastConfirmacao } from '../../components/Avaliacao/ToastConfirmacao/ToastConfirmacao';
import { EstadoVazio } from '../../components/Avaliacao/EstadoVazio/EstadoVazio';

import { useAvaliacoes } from '../../hooks/Avaliacao/useAvaliacoes';

import { styles } from './styles';

export const Avaliacao = () => {
  const [abaAtiva, setAbaAtiva] =
    useState<'pendentes' | 'realizadas'>(
      'pendentes'
    );

  const {
    produtosPendentes,
    produtosRealizados,

    produtoAtual,
    itensCarrossel,

    observacaoRascunho,

    camposComErro,
    erroVisivel,

    toastVisivel,

    setObservacaoRascunho,

    abrirModal,
    fecharModal,

    selecionarNotaGlobalEAbrir,
    selecionarSubNota,

    enviarAvaliacao,
  } = useAvaliacoes();

  return (
    <>
      <Header />

      <View style={styles.container}>
        {/* <CabecalhoPagina
          titulo="Minhas Avaliações"
          subtitulo="Avalie os produtos que você locou."
        /> */}

        {/* Tabs */}

        <View style={styles.tabs}>
          <Pressable
            style={[
              styles.tabBtn,

              abaAtiva === 'pendentes' &&
                styles.tabBtnActive,
            ]}
            onPress={() =>
              setAbaAtiva('pendentes')
            }
          >
            <Text
              style={[
                styles.tabText,

                abaAtiva === 'pendentes' &&
                  styles.tabTextActive,
              ]}
            >
              Pendentes
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.tabBtn,

              abaAtiva === 'realizadas' &&
                styles.tabBtnActive,
            ]}
            onPress={() =>
              setAbaAtiva('realizadas')
            }
          >
            <Text
              style={[
                styles.tabText,

                abaAtiva === 'realizadas' &&
                  styles.tabTextActive,
              ]}
            >
              Realizadas
            </Text>
          </Pressable>
         
        </View>

        {/* Pendentes */}

        {abaAtiva === 'pendentes' && (
          produtosPendentes.length === 0 ? (
            <EstadoVazio
              status="pendente"
            />
          ) : (
            <FlatList
              data={produtosPendentes}
              keyExtractor={(item) =>
                item.id
              }
              showsVerticalScrollIndicator={
                false
              }
              renderItem={({ item }) => (
                <CardProdutoAvaliacao
                  produto={item}
                  aoClicarCard={
                    abrirModal
                  }
                  aoSelecionarEstrela={
                    selecionarNotaGlobalEAbrir
                  }
                />
              )}
            />
          )
        )}

        {/* Realizadas */}

        {abaAtiva === 'realizadas' && (
          produtosRealizados.length === 0 ? (
            <EstadoVazio
              status="realizada"
            />
          ) : (
            <FlatList
              data={produtosRealizados}
              keyExtractor={(item) =>
                item.id
              }
              showsVerticalScrollIndicator={
                false
              }
              renderItem={({ item }) => (
                <CardProdutoAvaliacao
                  produto={item}
                  aoClicarCard={
                    abrirModal
                  }
                />
              )}
            />
          )
        )}

        <ModalAvaliacao
          produto={produtoAtual}
          itensCarrossel={itensCarrossel}
          observacao={
            observacaoRascunho
          }
          camposComErro={
            camposComErro
          }
          erroVisivel={erroVisivel}
          aoFechar={fecharModal}
          aoMudarObservacao={
            setObservacaoRascunho
          }
          aoSelecionarSubNota={
            selecionarSubNota
          }
          aoSelecionarProdutoCarrossel={
            abrirModal
          }
          aoEnviar={enviarAvaliacao}
        />

        <ToastConfirmacao
          visivel={toastVisivel}
        />
      </View>
    </>
  );
};