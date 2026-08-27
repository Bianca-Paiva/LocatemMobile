import { useState } from 'react';

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
  NestableDraggableFlatList,
  ScaleDecorator,
  type RenderItemParams,
} from 'react-native-draggable-flatlist';

import styles from './styles';

import colors from '../../../theme/colors';

import type { FotosFerramentaProps } from './types';

const MAXIMO_FOTOS = 8;

interface ItemFoto {
  key: string;
  uri: string;
}

export default function FotosFerramenta({
  fotos,
  onChange,
  error,
  shake,
}: FotosFerramentaProps) {
  const [carregando, setCarregando] = useState(false);

  const vagas = Math.max(
    0,
    MAXIMO_FOTOS - fotos.length,
  );

  /*
   * Criamos uma chave ESTÁVEL baseada na posição atual.
   *
   * O URI continua sendo a informação real da foto.
   * A key serve somente para o DraggableFlatList identificar
   * cada item durante o gesto.
   */
  const itens: ItemFoto[] = fotos.map((uri, index) => ({
    key: `${index}-${uri}`,
    uri,
  }));

  const solicitarEEscolherFotos = async () => {
    if (vagas === 0) {
      return;
    }

    try {
      setCarregando(true);

      const permissaoAtual =
        await ImagePicker.getMediaLibraryPermissionsAsync();

      let permissao = permissaoAtual;

      if (permissaoAtual.status !== 'granted') {
        permissao =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
      }

      if (permissao.status !== 'granted') {
        if (permissao.canAskAgain === false) {
          Alert.alert(
            'Acesso à galeria necessário',
            'Pra adicionar fotos da ferramenta, permita o acesso às suas fotos nas configurações do app.',
            [
              {
                text: 'Agora não',
                style: 'cancel',
              },
              {
                text: 'Abrir Configurações',
                onPress: () => Linking.openSettings(),
              },
            ],
          );
        } else {
          Alert.alert(
            'Permissão negada',
            'Não foi possível acessar suas fotos sem essa permissão.',
          );
        }

        return;
      }

      const resultado =
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsMultipleSelection: true,
          selectionLimit: vagas,
          quality: 0.7,
        });

      if (resultado.canceled) {
        return;
      }

      const novasUris = resultado.assets.map(
        (asset) => asset.uri,
      );

      onChange(
        [...fotos, ...novasUris].slice(
          0,
          MAXIMO_FOTOS,
        ),
      );
    } finally {
      setCarregando(false);
    }
  };

  const removerFoto = (uri: string) => {
    onChange(
      fotos.filter((foto) => foto !== uri),
    );
  };

  /*
   * ESTE É O PONTO MAIS IMPORTANTE.
   *
   * O DraggableFlatList nos devolve o array já reorganizado.
   *
   * Então, se o usuário fizer:
   *
   * FOTO 1
   * FOTO 2
   * FOTO 3
   *
   * e arrastar FOTO 3 para a primeira posição:
   *
   * FOTO 3
   * FOTO 1
   * FOTO 2
   *
   * onChange recebe exatamente essa ordem.
   *
   * Como o formulário considera fotos[0] como capa,
   * FOTO 3 passa automaticamente a ser a CAPA.
   */
  const handleDragEnd = ({
    data,
  }: {
    data: ItemFoto[];
  }) => {
    const novaOrdem = data.map(
      (item) => item.uri,
    );

    onChange(novaOrdem);
  };

  const renderItem = ({
    item,
    drag,
    isActive,
    getIndex,
  }: RenderItemParams<ItemFoto>) => {
    const index = getIndex() ?? 0;

    return (
      <ScaleDecorator>
        <TouchableOpacity
          style={[
            styles.miniatura,
            isActive && styles.miniaturaArrastando,
          ]}
          onLongPress={drag}
          delayLongPress={350}
          disabled={isActive}
          activeOpacity={0.9}
        >
          <Image
            source={{ uri: item.uri }}
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
            onPress={() => removerFoto(item.uri)}
            activeOpacity={0.8}
            accessibilityLabel="Remover foto"
          >
            <MaterialCommunityIcons
              name="close"
              size={18}
              color="#FFF"
            />
          </TouchableOpacity>

          <View style={styles.indicadorArraste}>
            <MaterialCommunityIcons
              name="drag"
              size={19}
              color="#FFF"
            />
          </View>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={[
          styles.dropzone,
          error ? styles.dropzoneErro : null,
        ]}
        onPress={solicitarEEscolherFotos}
        disabled={vagas === 0 || carregando}
        activeOpacity={0.85}
      >
        <View style={styles.iconeUpload}>
          <MaterialCommunityIcons
            name="tray-arrow-up"
            size={26}
            color={colors.amber}
          />
        </View>

        <Text style={styles.textoPrincipal}>
          {carregando
            ? 'Abrindo galeria...'
            : 'Toque para enviar arquivos'}
        </Text>

        <Text style={styles.textoSecundario}>
          Selecione as fotos{' '}
          <Text style={styles.link}>
            direto da sua galeria
          </Text>
        </Text>

        <View style={styles.badges}>
          <Text style={styles.badge}>
            Até 8 fotos — {fotos.length}/8 adicionadas
          </Text>

          <Text style={styles.badge}>
            Mínimo 1 foto obrigatória
          </Text>

          <Text style={styles.badge}>
            A 1ª foto será a capa — segure e arraste pra
            reordenar
          </Text>
        </View>
      </TouchableOpacity>

      {fotos.length > 0 && (
        <>
          <NestableDraggableFlatList
            data={itens}
            onDragEnd={handleDragEnd}
            keyExtractor={(item) => item.key}
            renderItem={renderItem}
            numColumns={2}
            columnWrapperStyle={styles.grade}
            scrollEnabled={false}
            activationDistance={0}
          />

          {vagas > 0 && (
            <TouchableOpacity
              style={styles.botaoAdicionarMais}
              onPress={solicitarEEscolherFotos}
              disabled={carregando}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons
                name="plus"
                size={16}
                color={colors.textDark}
              />

              <Text
                style={styles.botaoAdicionarMaisTexto}
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