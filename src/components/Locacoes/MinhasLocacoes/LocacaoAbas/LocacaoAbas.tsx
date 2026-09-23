import React from 'react';

import {
  ScrollView,
  Pressable,
  Text,
  View,
} from 'react-native';

import type {
  FiltroLocacao,
} from '../../../../pages/Locacoes/MinhasLocacoes/MinhasLocacoes.types';

import {
  STATUS_CONFIG,
} from '../EtiquetaStatus/statusConfig';

import { styles } from './styles';

interface LocacaoTabsProps {
  filtro: FiltroLocacao;
  onChange: (
    filtro: FiltroLocacao
  ) => void;

  contagem: Record<
    FiltroLocacao,
    number
  >;
}

const ABAS: {
  key: FiltroLocacao;
  label: string;
}[] = [
  {
    key: 'todas',
    label: 'Todas',
  },

  {
    key: 'pendente',
    label:
      STATUS_CONFIG.pendente
        .tabLabel,
  },

  {
    key: 'aguardandoPagamento',
    label:
      STATUS_CONFIG
        .aguardandoPagamento
        .tabLabel,
  },

  {
    key: 'preparandoEntrega',
    label:
      STATUS_CONFIG
        .preparandoEntrega
        .tabLabel,
  },

  {
    key: 'emTransporte',
    label:
      STATUS_CONFIG
        .emTransporte
        .tabLabel,
  },

  {
    key: 'emAndamento',
    label:
      STATUS_CONFIG
        .emAndamento
        .tabLabel,
  },

  {
    key:
      'aguardandoDevolucao',
    label:
      STATUS_CONFIG
        .aguardandoDevolucao
        .tabLabel,
  },

  {
    key:
      'devolucaoEmTransporte',
    label:
      STATUS_CONFIG
        .devolucaoEmTransporte
        .tabLabel,
  },

  {
    key: 'finalizada',
    label:
      STATUS_CONFIG
        .finalizada.tabLabel,
  },

  {
    key: 'recusada',
    label:
      STATUS_CONFIG
        .recusada.tabLabel,
  },

  {
    key: 'cancelada',
    label:
      STATUS_CONFIG
        .cancelada.tabLabel,
  },
];

export default function LocacaoAbas({
  filtro,
  onChange,
  contagem,
}: LocacaoTabsProps) {
  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.scrollContent
        }
      >
        {ABAS.map((aba) => {
          const ativo =
            aba.key === filtro;

          return (
            <Pressable
              key={aba.key}
              onPress={() =>
                onChange(
                  aba.key
                )
              }
              style={[
                styles.tab,
                ativo &&
                  styles.tabAtiva,
              ]}
            >
              <Text
                style={[
                  styles.tabTexto,
                  ativo &&
                    styles.tabTextoAtivo,
                ]}
              >
                {aba.label}
              </Text>

              <View
                style={[
                  styles.contador,
                  ativo &&
                    styles.contadorAtivo,
                ]}
              >
                <Text
                  style={[
                    styles.contadorTexto,
                    ativo &&
                      styles.contadorTextoAtivo,
                  ]}
                >
                  {
                    contagem[
                      aba.key
                    ]
                  }
                </Text>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}