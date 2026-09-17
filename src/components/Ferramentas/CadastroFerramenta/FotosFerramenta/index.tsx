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
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

import styles from './styles';
import colors from '../../../../theme/colors';
import type { FotosFerramentaProps } from './types';

// ==========================================
// CONSTANTES E CONFIGURAÇÕES
// ==========================================
const MAXIMO_FOTOS = 8;  // Limite máximo de fotos permitidas
const ESPACO = 8;        // Espaçamento (gap) entre as fotos na grade
const ALTURA_FOTO = 180; // Altura fixa de cada miniatura
const COLUNAS = 2;       // Quantidade de colunas na grade

// ==========================================
// TIPAGENS
// ==========================================
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

// ==========================================
// COMPONENTE: FotoArrastavel
// Representa uma miniatura individual que pode ser arrastada
// ==========================================
function FotoArrastavel({
  item,
  index,
  largura,
  onMover,
  onRemover,
  onArrasteMudou,
}: FotoArrastavelProps) {
  // Valores animados controlados pela thread nativa (Reanimated)
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const ativa = useSharedValue(false);

  // Configuração do gesto de arrastar
  const gesture = Gesture.Pan()
    .activateAfterLongPress(300) // Exige que segure por 300ms para começar a arrastar
    .onStart(() => {
      ativa.value = true;
      scheduleOnRN(onArrasteMudou, true); // Notifica o React para possivelmente travar o scroll da tela
    })
    .onUpdate((event) => {
      // Atualiza a posição visual da foto enquanto o dedo move
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd((event) => {
      // Quando soltar a foto, salva as posições finais
      const x = event.translationX;
      const y = event.translationY;

      // Volta a foto para o eixo inicial de forma suave
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
      ativa.value = false;

      // Aciona a função de mover passando a posição onde a foto foi solta
      scheduleOnRN(onMover, index, x, y);
      scheduleOnRN(onArrasteMudou, false);
    })
    .onFinalize(() => {
      // Garantia: se o gesto for interrompido, zera as posições
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);

      if (ativa.value) {
        scheduleOnRN(onArrasteMudou, false);
      }
      ativa.value = false;
    });

  // Estilos dinâmicos baseados no estado do arraste
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: ativa.value ? 1.04 : 1 }, // Efeito de "zoom" ao pegar a foto
      ],
      zIndex: ativa.value ? 100 : 1, // Traz a foto para a frente
      elevation: ativa.value ? 10 : 1,
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          styles.miniatura,
          { width: largura, height: ALTURA_FOTO },
          animatedStyle,
        ]}
      >
        <Image
          source={{ uri: item.uri }}
          style={styles.imagem}
          resizeMode="cover"
        />

        {/* Se for a primeira foto, exibe a tag "CAPA" */}
        {index === 0 && (
          <View style={styles.selo}>
            <Text style={styles.seloTexto}>CAPA</Text>
          </View>
        )}

        {/* Botão para remover a foto (ícone de X) */}
        <TouchableOpacity
          style={styles.botaoRemover}
          onPress={() => onRemover(item.uri)}
          activeOpacity={0.8}
          accessibilityLabel="Remover foto"
        >
          <MaterialCommunityIcons name="close" size={18} color="#FFF" />
        </TouchableOpacity>

        {/* Ícone meramente visual indicando que é possível arrastar */}
        <View pointerEvents="none" style={styles.indicadorArraste}>
          <MaterialCommunityIcons name="drag" size={19} color="#FFF" />
        </View>
      </Animated.View>
    </GestureDetector>
  );
}

