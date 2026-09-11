import { Pressable, Text, View } from 'react-native';

import { styles } from './styles';

interface SeletorQuantidadeProps {
  quantidade: number;
  /**
   * Rótulo exibido acima do controle (ex.: "Quantidade", "Período (dias)").
   * Opcional para manter compatibilidade com quem já usava o componente
   * sem informar rótulo — nesse caso mantém o texto fixo "Quantidade".
   */
  label?: string;
  /** Valor mínimo permitido (padrão 1). */
  minimo?: number;
  /**
   * Valor máximo permitido. Tem prioridade sobre `estoqueDisponivel`
   * quando ambos são informados — quem chama já sabe qual é o teto
   * correto para o campo (ex.: dias de locação x estoque disponível).
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
  minimo = 1,
  maximo,
  estoqueDisponivel,
  exibirEstoqueDisponivel = true,
  onDecrementar,
  onIncrementar,
}: SeletorQuantidadeProps) {
  // BUG CORRIGIDO: este componente ignorava por completo as props
  // `label`, `minimo` e `maximo` — quem chamava (ex.: ItemCarrinho, no
  // Carrinho) passava esses valores esperando que fossem respeitados
  // (rótulo "Período (dias)", limite de 30 dias, limite de estoque
  // disponível), mas o componente sempre mostrava o texto fixo
  // "Quantidade" e usava só `estoqueDisponivel` (ou 999) como teto —
  // ou seja, o limite de estoque do carrinho nunca era validado.
  const limiteMaximo =
    maximo ??
    (exibirEstoqueDisponivel && estoqueDisponivel !== undefined
      ? estoqueDisponivel
      : 999);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>
        {label}

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
              quantidade <= minimo &&
                styles.botaoDesabilitado,
            ]}
            onPress={onDecrementar}
            disabled={quantidade <= minimo}
            accessibilityLabel={`Diminuir ${label}`}
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
            accessibilityLabel={`Aumentar ${label}`}
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
