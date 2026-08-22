import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { useEffect, useRef } from 'react';
import styles from './styles';
import type { AprovacaoLocacaoProps, OpcaoAprovacao } from './types';

const OPCOES_APROVACAO: OpcaoAprovacao[] = [
  {
    valor: 'manual',
    titulo: 'Aprovação manual',
    descricao: 'O locador analisa cada solicitação antes da confirmação.',
    recomendado: true,
  },
  {
    valor: 'automatica',
    titulo: 'Aprovação automática',
    descricao: 'As reservas são confirmadas automaticamente quando houver disponibilidade.',
  },
];

export default function AprovacaoLocacao({ tipoAprovacao, onChange, error, shake = false }: AprovacaoLocacaoProps) {
  const possuiErro = Boolean(error);
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!shake) return;
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: -4, duration: 55, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 4, duration: 55, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -4, duration: 55, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 4, duration: 55, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 55, useNativeDriver: true }),
    ]).start();
  }, [shake]);

  return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.grupo, { transform: [{ translateX: shakeAnim }] }]}>
        {OPCOES_APROVACAO.map((opcao) => {
          const selecionado = tipoAprovacao === opcao.valor;

          return (
            <TouchableOpacity
              key={opcao.valor}
              style={[styles.opcao, selecionado && styles.opcaoSelecionada, possuiErro && styles.opcaoErro]}
              onPress={() => onChange(opcao.valor)}
              activeOpacity={0.8}
            >
              <View style={styles.radioExterno}>
                {selecionado ? <View style={styles.radioInterno} /> : null}
              </View>

              <View style={styles.textos}>
                <View style={styles.linhaTitulo}>
                  <Text style={styles.titulo}>{opcao.titulo}</Text>
                  {opcao.recomendado ? (
                    <View style={styles.badge}>
                      <Text style={styles.badgeTexto}>Recomendado</Text>
                    </View>
                  ) : null}
                </View>
                <Text style={styles.descricao}>{opcao.descricao}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </Animated.View>

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}
