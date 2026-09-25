import React, { useMemo, useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import SecondaryHeader from '../../../components/Layout/SecondaryHeader';
import SortFilter from '../../../components/Busca/SortFilter';
import { CabecalhoLoja } from '../../../components/Ferramentas/PerfilLoja/CabecalhoLoja';
import { CategoriasLoja } from '../../../components/Ferramentas/PerfilLoja/CategoriasLoja';
import { CardFerramentaLoja } from '../../../components/Ferramentas/PerfilLoja/CardFerramentaLoja';

import { useCatalogoStore } from '../../../hooks/Ferramentas/useCatalogoStore';
import { useProdutoStore } from '../../../hooks/Ferramentas/useProdutoStore';
import { useFavoritosStore } from '../../../hooks/Ferramentas/useFavoritosStore';
import { getLocadorByNome } from '../../../mocks/locadoresMock';
import { extrairCategoriaTopo } from '../../../utils/Ferramentas/Catalogo/categorias';
import type { Produto } from '../../../types/Ferramentas/produto.types';
import type { RootStackParamList } from '../../../routes/AppRoutes';

import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';

const CATEGORIA_TODAS = 'Todas';

type PerfilLojaRouteProp = RouteProp<RootStackParamList, 'PerfilLojaScreen'>;

export default function PerfilLojaScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<PerfilLojaRouteProp>();
  const locadorNome = route.params?.locadorNome;

  const { produtos } = useCatalogoStore();
  const { setProdutoSelecionado } = useProdutoStore();

  const locador = getLocadorByNome(locadorNome);

  // Vitrine = todos os produtos do catálogo real anunciados por essa loja
  // (nunca uma lista fixa), assim uma ferramenta nova cadastrada pelo
  // locador aparece aqui automaticamente.
  const produtosDaLoja = useMemo(
    () => produtos.filter((produto) => produto.locador === locadorNome),
    [produtos, locadorNome],
  );

  const categorias = useMemo(() => {
    const vistas = new Set<string>();
    const lista = [CATEGORIA_TODAS];

    for (const produto of produtosDaLoja) {
      const topo = extrairCategoriaTopo(produto.categoria);
      if (!vistas.has(topo)) {
        vistas.add(topo);
        lista.push(topo);
      }
    }

    return lista;
  }, [produtosDaLoja]);

  const [categoriaAtiva, setCategoriaAtiva] = useState(CATEGORIA_TODAS);
  const [sort, setSort] = useState('Mais relevantes');
  // Favoritos vivem no FavoritosContext (estado global), não mais numa lista
  // local — assim curtir uma ferramenta aqui também a coloca na tela
  // "Meus Favoritos" (Conta > Painel de Controle > Favoritos).
  const { favoritos, alternarFavorito } = useFavoritosStore();

  const [search, setSearch] = useState('');

  const produtosFiltrados = useMemo(() => {
    const filtrados =
      categoriaAtiva === CATEGORIA_TODAS
        ? produtosDaLoja
        : produtosDaLoja.filter(
            (produto) => extrairCategoriaTopo(produto.categoria) === categoriaAtiva,
          );

    return [...filtrados].sort((a, b) => {
      const precoA = parseFloat(a.price.replace(',', '.'));
      const precoB = parseFloat(b.price.replace(',', '.'));

      if (sort === 'Menor preço') return precoA - precoB;
      if (sort === 'Maior preço') return precoB - precoA;
      if (sort === 'Melhores avaliações') return b.rating - a.rating;
      return 0;
    });
  }, [produtosDaLoja, categoriaAtiva, sort]);

  const handleVerDetalhes = (produto: Produto) => {
    setProdutoSelecionado(produto);
    navigation.navigate('ProductScreen');
  };

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
    
        <View style={styles.conteudo}>
          <CabecalhoLoja
            nome={locador.nome}
            logoUrl={locador.logoUrl}
            verificado={locador.verificado}
            desde={locador.desde}
            localizacao={locador.localizacao}
            descricao={locador.descricao}
            rating={locador.rating}
            reviewCount={locador.reviewCount}
            ferramentasAnunciadas={produtosDaLoja.length}
            locacoesConcluidas={locador.locacoes}
          />

          <Text style={styles.tituloSecao}>Ferramentas da loja</Text>
          <Text style={styles.subtituloSecao}>
            {produtosDaLoja.length} ferramenta{produtosDaLoja.length === 1 ? '' : 's'} disponíve
            {produtosDaLoja.length === 1 ? 'l' : 'is'} para locação
          </Text>

          <View style={styles.categoriasWrapper}>
            <CategoriasLoja
              categorias={categorias}
              ativa={categoriaAtiva}
              onChange={setCategoriaAtiva}
            />
          </View>

          <View style={styles.barraOrdenacao}>
            <Text style={styles.barraOrdenacaoTexto}>Ordenar por</Text>
            <SortFilter value={sort} onSelect={setSort} />
          </View>

          {produtosFiltrados.length > 0 ? (
            <View style={styles.grid}>
              {produtosFiltrados.map((produto) => (
                <CardFerramentaLoja
                  key={produto.id}
                  produto={produto}
                  favoritado={favoritos.includes(produto.id)}
                  onToggleFavorito={alternarFavorito}
                  onVerDetalhes={handleVerDetalhes}
                />
              ))}
            </View>
          ) : (
            <View style={styles.estadoVazio}>
              <Text style={styles.estadoVazioTexto}>
                Essa loja ainda não tem ferramentas nessa categoria.
              </Text>
            </View>
          )}
        </View>

      </ScrollView>
      
     </View>

  
  );
}
