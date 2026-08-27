import { useCallback, useMemo, useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Linking,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import {
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { scheduleOnRN } from 'react-native-worklets';

import styles from './styles';

import colors from '../../../theme/colors';

import type { FotosFerramentaProps } from './types';

const MAXIMO_FOTOS = 8;
const ESPACO = 8;
const ALTURA_FOTO = 180;
const COLUNAS = 2;

interface ItemFoto {
  key: string;
  uri: string;
}

interface FotoArrastavelProps {
  item: ItemFoto;
  index: number;
  largura: number;
  onMover: (
    indiceInicial: number,
    translationX: number,
    translationY: number,
  ) => void;
  onRemover: (uri: string) => void;
  onArrasteMudou: (ativo: boolean) => void;
}

function FotoArrastavel({
  item,
  index,
  largura,
  onMover,
  onRemover,
  onArrasteMudou,
}: FotoArrastavelProps) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const ativa = useSharedValue(false);

  const gesture = Gesture.Pan()
    .activateAfterLongPress(300)

    .onStart(() => {
      ativa.value = true;
      scheduleOnRN(onArrasteMudou, true);
    })

    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })

    .onEnd((event) => {
      const x = event.translationX;
      const y = event.translationY;

      translateX.value = withSpring(0);
      translateY.value = withSpring(0);

      ativa.value = false;

      scheduleOnRN(
        onMover,
        index,
        x,
        y,
      );

      scheduleOnRN(onArrasteMudou, false);
    })

    .onFinalize(() => {
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);

      if (ativa.value) {
        scheduleOnRN(onArrasteMudou, false);
      }

      ativa.value = false;
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
        {
          scale: ativa.value ? 1.04 : 1,
        },
      ],

      zIndex: ativa.value ? 100 : 1,

      elevation: ativa.value ? 10 : 1,
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          styles.miniatura,
          {
            width: largura,
            height: ALTURA_FOTO,
          },
          animatedStyle,
        ]}
      >
        <Image
          source={{
            uri: item.uri,
          }}
          style={styles.imagem}
          resizeMode="cover"
        />

        {index === 0 && (
          <View style={styles.selo}>
            <Text style={styles.seloTexto}>
              CAPA
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.botaoRemover}
          onPress={() => onRemover(item.uri)}
          activeOpacity={0.8}
          accessibilityLabel="Remover foto"
        >
          <MaterialCommunityIcons
            name="close"
            size={18}
            color="#FFF"
          />
        </TouchableOpacity>

        <View
          pointerEvents="none"
          style={styles.indicadorArraste}
        >
          <MaterialCommunityIcons
            name="drag"
            size={19}
            color="#FFF"
          />
        </View>
      </Animated.View>
    </GestureDetector>
  );
}

