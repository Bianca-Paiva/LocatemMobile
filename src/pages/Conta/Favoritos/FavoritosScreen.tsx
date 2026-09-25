import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HeartOff, ChevronDown, ChevronUp } from 'lucide-react-native';

import SecondaryHeader from '../../../components/Layout/SecondaryHeader';
import { CardFerramentaLoja } from '../../../components/Ferramentas/PerfilLoja/CardFerramentaLoja';

import { useCatalogoStore } from '../../../hooks/Ferramentas/useCatalogoStore';
import { useProdutoStore } from '../../../hooks/Ferramentas/useProdutoStore';
import { useFavoritosStore } from '../../../hooks/Ferramentas/useFavoritosStore';
import type { Produto } from '../../../types/Ferramentas/produto.types';
import type { RootStackParamList } from '../../../routes/AppRoutes';

import { styles } from './styles';

// Mesmo critério de "disponível" usado no CardFerramentaLoja: precisa estar
// marcado como `available` E ter estoque > 0. Qualquer outro caso conta como
// "Indisponível" — inclusive "última unidade", que continua disponível.
function estaDisponivel(produto: Produto) {
  return produto.available && produto.estoqueDisponivel > 0;
}

type Aba = 'todos' | 'disponiveis' | 'indisponiveis';

const OPCOES_ORDENACAO = ['Mais recentes', 'Menor preço', 'Maior preço', 'Melhores avaliações'];

export default function FavoritosScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const { produtos } = useCatalogoStore();
  const { setProdutoSelecionado } = useProdutoStore();
  const { favoritos, alternarFavorito } = useFavoritosStore();

  const [search, setSearch] = useState('');
  const [aba, setAba] = useState<Aba>('todos');
  const [ordenacao, setOrdenacao] = useState(OPCOES_ORDENACAO[0]);
  const [dropdownAberto, setDropdownAberto] = useState(false);

  // Favoritos = produtos do catálogo real cujo id está salvo no FavoritosContext.
  // Preserva a ordem de `favoritos` (mais recente favoritado por último) e
  // depois inverte, pra "Mais recentes" mostrar o último curtido primeiro.
  const produtosFavoritos = useMemo(() => {
    const porId = new Map(produtos.map((produto) => [produto.id, produto]));
    return favoritos
      .map((id) => porId.get(id))
      .filter((produto): produto is Produto => Boolean(produto))
      .reverse();
  }, [produtos, favoritos]);

  const disponiveis = useMemo(
    () => produtosFavoritos.filter(estaDisponivel),
    [produtosFavoritos],
  );

  const indisponiveis = useMemo(
    () => produtosFavoritos.filter((produto) => !estaDisponivel(produto)),
    [produtosFavoritos],
  );

  const listaDaAba = useMemo(() => {
    if (aba === 'disponiveis') return disponiveis;
    if (aba === 'indisponiveis') return indisponiveis;
    return produtosFavoritos;
  }, [aba, produtosFavoritos, disponiveis, indisponiveis]);

  const listaOrdenada = useMemo(() => {
    const lista = [...listaDaAba];

    if (ordenacao === 'Menor preço') {
      return lista.sort(
        (a, b) => parseFloat(a.price.replace(',', '.')) - parseFloat(b.price.replace(',', '.')),
      );
    }

    if (ordenacao === 'Maior preço') {
      return lista.sort(
        (a, b) => parseFloat(b.price.replace(',', '.')) - parseFloat(a.price.replace(',', '.')),
      );
    }

    if (ordenacao === 'Melhores avaliações') {
      return lista.sort((a, b) => b.rating - a.rating);
    }

    // "Mais recentes": já vem nessa ordem (ver produtosFavoritos acima).
    return lista;
  }, [listaDaAba, ordenacao]);

  const handleVerDetalhes = (produto: Produto) => {
    setProdutoSelecionado(produto);
    navigation.navigate('ProductScreen');
  };

  const abas: { chave: Aba; rotulo: string; total: number }[] = [
    { chave: 'todos', rotulo: 'Todos', total: produtosFavoritos.length },
    { chave: 'disponiveis', rotulo: 'Disponíveis', total: disponiveis.length },
    { chave: 'indisponiveis', rotulo: 'Indisponíveis', total: indisponiveis.length },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SecondaryHeader
          search={search}
          setSearch={setSearch}
          buscarProduto={() => {
            if (search.trim()) {
              navigation.navigate('SearchScreen', { search: search.trim() });
            }
          }}
        />

        <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.safe}>
          <View style={styles.conteudo}>
            <Text style={styles.titulo}>Meus Favoritos</Text>
            <Text style={styles.subtitulo}>
              Aqui estão as ferramentas que você salvou para alugar depois.
            </Text>

            <View style={styles.abas}>
              {abas.map((item) => {
                const ativa = item.chave === aba;
                return (
                  <Pressable
                    key={item.chave}
                    onPress={() => setAba(item.chave)}
                    accessibilityRole="button"
                    accessibilityState={{ selected: ativa }}
                    style={[styles.aba, ativa && styles.abaAtiva]}
                  >
                    <Text style={[styles.abaTexto, ativa && styles.abaTextoAtiva]}>
                      {item.rotulo} ({item.total})
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <View style={styles.dropdownWrapper}>
              <Pressable
                style={styles.dropdownBotao}
                onPress={() => setDropdownAberto((atual) => !atual)}
                accessibilityRole="button"
              >
                <Text style={styles.dropdownTexto}>{ordenacao}</Text>
                {dropdownAberto ? (
                  <ChevronUp size={18} color="#6B7280" />
                ) : (
                  <ChevronDown size={18} color="#6B7280" />
                )}
              </Pressable>

              {dropdownAberto && (
                <View style={styles.dropdownLista}>
                  {OPCOES_ORDENACAO.map((opcao) => (
                    <Pressable
                      key={opcao}
                      style={[
                        styles.dropdownItem,
                        opcao === ordenacao && styles.dropdownItemAtivo,
                      ]}
                      onPress={() => {
                        setOrdenacao(opcao);
                        setDropdownAberto(false);
                      }}
                    >
                      <Text
                        style={[
                          styles.dropdownItemTexto,
                          opcao === ordenacao && styles.dropdownItemTextoAtivo,
                        ]}
                      >
                        {opcao}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>

            {listaOrdenada.length > 0 ? (
              <View style={styles.grid}>
                {listaOrdenada.map((produto) => (
                  <CardFerramentaLoja
                    key={produto.id}
                    produto={produto}
                    favoritado
                    onToggleFavorito={alternarFavorito}
                    onVerDetalhes={handleVerDetalhes}
                  />
                ))}
              </View>
            ) : (
              <View style={styles.estadoVazio}>
                <HeartOff size={40} color="#D0D0D0" />
                <Text style={styles.estadoVazioTitulo}>
                  {produtosFavoritos.length === 0
                    ? 'Você ainda não tem favoritos'
                    : 'Nada por aqui'}
                </Text>
                <Text style={styles.estadoVazioTexto}>
                  {produtosFavoritos.length === 0
                    ? 'Toque no coração de uma ferramenta para salvá-la aqui e alugar depois.'
                    : 'Nenhuma ferramenta favoritada se encaixa nesse filtro no momento.'}
                </Text>
              </View>
            )}
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}
