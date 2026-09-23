import React from 'react';

import {
  View,
  Text,
  Image,
  Pressable,
} from 'react-native';

import type {
  LocacaoData,
} from '../../../../pages/Locacoes/MinhasLocacoes/MinhasLocacoes.types';

import StatusBadge from '../EtiquetaStatus/EtiquetaStatus';

const calendarioIcon = require('../../../../../assets/images/icons/iconCalendarioLocacoes.png');

const userIcon = require('../../../../../assets/images/icons/user.png');

import { styles } from './styles';

interface LocacaoCardProps {
  locacao: LocacaoData;
  onVerDetalhes?: (
    id: string
  ) => void;
}

export default function LocacaoCard({
  locacao,
  onVerDetalhes,
}: LocacaoCardProps) {
  const {
    id,
    produto,
    imagem,
    periodo,
    locador,
    status,
    mensagemStatus,
  } = locacao;

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
    <View style={styles.corpo}>
    
        <View style={styles.conteudo}>
              <Text
                style={styles.titulo}
                numberOfLines={2}
              >
                {produto}
              </Text>

              <View style={ styles.linhaInformacao}>
                  <Image
                    source={calendarioIcon}
                    style={ styles.iconeInfo}
                  />

                  <Text
                    style={ styles.textoInfo}>
                    {periodo}
                  </Text>
              </View>

                <View  style={styles.linhaInformacao}>
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

          <Text style={styles.seta}>
            ›
          </Text>
        </View>
      </View>
    </Pressable>
  );
}