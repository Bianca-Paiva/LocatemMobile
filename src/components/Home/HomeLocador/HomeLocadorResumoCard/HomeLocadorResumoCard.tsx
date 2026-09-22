import type { ReactNode } from 'react';
import { View, Text } from 'react-native';

import { styles } from './styles';

interface HomeLocadorResumoCardProps {
  /**
   * Ícone já renderizado, COM a cor aplicada (`color`). No RN o ícone não
   * herda `currentColor` do wrapper como na Web, por isso não existe a prop
   * `corIcone` aqui. Use as cores da paleta dos badges de status.
   */
  icone: ReactNode;
  /** Cor do círculo de fundo do ícone. */
  fundoIcone: string;
  label: string;
  valor: string;
  /** Texto auxiliar cinza abaixo do valor (ex: "de 4 ferramentas ativas"). Ignorado quando `tendencia` é informado. */
  legenda?: string;
  /** Texto de tendência (ex: "+1 este mês"), sempre em tom positivo — omita quando não há dado real (nunca "+0"). */
  tendencia?: string;
  /** Conteúdo extra abaixo do valor (usado pelo card "Avaliação média" para exibir as estrelas). */
  extra?: ReactNode;
}

/**
 * Card de resumo (KPI) do topo da Home do Locador: todos os 5 são a mesma
 * peça visual, só variando ícone/cor/dado.
 */
export default function HomeLocadorResumoCard({
  icone,
  fundoIcone,
  label,
  valor,
  legenda,
  tendencia,
  extra,
}: HomeLocadorResumoCardProps) {
  return (
    <View style={styles.card}>
      <View style={[styles.iconeWrapper, { backgroundColor: fundoIcone }]}>
        {icone}
      </View>

      <View style={styles.conteudo}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.valor}>{valor}</Text>

        {tendencia ? (
          <Text style={styles.tendencia}>{tendencia}</Text>
        ) : legenda ? (
          <Text style={styles.legenda}>{legenda}</Text>
        ) : null}

        {extra}
      </View>
    </View>
  );
}
