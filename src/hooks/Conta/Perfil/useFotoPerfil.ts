import { useCallback, useState } from 'react';
import { Alert, Linking } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

// ==========================================
// TIPAGENS
// ==========================================

/**
 * Tipagem para o resultado da seleção da foto:
 * - `string`: A URI da foto escolhida com sucesso.
 * - `null`: O usuário optou por "Remover foto atual".
 * - `undefined`: O usuário cancelou a ação ou não deu permissão.
 */
type ResultadoFoto = string | null | undefined;

interface UseFotoPerfilReturn {
  escolherFoto: (temFotoAtual: boolean) => Promise<ResultadoFoto>;
  carregando: boolean;
}

// ==========================================
// CONFIGURAÇÕES FIXAS
// ==========================================

/** 
 * Opções padrão passadas para o ImagePicker (tanto câmera quanto galeria).
 * - mediaTypes: Aceita apenas imagens (não vídeos).
 * - allowsEditing: Permite ao usuário cortar a foto antes de salvar.
 * - aspect: [1, 1] força o recorte a ser um quadrado (ideal para avatar).
 * - quality: 0.7 reduz o tamanho do arquivo (compressão de 30%) mantendo boa qualidade.
 */
const OPCOES_IMAGEM: ImagePicker.ImagePickerOptions = {
  mediaTypes: ['images'],
  allowsEditing: true,
  aspect: [1, 1],
  quality: 0.7,
};

// ==========================================
// FUNÇÕES AUXILIARES
// ==========================================

/**
 * Exibe um alerta amigável quando o usuário nega a permissão de câmera ou galeria.
 * Se a permissão foi negada permanentemente (canAskAgain === false), oferece
 * um botão que redireciona o usuário direto para as configurações do celular.
 */
function avisarPermissaoNegada(
  origem: 'camera' | 'galeria',
  podePerguntarDeNovo: boolean
) {
  // Textos dinâmicos dependendo de qual permissão foi negada
  const titulo =
    origem === 'camera'
      ? 'Acesso à câmera necessário'
      : 'Acesso à galeria necessário';

  const mensagem =
    origem === 'camera'
      ? 'Precisamos da câmera para você tirar uma foto de perfil.'
      : 'Precisamos das suas fotos para você escolher uma foto de perfil.';

  // Se o sistema ainda permite mostrar o modal de permissão nativo na próxima vez,
  // apenas damos um aviso simples.
  if (podePerguntarDeNovo) {
    Alert.alert('Permissão necessária', mensagem);
    return;
  }

  // Se o usuário marcou "Não perguntar novamente" (negado permanentemente),
  // a única forma de liberar é indo nas configurações do aparelho.
  Alert.alert(
    titulo,
    `${mensagem} Libere o acesso nas configurações do aplicativo.`,
    [
      { text: 'Agora não', style: 'cancel' },
      {
        text: 'Abrir configurações',
        onPress: () => Linking.openSettings(), // Abre as config. do app no OS
      },
    ]
  );
}

// ==========================================
// HOOK PRINCIPAL: useFotoPerfil
// ==========================================

