/**
 * Componente de conta: apresenta perfil, notificacoes, reputacao ou dados pessoais do usuario.
 */

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

import type { TipoUsuario } from '../../../../types/Auth/usuario.types';
import colors from '../../../../theme/colors';
import { styles } from './styles';

type RotaPainel = 'minhasLocacoes' | 'notificacoes' | 'favoritos' | 'minhasFerramentas' | 'historicoLocacoes';

interface OpcaoPainel {
    icon: typeof Wrench;
    titulo: string;
    descricao: string;
    rota?: RotaPainel;
    // NOVA PROPRIEDADE: Array com os tipos que podem acessar essa opção. 
    // Se não for definida (undefined), todos podem acessar.
    tiposPermitidos?: TipoUsuario[]; 
}

const OPCOES: OpcaoPainel[] = [
    { 
        icon: Wrench, 
        titulo: 'Aluguéis Ativos', 
        descricao: 'Visualize seus equipamentos alugados atualmente.', 
        rota: 'minhasFerramentas',
        tiposPermitidos: ['locador'] 
    },
    { icon: Clock, titulo: 'Histórico de Locações', descricao: 'Consulte todas as suas locações anteriores.', rota: 'historicoLocacoes', tiposPermitidos: ['locador']  },
    { 
        icon: Heart, 
        titulo: 'Favoritos', 
        descricao: 'Ferramentas e equipamentos salvos.', 
        rota: 'favoritos',
        tiposPermitidos: ['locatario'] 
    },
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

    // LÓGICA DE FILTRAGEM:
    const opcoesPermitidas = OPCOES.filter((opcao) => {
        // Se a opção não tem restrição de tipos, permite para todos
        if (!opcao.tiposPermitidos) {
            return true;
        }
        // Se tiver restrição, verifica se o tipo atual está na lista
        return opcao.tiposPermitidos.includes(tipo);
    });

    return (
        <View style={styles.card}>
            <Text style={styles.title}>
                Painel de Controle
            </Text>

            <View style={styles.grid}>
                {/* AQUI: Use 'opcoesPermitidas' em vez de 'OPCOES' */}
                {opcoesPermitidas.map((opcao) => {
                    const Icon = opcao.icon;
                    const ativo = Boolean(opcao.rota);

                    return (
                        <Pressable
                            key={opcao.titulo}
                            disabled={!ativo}
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
