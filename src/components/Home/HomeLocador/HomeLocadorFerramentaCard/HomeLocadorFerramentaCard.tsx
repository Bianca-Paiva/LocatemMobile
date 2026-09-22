import { View, Text, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pencil } from 'lucide-react-native';

import colors from '../../../../theme/colors';
import { moedaParaNumero } from '../../../../utils/Formatacao/masks';
import { formatarValorMonetario } from '../../../../utils/Formatacao/valorMonetario';
import type { Ferramenta } from '../../../../context/Ferramentas/FerramentasContext';

import { styles } from './styles';

interface HomeLocadorFerramentaCardProps {
  ferramenta: Ferramenta;
  onEditar: (id: string) => void;
}

/**
 * Tile compacto de uma ferramenta do PRÓPRIO locador, para o carrossel da Home.
 *
 * Não reaproveita o `ProductCard` do Mobile porque ele navega para a
 * ProductScreen (catálogo público), o que não faz sentido para ferramentas
 * próprias. Ainda não existe tela de detalhe da ferramenta, então só há o
 * botão "Editar" (a Web tem "Ver" + "Editar").
 */
export default function HomeLocadorFerramentaCard({
  ferramenta,
  onEditar,
}: HomeLocadorFerramentaCardProps) {
  const ativa = ferramenta.status === 'ativa';
  const capa = ferramenta.fotos[0];

  return (
    <View style={[styles.card, !ativa && styles.cardInativo]}>
      {capa ? (
        <Image source={{ uri: capa }} style={styles.capa} resizeMode="cover" />
      ) : (
        <View style={styles.capaPlaceholder}>
          <MaterialCommunityIcons name="image-off-outline" size={22} color={colors.textMuted} />
        </View>
      )}

      <View style={styles.conteudo}>
        <View>
          <Text style={styles.nome} numberOfLines={1}>
            {ferramenta.nome}
          </Text>
          <Text style={styles.marcaModelo} numberOfLines={1}>
            {ferramenta.marca} • {ferramenta.modelo}
          </Text>

          <View style={styles.linhaPreco}>
            <View style={styles.precoLinha}>
              <Text style={styles.preco} numberOfLines={1}>
                {formatarValorMonetario(moedaParaNumero(ferramenta.valorDiaria))}
              </Text>
              <Text style={styles.precoPeriodo}>/dia</Text>
            </View>

            <View style={[styles.badge, ativa ? styles.badgeAtiva : styles.badgeInativa]}>
              <Text
                style={[
                  styles.badgeTexto,
                  ativa ? styles.badgeTextoAtiva : styles.badgeTextoInativa,
                ]}
              >
                {ativa ? 'Ativa' : 'Inativa'}
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.botaoEditar}
          onPress={() => onEditar(ferramenta.id)}
          activeOpacity={0.7}
        >
          <Pencil size={14} strokeWidth={2} color={colors.textDark} />
          <Text style={styles.botaoEditarTexto}>Editar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
