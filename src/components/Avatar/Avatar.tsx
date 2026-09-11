
import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { getIniciais } from '../../utils/Avatar/iniciais';
import { styles } from './styles';  

interface AvatarProps {
    nome: string;
    fotoUrl?: string;
    /** Diâmetro do avatar em px. Default 40 (tamanho usado no Header). */
    size?: number;
}

export default function Avatar({
    nome,
    fotoUrl,
    size = 40,
}: AvatarProps) {
    const iniciais = getIniciais(nome);

    return (
        <View
            style={[
                styles.avatar,
                {
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                },
            ]}
        >
            {fotoUrl ? (
                <Image
                    source={{ uri: fotoUrl }}
                    accessibilityLabel={nome}
                    style={[
                        styles.avatarImg,
                        {
                            width: size,
                            height: size,
                            borderRadius: size / 2,
                        },
                    ]}
                />
            ) : (
                <Text
                    style={[
                        styles.avatarInitials,
                        {
                            fontSize: Math.max(
                                11,
                                size * 0.36
                            ),
                        },
                    ]}
                >
                    {iniciais}
                </Text>
            )}
        </View>
    );
}


