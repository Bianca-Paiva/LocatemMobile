
import React from 'react';
import { Star } from 'lucide-react-native';
import {
    Pressable,
    Text,
    View,
} from 'react-native';

import type {
    ReputacaoUsuario,
    TipoUsuario,
} from '../../../types/usuario.types';

import { styles } from './styles';

export default function ReputacaoCard({
    reputacao,
    tipo,
}: {
    reputacao: ReputacaoUsuario;
    tipo: TipoUsuario;
}) {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>
                Reputação
            </Text>

            <Text style={styles.rating}>
                {reputacao.rating.toFixed(1)}
            </Text>

            <View style={styles.stars}>
                {Array.from(
                    { length: 5 },
                    (_, i) => (
                        <Star
                            key={i}
                            size={19}
                            fill={
                                i <
                                Math.round(
                                    reputacao.rating
                                )
                                    ? '#F9C01A'
                                    : 'transparent'
                            }
                            color="#F9C01A"
                        />
                    )
                )}
            </View>

            <View style={styles.metrics}>
                <Text style={styles.based}>
                    Baseado em
                </Text>

                <Text style={styles.metric}>
                    {reputacao.totalAvaliacoes} avaliações
                </Text>

                <Text style={styles.metric}>
                    {reputacao.locacoesConcluidas}{' '}
                    {tipo === 'locador'
                        ? 'locações concluídas'
                        : 'locações'}
                </Text>

                {tipo === 'locador' &&
                    reputacao.entregasNoPrazoPercentual !==
                        undefined && (
                        <Text style={styles.metric}>
                            {
                                reputacao.entregasNoPrazoPercentual
                            }
                            % entregas no prazo
                        </Text>
                    )}
            </View>

            <Pressable>
                <Text style={styles.link}>
                    Ver avaliações
                </Text>
            </Pressable>
        </View>
    );
}

