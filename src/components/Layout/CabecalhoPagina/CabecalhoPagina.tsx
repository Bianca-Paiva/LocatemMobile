import type { ReactNode } from 'react';
import { View, Text } from 'react-native';
import type { ViewStyle, StyleProp } from 'react-native';

import { styles } from './styles';

interface CabecalhoPaginaProps {
    /** Título principal da página (ex: "Minhas Reservas") */
    titulo: string;
    /** Texto de apoio abaixo do título (opcional) */
    subtitulo?: string;
    /** Conteúdo extra exibido à direita do título, na mesma linha (ex: uma EtiquetaStatus) */
    acao?: ReactNode;
    /** Estilo extra para ajustes pontuais (ex: margem diferente em uma página específica) */
    style?: StyleProp<ViewStyle>;
}

// Cabeçalho padrão usado no topo das páginas internas (título + subtítulo opcional).
export default function CabecalhoPagina({ titulo, subtitulo, acao, style }: CabecalhoPaginaProps) {
    return (
        <View style={[styles.cabecalho, style]}>
            <View style={styles.linhaTitulo}>
                <Text style={styles.titulo}>{titulo}</Text>
                {acao}
            </View>

            {subtitulo ? <Text style={styles.subtitulo}>{subtitulo}</Text> : null}
        </View>
    );
}
