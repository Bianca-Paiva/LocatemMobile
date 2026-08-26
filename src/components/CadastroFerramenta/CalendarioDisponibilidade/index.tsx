import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isBefore,
  startOfDay,
  format,
  addMonths,
  subMonths
} from 'date-fns';
import { ptBR } from 'date-fns/locale';

import styles from './styles';
import colors from '../../../theme/colors';
import type { CalendarioDisponibilidadeProps, DiaCalendario } from './types';

const DIAS_SEMANA = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

function montarGrade(mesReferencia: Date): DiaCalendario[] {
  const hoje = startOfDay(new Date());
  const inicioMes = startOfMonth(mesReferencia);
  const fimMes = endOfMonth(inicioMes);

  // Garante que a grade comece no domingo e termine no sábado correto
  const dataInicial = startOfWeek(inicioMes, { weekStartsOn: 0 });
  const dataFinal = endOfWeek(fimMes, { weekStartsOn: 0 });

  // Pega todos os dias entre o primeiro domingo da grade e o último sábado
  const diasIntervalo = eachDayOfInterval({ start: dataInicial, end: dataFinal });

  return diasIntervalo.map(data => {
    const dataMeiaNoite = startOfDay(data);
    return {
      data: dataMeiaNoite,
      dataIso: format(dataMeiaNoite, 'yyyy-MM-dd'),
      numero: dataMeiaNoite.getDate(),
      mesAtual: isSameMonth(dataMeiaNoite, mesReferencia),
      passada: isBefore(dataMeiaNoite, hoje),
      hoje: dataMeiaNoite.getTime() === hoje.getTime(),
    };
  });
}

export default function CalendarioDisponibilidade({
  diasIndisponiveis,
  onToggleDia,
}: CalendarioDisponibilidadeProps) {
  const [mesReferencia, setMesReferencia] = useState(() => startOfMonth(new Date()));

  const dias = useMemo(() => montarGrade(mesReferencia), [mesReferencia]);
  const indisponiveisSet = useMemo(() => new Set(diasIndisponiveis), [diasIndisponiveis]);

  const irParaMesAnterior = () => setMesReferencia((atual) => subMonths(atual, 1));
  const irParaProximoMes = () => setMesReferencia((atual) => addMonths(atual, 1));

  // Gera o nome do mês automaticamente em português usando date-fns
  const nomeMes = format(mesReferencia, 'MMMM yyyy', { locale: ptBR });
  const mesLabel = nomeMes.charAt(0).toUpperCase() + nomeMes.slice(1);

  return (
    <View style={styles.wrapper}>
      <View style={styles.navegacao}>
        <TouchableOpacity onPress={irParaMesAnterior} style={styles.navBotao} accessibilityLabel="Mês anterior">
          <MaterialCommunityIcons name="chevron-left" size={20} color={colors.textDark} />
        </TouchableOpacity>

        <Text style={styles.mesLabel}>{mesLabel}</Text>

        <TouchableOpacity onPress={irParaProximoMes} style={styles.navBotao} accessibilityLabel="Próximo mês">
          <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textDark} />
        </TouchableOpacity>
      </View>

      <View style={styles.gradeCabecalho}>
        {DIAS_SEMANA.map((dia) => (
          <Text key={dia} style={styles.gradeCabecalhoTexto}>{dia}</Text>
        ))}
      </View>

      <View style={styles.grade}>
        {dias.map((dia) => {
          const indisponivel = indisponiveisSet.has(dia.dataIso);
          const clicavel = dia.mesAtual && !dia.passada;

          // CORREÇÃO DO TYPESCRIPT AQUI
          const estiloDia: StyleProp<ViewStyle>[] = [styles.dia];
          const estiloTexto: StyleProp<TextStyle>[] = [styles.diaTexto];

          if (!dia.mesAtual || dia.passada) {
            estiloTexto.push(styles.diaPassadaTexto);
          } else if (indisponivel) {
            estiloDia.push(styles.diaIndisponivel);
            estiloTexto.push(styles.diaIndisponivelTexto);
          } else {
            estiloDia.push(styles.diaDisponivel);
            estiloTexto.push(styles.diaDisponivelTexto);
          }

          return (
            <TouchableOpacity
              key={dia.dataIso}
              style={estiloDia}
              disabled={!clicavel}
              onPress={() => clicavel && onToggleDia(dia.dataIso)}
            >
              <Text style={estiloTexto}>{dia.numero}</Text>
              
              {/* LINHA DIAGONAL ADICIONADA AQUI */}
              {indisponivel && (
                <View style={styles.linhaDiagonal} pointerEvents="none" />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.legenda}>
        <View style={styles.legendaItem}>
          <View style={[styles.legendaCor, styles.legendaDisponivel]} />
          <Text style={styles.legendaTexto}>Disponível</Text>
        </View>
        <View style={styles.legendaItem}>
          <View style={[styles.legendaCor, styles.legendaIndisponivel]} />
          <Text style={styles.legendaTexto}>Indisponível</Text>
        </View>
        <View style={styles.legendaItem}>
          <View style={[styles.legendaCor, styles.legendaPassada]} />
          <Text style={styles.legendaTexto}>Data passada</Text>
        </View>
      </View>

      <Text style={styles.instrucao}>
        Toque em um dia para marcar como indisponível. Toque novamente para desmarcar.
      </Text>
    </View>
  );
}