import React, { useEffect, useRef, useState } from 'react';
import { Animated, Text, View } from 'react-native';
import { styles } from './styles';

interface CompletarPerfilProps {
    percentual: number;
    mensagemDica: string;
}

/** Tempo (ms) que o card fica visível após atingir 100%, antes de começar a sumir. */
const TEMPO_ATE_SUMIR = 3000;
/** Duração (ms) da animação de saída — espelha DURACAO_ANIMACAO_SAIDA da Web. */
const DURACAO_ANIMACAO_SAIDA = 300;

/**
 * Card "Complete seu Perfil". Espelha CompletarPerfil.tsx da Web: quando o
 * perfil chega a 100%, o card some sozinho após alguns segundos (fade),
 * e volta a aparecer se o percentual cair de novo abaixo de 100.
 */
export default function CompletarPerfil({
    percentual,
    mensagemDica,
}: CompletarPerfilProps) {
    const [oculto, setOculto] = useState(false);
    const opacity = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (percentual < 100) {
            setOculto(false);
            opacity.setValue(1);
            return;
        }

        const timerSaida = setTimeout(() => {
            Animated.timing(opacity, {
                toValue: 0,
                duration: DURACAO_ANIMACAO_SAIDA,
                useNativeDriver: true,
            }).start(() => setOculto(true));
        }, TEMPO_ATE_SUMIR);

        return () => clearTimeout(timerSaida);
    }, [percentual, opacity]);

    if (oculto) {
        return null;
    }

    return (
        <Animated.View style={{ opacity }}>
            <View style={styles.card}>
                <View style={styles.titleRow}>
                    <Text style={styles.title}>
                        Complete seu Perfil
                    </Text>

                    <Text style={styles.percent}>
                        {percentual}% concluído
                    </Text>
                </View>

                <View
                    style={styles.track}
                    accessibilityRole="progressbar"
                    accessibilityValue={{ min: 0, max: 100, now: percentual }}
                >
                    <View
                        style={[
                            styles.fill,
                            {
                                width: `${Math.min(percentual, 100)}%`,
                            },
                        ]}
                    />
                </View>

                <Text style={styles.tip}>
                    {mensagemDica}
                </Text>
            </View>
        </Animated.View>
    );
}