export default function FotosFerramenta({
  fotos,
  onChange,
  error,
  onDragStateChange,
}: FotosFerramentaProps) {
  const [carregando, setCarregando] =
    useState(false);

  const [larguraGrade, setLarguraGrade] =
    useState(0);

  const vagas = Math.max(
    0,
    MAXIMO_FOTOS - fotos.length,
  );

  const itens: ItemFoto[] = useMemo(
    () =>
      fotos.map((uri) => ({
        key: uri,
        uri,
      })),
    [fotos],
  );

  const larguraFoto =
    larguraGrade > 0
      ? (larguraGrade - ESPACO) / COLUNAS
      : 0;

  // Wrapper estável (sempre definido) pra poder ser chamado a partir do
  // worklet do gesture mesmo quando o pai não passou onDragStateChange.
  const notificarArraste = useCallback(
    (ativo: boolean) => {
      onDragStateChange?.(ativo);
    },
    [onDragStateChange],
  );

  const solicitarEEscolherFotos =
    useCallback(async () => {
      if (vagas === 0) {
        return;
      }

      try {
        setCarregando(true);

        /*
         * Sempre solicitamos a permissão diretamente.
         * No Android, se ainda não foi concedida,
         * o sistema mostra o diálogo.
         *
         * OBS: no Expo Go, a permissão de fotos é concedida por app
         * (Expo Go) e não por projeto — se já foi concedida antes,
         * o sistema não mostra o diálogo de novo pra este app específico.
         */
        const permissao =
          await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissao.granted) {
          if (
            permissao.canAskAgain === false
          ) {
            Alert.alert(
              'Acesso à galeria necessário',
              'Permita o acesso às fotos nas configurações do aplicativo.',
              [
                {
                  text: 'Agora não',
                  style: 'cancel',
                },
                {
                  text: 'Abrir Configurações',
                  onPress: () =>
                    Linking.openSettings(),
                },
              ],
            );
          } else {
            Alert.alert(
              'Permissão necessária',
              'Precisamos de acesso às suas fotos para cadastrar a ferramenta.',
            );
          }

          return;
        }

        const resultado =
          await ImagePicker.launchImageLibraryAsync(
            {
              mediaTypes: ['images'],
              allowsMultipleSelection: true,
              selectionLimit: vagas,
              quality: 0.7,
            },
          );

        if (resultado.canceled) {
          return;
        }

        const novasUris =
          resultado.assets.map(
            (asset) => asset.uri,
          );

        onChange(
          [...fotos, ...novasUris].slice(
            0,
            MAXIMO_FOTOS,
          ),
        );
      } catch (erro) {
        console.error(
          'Erro ao selecionar imagens:',
          erro,
        );

        Alert.alert(
          'Erro',
          'Não foi possível abrir a galeria.',
        );
      } finally {
        setCarregando(false);
      }
    }, [fotos, onChange, vagas]);

  const removerFoto = useCallback(
    (uri: string) => {
      onChange(
        fotos.filter(
          (foto) => foto !== uri,
        ),
      );
    },
    [fotos, onChange],
  );

  /*
   * Recebe a posição final da foto e calcula
   * qual posição da grade está debaixo dela.
   */
  const moverFoto = useCallback(
    (
      indiceInicial: number,
      translationX: number,
      translationY: number,
    ) => {
      if (
        larguraFoto <= 0 ||
        fotos.length <= 1
      ) {
        return;
      }

      const colunaInicial =
        indiceInicial % COLUNAS;

      const linhaInicial = Math.floor(
        indiceInicial / COLUNAS,
      );

      const centroInicialX =
        colunaInicial *
          (larguraFoto + ESPACO) +
        larguraFoto / 2;

      const centroInicialY =
        linhaInicial *
          (ALTURA_FOTO + ESPACO) +
        ALTURA_FOTO / 2;

      const centroFinalX =
        centroInicialX + translationX;

      const centroFinalY =
        centroInicialY + translationY;

      let coluna = Math.floor(
        centroFinalX /
          (larguraFoto + ESPACO),
      );

      let linha = Math.floor(
        centroFinalY /
          (ALTURA_FOTO + ESPACO),
      );

      const totalLinhas = Math.ceil(
        fotos.length / COLUNAS,
      );

      coluna = Math.max(
        0,
        Math.min(
          COLUNAS - 1,
          coluna,
        ),
      );

      linha = Math.max(
        0,
        Math.min(
          totalLinhas - 1,
          linha,
        ),
      );

      let destino =
        linha * COLUNAS + coluna;

      destino = Math.max(
        0,
        Math.min(
          fotos.length - 1,
          destino,
        ),
      );

      if (
        destino === indiceInicial
      ) {
        return;
      }

      const novaOrdem = [...fotos];

      const [fotoMovida] =
        novaOrdem.splice(
          indiceInicial,
          1,
        );

      novaOrdem.splice(
        destino,
        0,
        fotoMovida,
      );

      onChange(novaOrdem);
    },
    [
      fotos,
      larguraFoto,
      onChange,
    ],
  );

  const linhas: ItemFoto[][] = [];

  for (
    let i = 0;
    i < itens.length;
    i += COLUNAS
  ) {
    linhas.push(
      itens.slice(i, i + COLUNAS),
    );
  }

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={[
          styles.dropzone,
          error
            ? styles.dropzoneErro
            : null,
        ]}
        onPress={
          solicitarEEscolherFotos
        }
        disabled={
          vagas === 0 ||
          carregando
        }
        activeOpacity={0.85}
      >
        <View style={styles.iconeUpload}>
          <MaterialCommunityIcons
            name="tray-arrow-up"
            size={26}
            color={colors.amber}
          />
        </View>

        <Text
          style={styles.textoPrincipal}
        >
          {carregando
            ? 'Abrindo galeria...'
            : 'Toque para enviar arquivos'}
        </Text>

        <Text
          style={styles.textoSecundario}
        >
          Selecione as fotos{' '}
          <Text style={styles.link}>
            direto da sua galeria
          </Text>
        </Text>

        <View style={styles.badges}>
          <Text style={styles.badge}>
            Até 8 fotos —{' '}
            {fotos.length}/8 adicionadas
          </Text>

          <Text style={styles.badge}>
            Mínimo 1 foto obrigatória
          </Text>

          <Text style={styles.badge}>
            A 1ª foto será a capa — segure
            e arraste pra reordenar
          </Text>
        </View>
      </TouchableOpacity>

      {fotos.length > 0 && (
        <>
          <View
            style={styles.gradeFotos}
            onLayout={(event) => {
              setLarguraGrade(
                event.nativeEvent.layout.width,
              );
            }}
          >
            {linhas.map(
              (linha, numeroLinha) => (
                <View
                  key={`linha-${numeroLinha}`}
                  style={styles.gradeLinha}
                >
                  {linha.map(
                    (item, posicaoNaLinha) => {
                      const index =
                        numeroLinha *
                          COLUNAS +
                        posicaoNaLinha;

                      return (
                        <FotoArrastavel
                          key={item.key}
                          item={item}
                          index={index}
                          largura={
                            larguraFoto
                          }
                          onMover={
                            moverFoto
                          }
                          onRemover={
                            removerFoto
                          }
                          onArrasteMudou={
                            notificarArraste
                          }
                        />
                      );
                    },
                  )}

                  {linha.length === 1 && (
                    <View
                      style={{
                        width:
                          larguraFoto,
                      }}
                    />
                  )}
                </View>
              ),
            )}
          </View>

          {vagas > 0 && (
            <TouchableOpacity
              style={
                styles.botaoAdicionarMais
              }
              onPress={
                solicitarEEscolherFotos
              }
              disabled={carregando}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons
                name="plus"
                size={16}
                color={
                  colors.textDark
                }
              />

              <Text
                style={
                  styles.botaoAdicionarMaisTexto
                }
              >
                Adicionar mais fotos
              </Text>
            </TouchableOpacity>
          )}
        </>
      )}

      {error ? (
        <Text style={styles.error}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}