export function useFotoPerfil(): UseFotoPerfilReturn {
  // Estado para indicar se o aplicativo está processando a imagem/abrindo a câmera
  const [carregando, setCarregando] = useState(false);

  /**
   * Função responsável por pedir permissão e abrir a GALERIA.
   */
  const abrirGaleria = useCallback(async (): Promise<ResultadoFoto> => {
    // 1. Pede permissão para acessar a biblioteca de mídia
    const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();

    // 2. Se não foi concedida, chama a função de aviso e aborta (retorna undefined)
    if (!permissao.granted) {
      avisarPermissaoNegada('galeria', permissao.canAskAgain !== false);
      return undefined;
    }

    // 3. Se tem permissão, abre a galeria com as opções de corte quadrado
    const resultado = await ImagePicker.launchImageLibraryAsync(OPCOES_IMAGEM);

    // 4. Se o usuário fechou a galeria sem escolher nada, aborta
    if (resultado.canceled) return undefined;

    // 5. Retorna o caminho (URI) da imagem escolhida
    return resultado.assets?.[0]?.uri;
  }, []);

  /**
   * Função responsável por pedir permissão e abrir a CÂMERA.
   */
  const abrirCamera = useCallback(async (): Promise<ResultadoFoto> => {
    // 1. Pede permissão para acessar a câmera
    const permissao = await ImagePicker.requestCameraPermissionsAsync();

    // 2. Se não foi concedida, avisa e aborta
    if (!permissao.granted) {
      avisarPermissaoNegada('camera', permissao.canAskAgain !== false);
      return undefined;
    }

    // 3. Se tem permissão, abre a câmera para tirar a foto
    const resultado = await ImagePicker.launchCameraAsync(OPCOES_IMAGEM);

    // 4. Se fechou a câmera sem tirar a foto, aborta
    if (resultado.canceled) return undefined;

    // 5. Retorna o caminho (URI) da foto tirada
    return resultado.assets?.[0]?.uri;
  }, []);

  /**
   * Função principal exportada pelo hook.
   * Ela exibe um menu (Action Sheet/Alert) para o usuário decidir DE ONDE quer a foto.
   */
  const escolherFoto = useCallback(
    async (temFotoAtual: boolean): Promise<ResultadoFoto> => {
      
      // O Alert.alert do React Native NÃO retorna uma Promise naturalmente.
      // Envolvemos o Alert em uma Promise customizada para fazer o código "esperar"
      // o usuário clicar em algum botão antes de continuar a execução.
      const origem = await new Promise<
        'camera' | 'galeria' | 'remover' | undefined
      >((resolve) => {
        
        // Monta os botões do menu dinamicamente
        const botoes = [
          {
            text: 'Tirar foto',
            onPress: () => resolve('camera'),
          },
          {
            text: 'Escolher da galeria',
            onPress: () => resolve('galeria'),
          },
          // Se o usuário JÁ TEM uma foto, adicionamos o botão de remover
          ...(temFotoAtual
            ? [
                {
                  text: 'Remover foto atual',
                  style: 'destructive' as const, // Fica vermelho no iOS
                  onPress: () => resolve('remover'),
                },
              ]
            : []),
          {
            text: 'Cancelar',
            style: 'cancel' as const,
            onPress: () => resolve(undefined),
          },
        ];

        Alert.alert('Foto de perfil', undefined, botoes, {
          // No Android, tocar fora da caixa de diálogo fecha o Alert.
          // Precisamos capturar isso para resolver a Promise, senão o app trava aguardando.
          cancelable: true,
          onDismiss: () => resolve(undefined), 
        });
      });

      // Se o usuário cancelou o menu, encerra retornando undefined
      if (!origem) return undefined;
      
      // Se o usuário clicou em remover, encerra retornando null
      if (origem === 'remover') return null;

      // Se escolheu Câmera ou Galeria, inicia o carregamento
      setCarregando(true);

      try {
        // Dispara a função correspondente baseada na escolha
        return origem === 'camera'
          ? await abrirCamera()
          : await abrirGaleria();
      } catch (error) {
        // Captura e exibe qualquer erro inesperado ao abrir as ferramentas nativas
        console.warn('[useFotoPerfil] Falha ao selecionar a foto.', error);

        Alert.alert(
          'Erro',
          'Não foi possível abrir a ' +
            (origem === 'camera' ? 'câmera.' : 'galeria.')
        );

        return undefined;
      } finally {
        // Independentemente de sucesso ou erro, remove o estado de carregamento ao final
        setCarregando(false);
      }
    },
    [abrirCamera, abrirGaleria]
  );

  // Retorna a função principal e o estado de carregamento para o componente que chamar o hook
  return { escolherFoto, carregando };
}