// ==========================================
// COMPONENTE PRINCIPAL: FotosFerramenta
// Gerencia a lista de fotos, uploads e ordenação
// ==========================================
export default function FotosFerramenta({
  fotos,
  onChange,
  error,
  onDragStateChange,
}: FotosFerramentaProps) {
  // Controle de estado de carregamento e dimensões da grade
  const [carregando, setCarregando] = useState(false);
  const [larguraGrade, setLarguraGrade] = useState(0);

  // Calcula quantas fotos ainda podem ser inseridas
  const vagas = Math.max(0, MAXIMO_FOTOS - fotos.length);

  // Prepara o array de itens memoizado
  const itens: ItemFoto[] = useMemo(
    () => fotos.map((uri) => ({ key: uri, uri })),
    [fotos]
  );

  // Calcula dinamicamente a largura que cada foto deve ter para caber nas colunas
  const larguraFoto = larguraGrade > 0 ? (larguraGrade - ESPACO) / COLUNAS : 0;

  // Notifica quando há interação de arraste acontecendo
  const notificarArraste = useCallback(
    (ativo: boolean) => {
      onDragStateChange?.(ativo);
    },
    [onDragStateChange]
  );

  // Função para abrir a galeria e adicionar fotos
  const solicitarEEscolherFotos = useCallback(async () => {
    if (vagas === 0) return; // Trava de segurança

    try {
      setCarregando(true);

      // 1. Pede permissão de galeria
      const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissao.granted) {
        // Se a permissão foi negada permanentemente, direciona para configurações
        if (permissao.canAskAgain === false) {
          Alert.alert(
            'Acesso à galeria necessário',
            'Permita o acesso às fotos nas configurações do aplicativo.',
            [
              { text: 'Agora não', style: 'cancel' },
              { text: 'Abrir Configurações', onPress: () => Linking.openSettings() },
            ]
          );
        } else {
          Alert.alert(
            'Permissão necessária',
            'Precisamos de acesso às suas fotos para cadastrar a ferramenta.'
          );
        }
        return;
      }

      // 2. Abre o seletor de fotos nativo
      const resultado = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsMultipleSelection: true,
        selectionLimit: vagas,
        quality: 0.7, // Comprime levemente para otimizar tamanho
      });

      if (resultado.canceled) return;

      // 3. Extrai as URIs e atualiza o estado geral
      const novasUris = resultado.assets.map((asset) => asset.uri);
      onChange([...fotos, ...novasUris].slice(0, MAXIMO_FOTOS));
    } catch (erro) {
      console.error('Erro ao selecionar imagens:', erro);
      Alert.alert('Erro', 'Não foi possível abrir a galeria.');
    } finally {
      setCarregando(false);
    }
  }, [fotos, onChange, vagas]);

  // Função simples para remover foto baseada na string (URI)
  const removerFoto = useCallback(
    (uri: string) => {
      onChange(fotos.filter((foto) => foto !== uri));
    },
    [fotos, onChange]
  );

  // Função complexa: Calcula a nova posição na grade quando soltamos uma foto
  const moverFoto = useCallback(
    (indiceInicial: number, translationX: number, translationY: number) => {
      if (larguraFoto <= 0 || fotos.length <= 1) return;

      // Acha a linha e coluna de onde a foto começou
      const colunaInicial = indiceInicial % COLUNAS;
      const linhaInicial = Math.floor(indiceInicial / COLUNAS);

      // Centro em pixels da posição inicial
      const centroInicialX = colunaInicial * (larguraFoto + ESPACO) + larguraFoto / 2;
      const centroInicialY = linhaInicial * (ALTURA_FOTO + ESPACO) + ALTURA_FOTO / 2;

      // Posição do toque do dedo quando a foto foi solta (pixels)
      const centroFinalX = centroInicialX + translationX;
      const centroFinalY = centroInicialY + translationY;

      // Transforma esses pixels na nova Coluna e Linha destino
      let coluna = Math.floor(centroFinalX / (larguraFoto + ESPACO));
      let linha = Math.floor(centroFinalY / (ALTURA_FOTO + ESPACO));

      const totalLinhas = Math.ceil(fotos.length / COLUNAS);

      // Trava para o dedo não soltar fora dos limites da grade
      coluna = Math.max(0, Math.min(COLUNAS - 1, coluna));
      linha = Math.max(0, Math.min(totalLinhas - 1, linha));

      // Transforma a Coluna/Linha de volta num índice (Ex: posição 3 do array)
      let destino = linha * COLUNAS + coluna;
      destino = Math.max(0, Math.min(fotos.length - 1, destino));

      if (destino === indiceInicial) return; // Não mudou de lugar

      // Reordena o array e atualiza o pai
      const novaOrdem = [...fotos];
      const [fotoMovida] = novaOrdem.splice(indiceInicial, 1);
      novaOrdem.splice(destino, 0, fotoMovida);

      onChange(novaOrdem);
    },
    [fotos, larguraFoto, onChange]
  );

  // Divide o array flat de fotos em arrays 2D para renderizar em linhas e colunas
  const linhas: ItemFoto[][] = [];
  for (let i = 0; i < itens.length; i += COLUNAS) {
    linhas.push(itens.slice(i, i + COLUNAS));
  }

  return (
    <View style={styles.wrapper}>
      {/* Botão Gigante de Upload (Dropzone) */}
      <TouchableOpacity
        style={[styles.dropzone, error ? styles.dropzoneErro : null]}
        onPress={solicitarEEscolherFotos}
        disabled={vagas === 0 || carregando}
        activeOpacity={0.85}
      >
        <View style={styles.iconeUpload}>
          <MaterialCommunityIcons name="tray-arrow-up" size={26} color={colors.amber} />
        </View>

        <Text style={styles.textoPrincipal}>
          {carregando ? 'Abrindo galeria...' : 'Toque para enviar arquivos'}
        </Text>

        <Text style={styles.textoSecundario}>
          Selecione as fotos <Text style={styles.link}>direto da sua galeria</Text>
        </Text>

        {/* Textos informativos de limites e regras */}
        <View style={styles.badges}>
          <Text style={styles.badge}>
            Até 8 fotos — {fotos.length}/8 adicionadas
          </Text>
          <Text style={styles.badge}>Mínimo 1 foto obrigatória</Text>
          <Text style={styles.badge}>
            A 1ª foto será a capa — segure e arraste pra reordenar
          </Text>
        </View>
      </TouchableOpacity>

      {/* Renderização das Fotos Adicionadas */}
      {fotos.length > 0 && (
        <>
          <View
            style={styles.gradeFotos}
            // onLayout captura a largura real da View após renderizar em tela
            onLayout={(event) => {
              setLarguraGrade(event.nativeEvent.layout.width);
            }}
          >
            {linhas.map((linha, numeroLinha) => (
              <View key={`linha-${numeroLinha}`} style={styles.gradeLinha}>
                
                {linha.map((item, posicaoNaLinha) => {
                  const index = numeroLinha * COLUNAS + posicaoNaLinha;

                  return (
                    <FotoArrastavel
                      key={item.key}
                      item={item}
                      index={index}
                      largura={larguraFoto}
                      onMover={moverFoto}
                      onRemover={removerFoto}
                      onArrasteMudou={notificarArraste}
                    />
                  );
                })}

                {/* Preenchimento (Placeholder) se sobrar espaço na linha (ex: número ímpar de fotos) */}
                {linha.length === 1 && (
                  <View style={{ width: larguraFoto }} />
                )}
              </View>
            ))}
          </View>

          {/* Botão extra para adicionar mais caso não tenha atingido o limite (8) */}
          {vagas > 0 && (
            <TouchableOpacity
              style={styles.botaoAdicionarMais}
              onPress={solicitarEEscolherFotos}
              disabled={carregando}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons name="plus" size={16} color={colors.textDark} />
              <Text style={styles.botaoAdicionarMaisTexto}>Adicionar mais fotos</Text>
            </TouchableOpacity>
          )}
        </>
      )}

      {/* Exibe mensagem de erro se a prop 'error' for passada pelo componente pai */}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}