import React from 'react';

import {
  View,
  Text,
  Image,
  Pressable,
} from 'react-native';

import type {
  ReservaData,
} from '../../../pages/Reservas/MinhasReservas/MinhasReservas.types';

import StatusBadge from '../EtiquetaStatus/EtiquetaStatus';

const calendarioIcon = require('../../../../assets/images/icons/iconCalendarioReservas.png');

const userIcon = require('../../../../assets/images/icons/user.png');

import { styles } from './styles';

interface ReservaCardProps {
  reserva: ReservaData;
  onVerDetalhes?: (
    id: string
  ) => void;
}

export default function ReservaCard({
  reserva,
  onVerDetalhes,
}: ReservaCardProps) {
  const {
    id,
    produto,
    imagem,
    periodo,
    locador,
    status,
    mensagemStatus,
  } = reserva;

  return (
    <Pressable
      style={styles.card}
      onPress={() =>
        onVerDetalhes?.(id)
      }
    >
      <View style={styles.miniatura}>
        <Image
          source={
            typeof imagem ===
            'string'
              ? {
                  uri: imagem,
                }
              : imagem
          }
          style={styles.imagem}
          resizeMode="cover"
        />
      </View>

      <View style={styles.conteudo}>
        <Text
          style={styles.titulo}
          numberOfLines={2}
        >
          {produto}
        </Text>

        <View
          style={
            styles.linhaInformacao
          }
        >
          <Image
            source={
              calendarioIcon
            }
            style={
              styles.iconeInfo
            }
          />

          <Text
            style={
              styles.textoInfo
            }
          >
            {periodo}
          </Text>
        </View>

        <View
          style={
            styles.linhaInformacao
          }
        >
          <Image
            source={userIcon}
            style={
              styles.iconeInfo
            }
          />

          <Text
            style={
              styles.textoInfo
            }
          >
            Locador: {locador}
          </Text>
        </View>

        <Text
          style={
            styles.statusMensagem
          }
        >
          {mensagemStatus}
        </Text>
      </View>

      <View style={styles.aside}>
        <StatusBadge
          status={status}
        />

        <Text
          style={styles.seta}
        >
          ›
        </Text>
      </View>
    </Pressable>
  );
}