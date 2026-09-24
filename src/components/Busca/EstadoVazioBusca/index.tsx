import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';

interface EstadoVazioBuscaProps {
  /** Termo digitado na busca (já sem espaços nas pontas). Vazio = nenhum termo buscado. */
  termoBusca: string;
  /** Indica se algum filtro do FilterDrawer está ativo (categoria, marca, preço, etc). */
  temFiltrosAtivos: boolean;
  /** Limpa filtros e/ou termo de busca. Só é exibido quando há algo pra limpar. */
  onLimpar: () => void;
}

/**
 * Estado vazio da tela de Busca — substitui o antigo texto solto
 * ("Nenhum produto encontrado com os filtros selecionados.") por uma
 * mensagem amigável e contextual:
 * - Busca por texto sem resultado -> menciona o termo buscado.
 * - Só filtros aplicados, sem busca -> menciona os filtros.
 * - Os dois combinados -> menciona ambos.
 * Sempre oferece uma ação clara pra sair do estado vazio.
 */
export default function EstadoVazioBusca({
  termoBusca,
  temFiltrosAtivos,
  onLimpar,
}: EstadoVazioBuscaProps) {
  const { titulo, descricao } = montarMensagem(termoBusca, temFiltrosAtivos);
  const mostrarBotao = Boolean(termoBusca) || temFiltrosAtivos;

  return (
    <View style={styles.container}>
      <Ionicons
        name="search-outline"
        size={40}
        color="#9CA3AF"
        style={styles.icon}
      />

      <Text style={styles.title}>{titulo}</Text>
      <Text style={styles.description}>{descricao}</Text>

      {mostrarBotao && (
        <TouchableOpacity style={styles.limparButton} onPress={onLimpar}>
          <Text style={styles.limparButtonText}>
            {termoBusca ? 'Limpar busca e filtros' : 'Limpar filtros'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

function montarMensagem(termoBusca: string, temFiltrosAtivos: boolean) {
  if (termoBusca && temFiltrosAtivos) {
    return {
      titulo: 'Nenhum resultado encontrado',
      descricao: `Não encontramos ferramentas para "${termoBusca}" com os filtros selecionados. Tente remover algum filtro ou buscar por outro termo.`,
    };
  }

  if (termoBusca) {
    return {
      titulo: 'Nenhum resultado encontrado',
      descricao: `Não encontramos ferramentas para "${termoBusca}". Confira a digitação ou tente um termo mais genérico.`,
    };
  }

  if (temFiltrosAtivos) {
    return {
      titulo: 'Nenhuma ferramenta com esses filtros',
      descricao: 'Não há ferramentas disponíveis para a combinação de filtros selecionada. Tente remover algum deles.',
    };
  }

  return {
    titulo: 'Nenhuma ferramenta por aqui ainda',
    descricao: 'Assim que novas ferramentas forem cadastradas, elas aparecem nesta tela.',
  };
}
