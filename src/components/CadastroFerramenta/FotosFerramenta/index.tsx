// Equivalente mobile do FotosFerramenta da Web. Não existe "arrastar arquivo do
// computador" no celular, então o fluxo aqui é: tocar -> pedir permissão da
// galeria -> abrir o seletor nativo -> usuário escolhe as fotos.
// A 1ª foto continua sendo a capa, e dá pra reordenar segurando e arrastando
// a miniatura (usa react-native-draggable-flatlist, ver README de instalação).

import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Linking,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
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
  const vagas = Math.max(0, MAXIMO_FOTOS - fotos.length);

  const itens: ItemFoto[] = fotos.map((uri, index) => ({
    key: `${uri}-${index}`,
    uri,
  }));

  // Pede permissão da galeria e, se autorizado, abre o seletor nativo.
  // Se o usuário já negou permanentemente, oferece um atalho pras Configurações do app.
  const solicitarEEscolherFotos = async () => {
    if (vagas === 0) return;

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
              { text: 'Agora não', style: 'cancel' },
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

      const resultado = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        selectionLimit: vagas,
        quality: 0.7,
      });

      if (resultado.canceled) return;

      const novasUris = resultado.assets.map((asset) => asset.uri);

      onChange(
        [...fotos, ...novasUris].slice(0, MAXIMO_FOTOS),
      );
    } finally {
      setCarregando(false);
    }
  };

  const removerFoto = (uri: string) => {
    onChange(fotos.filter((f) => f !== uri));
  };

  const handleDragEnd = ({ data }: { data: ItemFoto[] }) => {
    onChange(data.map((item) => item.uri));
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
          disabled={isActive}
          activeOpacity={0.9}
        >
          {index === 0 && (
            <Text style={styles.selo}>CAPA</Text>
          )}

          <Image
            source={{ uri: item.uri }}
            style={styles.imagem}
            resizeMode="cover"
          />

          <TouchableOpacity
            style={styles.botaoRemover}
            onPress={() => removerFoto(item.uri)}
            accessibilityLabel="Remover foto"
          >
            <MaterialCommunityIcons
              name="close"
              size={17}
              color="#FFF"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.alcaArrastar}
            onLongPress={drag}
            accessibilityLabel="Segurar e arrastar para reordenar"
          >
            <MaterialCommunityIcons
              name="drag"
              size={17}
              color="#FFF"
            />
          </TouchableOpacity>
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
            A 1ª foto será a capa — segure e arraste pra reordenar
          </Text>
        </View>
      </TouchableOpacity>

      {fotos.length > 0 && (
        <>
          <DraggableFlatList
            data={itens}
            onDragEnd={handleDragEnd}
            keyExtractor={(item) => item.key}
            renderItem={renderItem}
            numColumns={2}
            columnWrapperStyle={styles.grade}
            scrollEnabled={false}
            activationDistance={Platform.OS === 'ios' ? 0 : 10}
          />

          {vagas > 0 && (
            <TouchableOpacity
              style={styles.botaoAdicionarMais}
              onPress={solicitarEEscolherFotos}
              disabled={carregando}
            >
              <MaterialCommunityIcons
                name="plus"
                size={16}
                color={colors.textDark}
              />

              <Text style={styles.botaoAdicionarMaisTexto}>
                Adicionar mais fotos
              </Text>
            </TouchableOpacity>
          )}
        </>
      )}

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : null}
    </View>
  );
}