import type { ReactNode } from 'react';
import { View, Text } from 'react-native';

interface CabecalhoPaginaProps {
    /** Título principal da página (ex: "Minhas Reservas") */
    titulo: string;

    /** Texto de apoio abaixo do título (opcional) */
    subtitulo?: string;

    /** Conteúdo extra exibido à direita do título, na mesma linha (ex: uma EtiquetaStatus) */
    acao?: ReactNode;

    /** Estilo extra para ajustes pontuais */
    style?: any;
}

// Cabeçalho padrão usado no topo das páginas internas (título + subtítulo opcional).
// Baseado no cabeçalho original da página "Minhas Reservas".
export default function CabecalhoPagina({
    titulo,
    subtitulo,
    acao,
    style,
}: CabecalhoPaginaProps) {
    return (
        <View style={style}>
            <View>
                <Text>{titulo}</Text>
                {acao}
            </View>

            {subtitulo && (
                <Text>
                    {subtitulo}
                </Text>
            )}
        </View>
    );
}