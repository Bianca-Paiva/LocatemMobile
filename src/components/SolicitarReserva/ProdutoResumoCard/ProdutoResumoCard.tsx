import { Image, Text, View } from 'react-native';

import type { ProdutoSelecionado } from '../../../context/ProdutoContext';

import { styles } from './styles';

interface ProdutoResumoCardProps {
  produto: ProdutoSelecionado;
}

export default function ProdutoResumoCard({
  produto,
}: ProdutoResumoCardProps) {
  const {
    title,
    images,
    categoria,
    locador,
    rating,
    reviewCount,
    localizacao,
    price,
  } = produto;

  return (
    <View style={styles.card}>
      <View style={styles.miniatura}>
        <Image
          source={images[0]}
          style={styles.imagem}
          resizeMode="cover"
        />
      </View>

      <View style={styles.infoProduto}>
        <Text style={styles.titulo}>
          {title}
        </Text>

        <Text style={styles.categoria}>
          {categoria}
        </Text>

        <View style={styles.locador}>
          <Image
            source={require('../../../../assets/images/icons/user.png')}
            style={styles.iconePequeno}
          />

          <Text style={styles.locadorTexto}>
            Locador:{' '}
            <Text style={styles.locadorNome}>
              {locador}
            </Text>
          </Text>
        </View>

        <View
          style={
            styles.linhaAvaliacaoLocalizacao
          }
        >
          <View style={styles.avaliacao}>
            <Image
              source={require("../../../../assets/images/StarFullYellow.png")}
              style={
                styles.iconePequenoStar
              }
            />

            <Text
              style={
                styles.avaliacaoTexto
              }
            >
              {rating
                .toFixed(1)
                .replace('.', ',')}
            </Text>

            <Text
              style={
                styles.numeroAvaliacoes
              }
            >
              ({reviewCount} avaliações)
            </Text>
          </View>

          <Text style={styles.separador}>
            •
          </Text>

          <View style={styles.localizacao}>
            <Image
              source={require('../../../../assets/images/icons/IconLocalizacao.png')}
              style={styles.iconePequeno}
            />

            <Text
              style={
                styles.localizacaoTexto
              }
            >
              {localizacao}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.precoBloco}>
        <Text style={styles.precoValor}>
          R$ {price}
        </Text>

        <Text style={styles.precoUnidade}>
          /diária
        </Text>
      </View>
    </View>
  );
}