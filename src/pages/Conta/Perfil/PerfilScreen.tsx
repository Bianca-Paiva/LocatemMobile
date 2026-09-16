import React, { useState } from 'react';
import { LogOut } from 'lucide-react-native';
import {
    Alert,
    Pressable,
    ScrollView,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../../hooks/Auth/useAuth';
import { useCompletudePerfil } from '../../../hooks/Conta/Perfil/useCompletudePerfil';

import PerfilHeader from '../../../components/Conta/Perfil/PerfilHeader';
import CompletarPerfil from '../../../components/Conta/Perfil/CompletarPerfil';
import InformacoesPessoais from '../../../components/Conta/Perfil/InformacoesPessoais';
import ReputacaoCard from '../../../components/Conta/Perfil/ReputacaoCard';
import PainelControle from '../../../components/Conta/Perfil/PainelControle';
import EditarPerfilModal from '../../../components/Conta/Perfil/EditarPerfilModal';
import { styles } from './styles';
import Header from '../../../components/Layout/Header';
import type { ScreenName } from '../../../components/Layout/Header/types';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Props {
    onNavigate?: (
        route: 'minhasReservas' | 'notificacoes' | 'LoginScreen' 
    ) => void;
    /** Chamado quando o usuário sem sessão toca em "Entrar na conta" (espelha o botão equivalente da Web). */
    onEntrar?: () => void;
    /** Chamado após confirmar "Sair da conta" — na Web, `navigate('home')` logo após `logout()`. */
    onLogout?: () => void;
    onAlterarFoto?: () => void;
}

export default function PerfilScreen({
    onNavigate,
    onEntrar,
    onLogout,
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
    
    // Sem sessão: redireciona para a tela de login (ou chama `onEntrar` se fornecido).
    if (!usuario) {
        return ( onNavigate ? (
            <View>
                <Text >
                    Você não está logado.
                </Text>
                <Pressable style={styles.btnLogin} onPress={onEntrar}>
                    <Text style={styles.btnLoginText}>
                        Entrar na conta
                    </Text>
                </Pressable>
            </View>
        ) : null );
    }

    const handleLogout = () => {
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
                    onPress: () => {
                        logout();
                        onLogout?.();
                    },
                },
            ]
        );
    };

    return (
       <>
      
        <SafeAreaView style={styles.safe} edges={['bottom', 'left', 'right']}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.page}
            >
             <Header/>
            <View style={styles.containerCont}>
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
                    tipo={usuario.tipo}
                    onNavigate={onNavigate}
                />

                <Pressable
                    style={styles.logout}
                    onPress={handleLogout}
                >
                    <LogOut
                        size={16}
                        color="#D33"
                    />

                    <Text style={styles.logoutText}>
                        Sair da Conta
                    </Text>
                </Pressable>
              </View>
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
     </> 
    );
}
