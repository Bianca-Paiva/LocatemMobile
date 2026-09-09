import React, { useState } from 'react';
import { LogOut } from 'lucide-react-native';
import {
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { Usuario } from '../../types/usuario.types';
import { useCompletudePerfil } from '../../hooks/Perfil/useCompletudePerfil';

import PerfilHeader from '../../components/Perfil/PerfilHeader';
import CompletarPerfil from '../../components/Perfil/CompletarPerfil';
import InformacoesPessoais from '../../components/Perfil/InformacoesPessoais';
import ReputacaoCard from '../../components/Perfil/ReputacaoCard';
import PainelControle from '../../components/Perfil/PainelControle';
import EditarPerfilModal from '../../components/Perfil/EditarPerfilModal';
import { useAuth } from '../../hooks/Auth/useAuth';
import { styles } from './styles';

const {
    usuario,
    logout,
    atualizarUsuario,
} = useAuth();

interface Props {
    onNavigate?: (
        route: 'minhasLocacoes' | 'notificacoes'
    ) => void;
    onAlterarFoto?: () => void;
}

export default function PerfilScreen({
    onNavigate,
    onAlterarFoto,
}: Props) {
    const [editando, setEditando] = useState(false);

    const {
        usuario,
        logout,
        atualizarUsuario,
    } = useAuth();

    const {
        percentual,
        mensagemDica,
    } = useCompletudePerfil(usuario);

    if (!usuario) {
        return (
            <SafeAreaView style={styles.safe}>
                <View style={styles.empty}>
                    <Text style={styles.emptyText}>
                        Você precisa entrar na sua conta para ver o perfil.
                    </Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.page}
            >
                <PerfilHeader
                    usuario={usuario}
                    onEditar={() => setEditando(true)}
                />

                <CompletarPerfil
                    percentual={percentual}
                    mensagemDica={mensagemDica}
                />

                <View style={styles.columns}>
                    <InformacoesPessoais
                        usuario={usuario}
                        onEditar={() => setEditando(true)}
                    />

                    <ReputacaoCard
                        reputacao={usuario.reputacao}
                        tipo={usuario.tipo}
                    />
                </View>

                <PainelControle
                    onNavigate={onNavigate}
                />

                <Pressable
                    style={styles.logout}
                   onPress={() =>
                            Alert.alert(
                                'Sair da conta',
                                'Deseja realmente sair?',
                                [
                                    {
                                        text: 'Cancelar',
                                        style: 'cancel',
                                    },
                                    {
                                        text: 'Sair',
                                        style: 'destructive',
                                        onPress: logout,
                                    },
                                ]
                            )
                        }
                      >
                    <LogOut
                        size={16}
                        color="#D33"
                    />

                    <Text style={styles.logoutText}>
                        Sair da Conta
                    </Text>
                </Pressable>
            </ScrollView>

            {editando && (
                <EditarPerfilModal
                    usuario={usuario}
                    onClose={() => setEditando(false)}
                    onSalvar={atualizarUsuario}
                    onAlterarFoto={onAlterarFoto}
                />
            )}
        </SafeAreaView>
    );
}

