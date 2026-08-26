import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../../../theme/colors';
import { moedaParaNumero } from '../../../hooks/masks';
import styles from './styles';
import type { FerramentaCardProps } from './types';

// Formata a string da diária (ex: "89,90") pro formato de moeda BRL.
function formatarPreco(valorDiaria: string) {
  const numero = moedaParaNumero(valorDiaria);
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(numero);
}

export default function FerramentaCard({
  ferramenta,
  onEditar,
  onRemover,
  onAlternarStatus,
}: FerramentaCardProps) {
  const ativa = ferramenta.status === 'ativa';
  const capa = ferramenta.fotos[0];

  const confirmarRemocao = () => {
    Alert.alert(
      'Remover ferramenta',
      `Tem certeza que deseja remover "${ferramenta.nome}"? Essa ação não pode ser desfeita.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Remover', style: 'destructive', onPress: () => onRemover(ferramenta.id) },
      ],
    );
  };

  return (
    <View style={[styles.container, !ativa && styles.containerInativo]}>
      {capa ? (
        <Image source={{ uri: capa }} style={styles.imagem} resizeMode="cover" />
      ) : (
        <View style={styles.imagemPlaceholder}>
          <MaterialCommunityIcons name="image-off-outline" size={22} color={colors.textMuted} />
        </View>
      )}

      <View style={styles.conteudo}>
        <View>
          <View style={styles.linhaTopo}>
            <View style={styles.textos}>
              <Text style={styles.nome} numberOfLines={1}>
                {ferramenta.nome}
              </Text>
              <Text style={styles.marcaModelo} numberOfLines={1}>
                {ferramenta.marca} • {ferramenta.modelo}
              </Text>
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

          <View style={styles.precoLinha}>
            <Text style={styles.preco}>{formatarPreco(ferramenta.valorDiaria)}</Text>
            <Text style={styles.precoPeriodo}>/dia</Text>
          </View>
        </View>

        <View style={styles.acoes}>
          <TouchableOpacity style={styles.acaoBtn} onPress={() => onEditar(ferramenta.id)}>
            <MaterialCommunityIcons name="pencil-outline" size={15} color={colors.textDark} />
            <Text style={styles.acaoTexto}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.acaoBtn}
            onPress={() => onAlternarStatus(ferramenta.id)}
          >
            <MaterialCommunityIcons
              name={ativa ? 'eye-off-outline' : 'eye-outline'}
              size={15}
              color={colors.textDark}
            />
            <Text style={styles.acaoTexto}>{ativa ? 'Desativar' : 'Ativar'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.acaoBtn} onPress={confirmarRemocao}>
            <MaterialCommunityIcons name="trash-can-outline" size={15} color={colors.error} />
            <Text style={[styles.acaoTexto, styles.acaoTextoRemover]}>Remover</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
