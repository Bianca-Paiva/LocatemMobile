import React from 'react';

import {
  View,
  Text,
  Image,
} from 'react-native';

import {
  Calendar,
  User,
  MapPin,
} from 'lucide-react-native';

import type {
  ReservaData,
} from '../../../pages/Reservas/MinhasReservas/MinhasReservas.types';

import { formatarIntervaloHorario } from '../../../utils/horario';

import { styles } from './styles';

// Ícone de avaliação
const starIcon = require( '../../../../assets/images/StarFullYellow.png');

interface ReservaResumoCardProps {
  reserva: ReservaData;
}

export default function ReservaResumoCard({
  reserva,
}: ReservaResumoCardProps) {

  const {
    produto,
    imagem,
    categoria,
    locador,
    avaliacaoLocador,
    numeroAvaliacoes,
    localizacao,
    dataInicio,
    horaInicio,
    dataFim,
    horaFim,
    quantidade,
    valor,
  } = reserva;

  return (
    <View style={styles.card}>

      {/* Cabeçalho do produto */}
      <View style={styles.cabecalhoProduto}>

        {/* Imagem do produto */}
        <View style={styles.miniatura}>
          <Image
            source={
              typeof imagem === 'string'
                ? { uri: imagem }
                : imagem
            }
            style={styles.imagem}
            resizeMode="contain"
          />
        </View>

        {/* Área de informações */}
        <View style={styles.infoProduto}>

          {/* Nome do produto */}
          <Text
            style={styles.titulo}
            numberOfLines={2}
          >
            {produto}
          </Text>

          {/* Categoria */}
          <Text style={styles.categoria}>
            {categoria}
          </Text>

          {/* Locador */}
          <View style={styles.linha}>
            <User
              size={14}
              color="#666"
            />

            <Text style={styles.locador}>
              Locador: {locador}
            </Text>
          </View>

          {/* Avaliação + localização */}
          <View style={styles.linhaAvaliacao}>

            <Image
              source={starIcon}
              style={styles.star}
              resizeMode="contain"
            />

            <Text style={styles.avaliacao}>
              {avaliacaoLocador
                .toFixed(1)
                .replace('.', ',')}
            </Text>

            <Text style={styles.numeroAvaliacoes}>
              ({numeroAvaliacoes} avaliações)
            </Text>

            <Text style={styles.separador}>
              •
            </Text>

            <MapPin
              size={14}
              color="#666"
            />

            <Text style={styles.localizacao}>
              {localizacao}
            </Text>

          </View>

        </View>

      </View>

      {/* Período solicitado */}
      <View style={styles.periodoBloco}>

        <Text style={styles.periodoRotulo}>
          Período solicitado
        </Text>

        <View style={styles.periodoCaixa}>

          <Calendar
            size={18}
            color="#666"
          />

          <View style={styles.periodoTexto}>

            <Text>
              <Text style={styles.negrito}>
                {dataInicio}
              </Text>
              {' '}das{' '}
              {formatarIntervaloHorario(
                horaInicio
              )}
            </Text>

            <Text style={styles.ate}>
              até
            </Text>

            <Text>
              <Text style={styles.negrito}>
                {dataFim}
              </Text>
              {' '}das{' '}
              {formatarIntervaloHorario(
                horaFim
              )}
            </Text>

          </View>

        </View>

      </View>

      {/* Rodapé */}
      <View style={styles.rodape}>

        {/* Quantidade */}
        <View>

          <Text style={styles.rodapeRotulo}>
            Quantidade
          </Text>

          <Text style={styles.rodapeValor}>
            {quantidade}{' '}
            {quantidade === 1
              ? 'unidade'
              : 'unidades'}
          </Text>

        </View>

        {/* Valor estimado */}
        <View style={styles.rodapeDireita}>

          <Text style={styles.rodapeRotulo}>
            Valor estimado
          </Text>

          <Text style={styles.valorDestaque}>
            {valor}
          </Text>

        </View>

      </View>

    </View>
  );
}