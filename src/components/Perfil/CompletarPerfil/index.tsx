import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';

interface CompletarPerfilProps {
    percentual: number;
    mensagemDica: string;
}

export default function CompletarPerfil({
    percentual,
    mensagemDica,
}: CompletarPerfilProps) {
    const [oculto, setOculto] = useState(false);

    useEffect(() => {
        if (percentual < 100) {
            setOculto(false);
            return;
        }

        const timer = setTimeout(() => {
            setOculto(true);
        }, 3300);

        return () => clearTimeout(timer);
    }, [percentual]);

    if (oculto) {
        return null;
    }

    return (
        <View style={styles.card}>
            <View style={styles.titleRow}>
                <Text style={styles.title}>
                    Complete seu Perfil
                </Text>

                <Text style={styles.percent}>
                    {percentual}% concluído
                </Text>
            </View>

            <View style={styles.track}>
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
    );
}

