import React, { useState } from 'react';

import {
  FlatList,
  Pressable,
  Text,
  View,
  ScrollView,
} from 'react-native';

import Header from '../../components/Layout/Header';
import CabecalhoPagina from '../../components/Layout/CabecalhoPagina/CabecalhoPagina';

import { CardProdutoAvaliacao } from '../../components/Avaliacao/CardProdutoAvaliacao/CardProdutoAvaliacao';
import { ModalAvaliacao } from '../../components/Avaliacao/ModalAvaliacao/ModalAvaliacao';
import { ToastConfirmacao } from '../../components/Avaliacao/ToastConfirmacao/ToastConfirmacao';
import { EstadoVazio } from '../../components/Avaliacao/EstadoVazio/EstadoVazio';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAvaliacoes } from '../../hooks/Avaliacao/useAvaliacoes';

import { styles } from './styles';

// ============================================================================
// Avaliacao (tela)
// ----------------------------------------------------------------------------
// Tela de avaliações do locatário: lista os produtos alugados que ainda
// precisam ser avaliados ("Pendentes") e os que já foram ("Realizadas"),
// separados em abas. Toda a lógica de dados, seleção de nota e envio da
// avaliação vem do hook useAvaliacoes(); este componente só decide o que
// renderizar (lista, estado vazio, modal de avaliação e toast de sucesso).
// ============================================================================
export const Avaliacao = () => {
  // Controla qual aba está selecionada no momento.
  const [abaAtiva, setAbaAtiva] =
    useState<'pendentes' | 'realizadas'>(
      'pendentes'
    );

  const {
    produtosPendentes,   // Lista de produtos aguardando avaliação
    produtosRealizados,  // Lista de produtos já avaliados

    produtoAtual,         // Produto selecionado no momento (abre o modal quando != null)
    itensCarrossel,        // Itens exibidos no carrossel dentro do modal de avaliação

    observacaoRascunho,   // Texto do comentário sendo digitado no modal

    camposComErro,        // Quais campos do formulário de avaliação estão com erro
    erroVisivel,           // Se a mensagem de erro deve aparecer no modal

    toastVisivel,          // Controla a exibição do toast "Avaliação enviada"

    setObservacaoRascunho,

    abrirModal,             // Abre o modal de avaliação para um produto específico
    fecharModal,

    selecionarNotaGlobalEAbrir, // Seleciona a nota geral (estrelas do card) e já abre o modal
    selecionarSubNota,          // Seleciona uma nota específica (ex: qualidade, atendimento) dentro do modal

    enviarAvaliacao,        // Envia a avaliação preenchida
  } = useAvaliacoes();

  return (
    <>
     <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <View style={styles.container}>

             
      <Header />
        <View style={styles.containerCont}>

              

        {/* Tabs: alterna entre produtos "Pendentes" e "Realizadas" */}

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

        {/* Aba Pendentes: mostra estado vazio ou a lista de produtos a avaliar.
            Cada card permite abrir o modal diretamente (aoClicarCard) ou já
            selecionar uma nota clicando nas estrelas do próprio card
            (aoSelecionarEstrela), que abre o modal já com a nota preenchida. */}

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

        {/* Aba Realizadas: mesma estrutura, mas somente para consulta
            (sem seleção rápida de estrela no card, pois já foi avaliado). */}

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

        {/* Modal de avaliação: só fica visível quando produtoAtual != null
            (controlado dentro do próprio ModalAvaliacao). Recebe todo o
            estado do formulário de avaliação e os handlers do hook. */}
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

        {/* Toast de confirmação exibido brevemente após o envio da avaliação */}
        <ToastConfirmacao
          visivel={toastVisivel}
        />
        </View>
       </View>
      </SafeAreaView>
    </>
  );
};
