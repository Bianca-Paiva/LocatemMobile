import { Pressable, Text, View } from 'react-native';
import { styles } from './styles';

export interface SeletorQuantidadeProps {
  quantidade: number;
  /**
   * Rótulo exibido acima do controle (ex.: "Quantidade", "Período (dias)").
   * Padrão: "Quantidade".
   */
  label?: string;
  /** Indica se o campo é obrigatório (adiciona o asterisco). */
  required?: boolean;
  /** Valor mínimo permitido (padrão 1). */
  minimo?: number;
  /**
   * Valor máximo permitido. Tem prioridade sobre `estoqueDisponivel`
   * quando ambos são informados.
   */
  maximo?: number;
  estoqueDisponivel?: number;
  exibirEstoqueDisponivel?: boolean;
  onDecrementar: () => void;
  onIncrementar: () => void;
}

export default function SeletorQuantidade({
  quantidade,
  label = 'Quantidade',
  required = false,
  minimo = 1,
  maximo,
  estoqueDisponivel,
  exibirEstoqueDisponivel = true,
  onDecrementar,
  onIncrementar,
}: SeletorQuantidadeProps) {
  // Lógica corrigida mantida: respeita maximo customizado ou estoque
  const limiteMaximo =
    maximo ??
    (exibirEstoqueDisponivel && estoqueDisponivel !== undefined
      ? estoqueDisponivel
      : 999);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>
        {label}

        {/* Resgatado da versão Inputs: Asterisco de campo obrigatório */}
        {required && (
          <Text style={styles.required}>
            {' '}*
          </Text>
        )}

        {/* Lógica de exibição de estoque */}
        {exibirEstoqueDisponivel && estoqueDisponivel !== undefined && (
          <Text style={styles.estoque}>
            {' '}({estoqueDisponivel}{' '}
            {estoqueDisponivel === 1 ? 'disponível' : 'disponíveis'})
          </Text>
        )}
      </Text>

      <View style={styles.linha}>
        <View style={styles.controle}>
          <Pressable
            style={[
              styles.botao,
              quantidade <= minimo && styles.botaoDesabilitado,
            ]}
            onPress={onDecrementar}
            disabled={quantidade <= minimo}
            accessibilityLabel={`Diminuir ${label}`}
          >
            <Text style={styles.botaoTexto}>−</Text>
          </Pressable>

          <Text style={styles.valor}>{quantidade}</Text>

          <Pressable
            style={[
              styles.botao,
              quantidade >= limiteMaximo && styles.botaoDesabilitado,
            ]}
            onPress={onIncrementar}
            disabled={quantidade >= limiteMaximo}
            accessibilityLabel={`Aumentar ${label}`}
          >
            <Text style={styles.botaoTexto}>+</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}