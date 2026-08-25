import { Pressable, Text, View } from 'react-native';

import { styles } from './styles';

interface SeletorQuantidadeProps {
  quantidade: number;
  estoqueDisponivel?: number;
  exibirEstoqueDisponivel?: boolean;
  onDecrementar: () => void;
  onIncrementar: () => void;
}

export default function SeletorQuantidade({
  quantidade,
  estoqueDisponivel,
  exibirEstoqueDisponivel = true,
  onDecrementar,
  onIncrementar,
}: SeletorQuantidadeProps) {
  const limiteMaximo =
    exibirEstoqueDisponivel &&
    estoqueDisponivel !== undefined
      ? estoqueDisponivel
      : 999;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>
        Quantidade

        <Text style={styles.required}>
          {' '}*
        </Text>

        {exibirEstoqueDisponivel &&
          estoqueDisponivel !== undefined && (
            <Text style={styles.estoque}>
              {' '}({estoqueDisponivel}{' '}
              {estoqueDisponivel === 1
                ? 'disponível'
                : 'disponíveis'})
            </Text>
          )}
      </Text>

      <View style={styles.linha}>
        <View style={styles.controle}>
          <Pressable
            style={[
              styles.botao,
              quantidade <= 1 &&
                styles.botaoDesabilitado,
            ]}
            onPress={onDecrementar}
            disabled={quantidade <= 1}
          >
            <Text style={styles.botaoTexto}>
              −
            </Text>
          </Pressable>

          <Text style={styles.valor}>
            {quantidade}
          </Text>

          <Pressable
            style={[
              styles.botao,
              quantidade >= limiteMaximo &&
                styles.botaoDesabilitado,
            ]}
            onPress={onIncrementar}
            disabled={
              quantidade >= limiteMaximo
            }
          >
            <Text style={styles.botaoTexto}>
              +
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
