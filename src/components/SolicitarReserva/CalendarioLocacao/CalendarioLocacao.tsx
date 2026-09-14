// Grade de calendário usada pelo CampoData (tela "Detalhes da Locação").
// Adaptação do CalendarioLocacao da Web, mantendo a mesma lógica de:
// montagem da grade, intervalo selecionado e datas indisponíveis.

import { useMemo } from 'react';

import { Pressable, Text, View } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../../../theme/colors';

import { formatarIso, getHojeIso } from '../../../utils/dataLocacao';

import { styles } from './styles';

// Nomes dos meses usados no cabeçalho do calendário.
const NOMES_MES = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

// Letras dos dias da semana, começando pelo domingo.
const DIAS_SEMANA = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

interface CelulaDia {
  iso: string;
  dia: number;
  foraDoMes: boolean;
}

/**
 * Monta a grade de 6 semanas (42 células) do mês de referência.
 * Inclui também os dias dos meses anterior e seguinte para preencher a grade.
 */
function montarGradeMes(mesReferencia: Date): CelulaDia[] {
  const ano = mesReferencia.getFullYear();
  const mes = mesReferencia.getMonth();

  // Descobre em qual dia da semana o mês começa.
  const primeiroDiaMes = new Date(ano, mes, 1);
  const offsetInicial = primeiroDiaMes.getDay();

  // Volta até o domingo anterior para definir o início da grade.
  const inicioGrade = new Date(ano, mes, 1 - offsetInicial);

  // Sempre cria 42 células, mantendo 6 semanas no calendário.
  return Array.from({ length: 42 }, (_, i) => {
    const data = new Date(inicioGrade);

    // Avança um dia para cada posição da grade.
    data.setDate(inicioGrade.getDate() + i);

    return {
      iso: formatarIso(data),
      dia: data.getDate(),

      // Identifica os dias que pertencem a outro mês.
      foraDoMes: data.getMonth() !== mes,
    };
  });
}

interface CalendarioLocacaoProps {
  /** Primeiro dia do mês atualmente exibido */
  mesReferencia: Date;

  onMudarMes: (novoMes: Date) => void;

  /** Datas de entrega e devolução escolhidas */
  dataEntrega: string;
  dataDevolucao: string;

  /** Datas anteriores a esta são consideradas passado */
  dataMinima: string;

  /** Datas que já estão locadas ou indisponíveis */
  diasIndisponiveis: Set<string>;

  onSelecionar: (dataIso: string) => void;
}

