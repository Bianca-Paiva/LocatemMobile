
import React from 'react';
import {
    Bell,
    ChevronRight,
    Clock3,
    FileText,
    Headphones,
    Heart,
    MapPin,
    Settings,
    WalletCards,
    Wrench,
} from 'lucide-react-native';
import {
    Pressable,
    Text,
    View,
} from 'react-native';

import { styles } from './styles';

const OPCOES = [
    [
        Wrench,
        'Aluguéis Ativos',
        'Visualize seus equipamentos alugados atualmente.',
        true,
    ],
    [
        Clock3,
        'Histórico de Locações',
        'Consulte todas as suas locações anteriores.',
        false,
    ],
    [
        Heart,
        'Favoritos',
        'Ferramentas e equipamentos salvos.',
        false,
    ],
    [
        WalletCards,
        'Pagamentos',
        'Visualize pagamentos, cauções e reembolsos.',
        false,
    ],
    [
        FileText,
        'Contratos',
        'Acesse todos os contratos digitais.',
        false,
    ],
    [
        MapPin,
        'Endereços',
        'Gerencie seus endereços cadastrados.',
        false,
    ],
    [
        Bell,
        'Notificações',
        'Confira atualizações importantes.',
        true,
    ],
    [
        Settings,
        'Configurações',
        'Altere senha, dados pessoais e preferências.',
        false,
    ],
    [
        Headphones,
        'Suporte',
        'Central de ajuda e atendimento.',
        false,
    ],
] as const;

export default function PainelControle({
    onNavigate,
}: {
    onNavigate?: (
        route: 'minhasLocacoes' | 'notificacoes'
    ) => void;
}) {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>
                Painel de Controle
            </Text>

            <View style={styles.grid}>
                {OPCOES.map(
                    ([
                        Icon,
                        titulo,
                        descricao,
                        active,
                    ]) => (
                        <Pressable
                            key={titulo}
                            disabled={!active}
                            onPress={() =>
                                active &&
                                onNavigate?.(
                                    titulo === 'Notificações'
                                        ? 'notificacoes'
                                        : 'minhasLocacoes'
                                )
                            }
                            style={({ pressed }) => [
                                styles.option,
                                !active && styles.disabled,
                                pressed &&
                                    active &&
                                    styles.pressed,
                            ]}
                        >
                            <View style={styles.icon}>
                                <Icon size={20} />
                            </View>

                            <View style={styles.texts}>
                                <Text
                                    style={
                                        styles.optionTitle
                                    }
                                >
                                    {titulo}
                                </Text>

                                <Text
                                    numberOfLines={2}
                                    style={styles.description}
                                >
                                    {descricao}
                                </Text>
                            </View>

                            {active && (
                                <ChevronRight
                                    size={18}
                                    color="#777"
                                />
                            )}
                        </Pressable>
                    )
                )}
            </View>
        </View>
    );
}

