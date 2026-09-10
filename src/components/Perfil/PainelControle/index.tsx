
import React from 'react';
import {
    Bell,
    ChevronRight,
    Clock,
    FileText,
    Headphones,
    Heart,
    MapPin,
    Settings,
    Wallet,
    Wrench,
} from 'lucide-react-native';
import {
    Pressable,
    Text,
    View,
} from 'react-native';

import type { TipoUsuario } from '../../../types/usuario.types';
import colors from '../../../theme/colors';
import { styles } from './styles';

type RotaPainel = 'minhasReservas' | 'notificacoes';

interface OpcaoPainel {
    icon: typeof Wrench;
    titulo: string;
    descricao: string;
    /** Ausente = opção ainda não tem tela própria no app (mesmo critério da Web). */
    rota?: RotaPainel;
}

// Espelha OPCOES_BASE de PainelControle.tsx da Web: mesmas 9 opções, mesmos
// textos. `tipo` fica disponível (como na Web) para o dia em que Locador
// precisar de uma opção exclusiva (ex: "Meus Anúncios"), mas hoje a lista é
// única para os dois tipos de usuário.
const OPCOES: OpcaoPainel[] = [
    { icon: Wrench, titulo: 'Aluguéis Ativos', descricao: 'Visualize seus equipamentos alugados atualmente.', rota: 'minhasReservas' },
    { icon: Clock, titulo: 'Histórico de Locações', descricao: 'Consulte todas as suas locações anteriores.' },
    { icon: Heart, titulo: 'Favoritos', descricao: 'Ferramentas e equipamentos salvos.' },
    { icon: Wallet, titulo: 'Pagamentos', descricao: 'Visualize pagamentos, cauções e reembolsos.' },
    { icon: FileText, titulo: 'Contratos', descricao: 'Acesse todos os contratos digitais.' },
    { icon: MapPin, titulo: 'Endereços', descricao: 'Gerencie seus endereços cadastrados.' },
    { icon: Bell, titulo: 'Notificações', descricao: 'Confira atualizações importantes.', rota: 'notificacoes' },
    { icon: Settings, titulo: 'Configurações', descricao: 'Altere senha, dados pessoais e preferências.' },
    { icon: Headphones, titulo: 'Suporte', descricao: 'Central de ajuda e atendimento.' },
];

export default function PainelControle({
    tipo,
    onNavigate,
}: {
    tipo: TipoUsuario;
    onNavigate?: (route: RotaPainel) => void;
}) {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>
                Painel de Controle
            </Text>

            <View style={styles.grid}>
                {OPCOES.map((opcao) => {
                    const Icon = opcao.icon;
                    const ativo = Boolean(opcao.rota);

                    return (
                        <Pressable
                            key={opcao.titulo}
                            disabled={!ativo}
                            // Antes a rota era decidida comparando o TEXTO do
                            // título ("Notificações" ? ... : 'minhasLocacoes'),
                            // o que fazia qualquer nova opção ativa cair sempre
                            // em 'minhasLocacoes' — uma rota que nem existe no
                            // Stack.Navigator (o nome real é 'MinhasReservas').
                            // Agora cada opção carrega sua própria rota, igual
                            // à Web (campo `route` de OpcaoPainel).
                            onPress={() => ativo && opcao.rota && onNavigate?.(opcao.rota)}
                            style={({ pressed }) => [
                                styles.option,
                                !ativo && styles.disabled,
                                pressed && ativo && styles.pressed,
                            ]}
                        >
                            <View style={styles.icon}>
                                <Icon size={20} color={colors.amber} />
                            </View>

                            <View style={styles.texts}>
                                <Text style={styles.optionTitle}>
                                    {opcao.titulo}
                                </Text>

                                <Text numberOfLines={2} style={styles.description}>
                                    {opcao.descricao}
                                </Text>
                            </View>

                            {ativo && (
                                <ChevronRight size={18} color="#777" />
                            )}
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
}