export default function CalendarioLocacao({
  mesReferencia,
  onMudarMes,
  dataEntrega,
  dataDevolucao,
  dataMinima,
  diasIndisponiveis,
  onSelecionar,
}: CalendarioLocacaoProps) {
  // Calcula a data de hoje apenas uma vez durante a vida do componente.
  const hojeIso = useMemo(() => getHojeIso(), []);

  // Só recria a grade quando o mês exibido mudar.
  const dias = useMemo(
    () => montarGradeMes(mesReferencia),
    [mesReferencia],
  );

  // Usa apenas ano e mês para impedir a navegação antes da data mínima.
  const mesMinimo = dataMinima.slice(0, 7);

  const mesAtualStr = `${mesReferencia.getFullYear()}-${String(
    mesReferencia.getMonth() + 1,
  ).padStart(2, '0')}`;

  const prevDesabilitado = mesAtualStr <= mesMinimo;

  // Volta um mês, desde que ele não seja anterior ao permitido.
  const irParaMesAnterior = () => {
    if (prevDesabilitado) return;

    onMudarMes(
      new Date(
        mesReferencia.getFullYear(),
        mesReferencia.getMonth() - 1,
        1,
      ),
    );
  };

  // Avança para o próximo mês.
  const irParaProximoMes = () => {
    onMudarMes(
      new Date(
        mesReferencia.getFullYear(),
        mesReferencia.getMonth() + 1,
        1,
      ),
    );
  };

  return (
    <View style={styles.calendario}>
      {/* Cabeçalho com navegação e mês atualmente exibido. */}
      <View style={styles.cabecalho}>
        <Pressable
          style={styles.navBotao}
          onPress={irParaMesAnterior}
          disabled={prevDesabilitado}
          accessibilityLabel="Mês anterior"
        >
          <MaterialCommunityIcons
            name="chevron-left"
            size={20}
            color={
              prevDesabilitado
                ? colors.textMuted2
                : colors.textDark
            }
          />
        </Pressable>

        <Text style={styles.mesLabel}>
          {NOMES_MES[mesReferencia.getMonth()]}{' '}
          {mesReferencia.getFullYear()}
        </Text>

        <Pressable
          style={styles.navBotao}
          onPress={irParaProximoMes}
          accessibilityLabel="Próximo mês"
        >
          <MaterialCommunityIcons
            name="chevron-right"
            size={20}
            color={colors.textDark}
          />
        </Pressable>
      </View>

      {/* Exibe os dias da semana no topo da grade. */}
      <View style={styles.semana}>
        {DIAS_SEMANA.map((letra, i) => (
          <Text key={i} style={styles.semanaLabel}>
            {letra}
          </Text>
        ))}
      </View>

      {/* Grade com os 42 dias do calendário. */}
      <View style={styles.grade}>
        {dias.map(({ iso, dia, foraDoMes }) => {
          // Dias de outro mês ficam vazios para preservar o alinhamento.
          if (foraDoMes) {
            return <View key={iso} style={styles.diaCelula} />;
          }

          // Verifica se a data já passou da data mínima permitida.
          const passado = iso < dataMinima;

          // Verifica se a data está entre as datas indisponíveis.
          const indisponivel = diasIndisponiveis.has(iso);

          // Datas passadas ou indisponíveis não podem ser selecionadas.
          const desabilitado = passado || indisponivel;

          // Identifica as datas de entrega e devolução.
          const isEntrega = iso === dataEntrega;
          const isDevolucao = iso === dataDevolucao;

          // Identifica os dias entre entrega e devolução.
          const noIntervalo = Boolean(
            dataEntrega &&
              dataDevolucao &&
              iso > dataEntrega &&
              iso < dataDevolucao,
          );

          // Identifica o dia atual.
          const isHoje = iso === hojeIso;

          // Uma data está selecionada quando é entrega ou devolução.
          const isSelecionado = isEntrega || isDevolucao;

          return (
            <View key={iso} style={styles.diaCelula}>
              <Pressable
                style={[
                  styles.dia,

                  // Destaca os dias que estão dentro do intervalo.
                  noIntervalo && styles.diaNoIntervalo,

                  // Destaca uma data selecionada.
                  isSelecionado && styles.diaSelecionado,

                  // Aplica o estilo específico ao início do intervalo.
                  isEntrega &&
                    dataDevolucao &&
                    styles.diaSelecionadoInicio,

                  // Aplica o estilo específico ao final do intervalo.
                  isDevolucao &&
                    dataEntrega &&
                    styles.diaSelecionadoFim,
                ]}
                onPress={() => onSelecionar(iso)}
                disabled={desabilitado}
              >
                <Text
                  style={[
                    styles.diaTexto,

                    // Texto de datas que não podem ser selecionadas.
                    desabilitado && styles.diaTextoDesabilitado,

                    // Estilo específico para datas indisponíveis.
                    indisponivel && styles.diaTextoIndisponivel,

                    // Texto das datas selecionadas.
                    isSelecionado && styles.diaTextoSelecionado,
                  ]}
                >
                  {dia}
                </Text>

                {/* Marca o dia atual quando ele não está selecionado. */}
                {isHoje && !isSelecionado && (
                  <View style={styles.hojeMarcador} />
                )}
              </Pressable>
            </View>
          );
        })}
      </View>

      {/* Legenda dos estados disponíveis no calendário. */}
      <View style={styles.legenda}>
        <View style={styles.legendaItem}>
          <View
            style={[
              styles.legendaBolinha,
              styles.legendaDisponivel,
            ]}
          />
          <Text style={styles.legendaTexto}>
            Disponível
          </Text>
        </View>

        <View style={styles.legendaItem}>
          <View
            style={[
              styles.legendaBolinha,
              styles.legendaIndisponivel,
            ]}
          />
          <Text style={styles.legendaTexto}>
            Indisponível
          </Text>
        </View>
      </View>
    </View>
  );
}