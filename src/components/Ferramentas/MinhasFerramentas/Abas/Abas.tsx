import React from 'react';

import {
  ScrollView,
  Pressable,
  Text,
  View,
} from 'react-native';

import type { AbasProps } from '../HistoricosLocacoes/types';

import { styles } from './styles';

/**
 * Barra de abas de filtro com contador (ex: "Todas (18)", "Finalizadas (9)").
 *
 * Mesmo padrão visual de components/Reservas/MinhasReservas/ReservaAbas,
 * generalizado para qualquer conjunto de chaves — usado em Minhas Ferramentas,
 * Gerenciar Locações e Histórico de Locações.
 *
 * Equivalente Web: components/Ferramentas/MinhasFerramentas/Abas/Abas.tsx
 */
export default function Abas<T extends string>({
  abas,
  ativo,
  onChange,
  contagem,
}: AbasProps<T>) {
  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {abas.map((aba) => {
          const ativa = aba.key === ativo;

          return (
            <Pressable
              key={aba.key}
              onPress={() => onChange(aba.key)}
              accessibilityRole="button"
              accessibilityState={{ selected: ativa }}
              style={[
                styles.tab,
                ativa && styles.tabAtiva,
              ]}
            >
              <Text
                style={[
                  styles.tabTexto,
                  ativa && styles.tabTextoAtivo,
                ]}
              >
                {aba.label}
              </Text>

              <View
                style={[
                  styles.contador,
                  ativa && styles.contadorAtivo,
                ]}
              >
                <Text
                  style={[
                    styles.contadorTexto,
                    ativa && styles.contadorTextoAtivo,
                  ]}
                >
                  {contagem[aba.key]}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}
