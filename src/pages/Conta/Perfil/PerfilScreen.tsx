import React, { useState } from 'react';
import { LogOut } from 'lucide-react-native';
import {
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
import ConfirmModal from '../../../components/Shared/ConfirmModal/ConfirmModal';
import { styles } from './styles';
import Header from '../../../components/Layout/Header';
import type { ScreenName } from '../../../components/Layout/Header/types';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

/** Callbacks opcionais usados pela rota que hospeda a tela de perfil. */
interface Props {
    onNavigate?: (
        route: 'minhasLocacoes' | 'notificacoes' | 'favoritos' | 'LoginScreen'
    ) => void;
    /** Chamado quando o usuário sem sessão toca em "Entrar na conta" (espelha o botão equivalente da Web). */
    onEntrar?: () => void;
    /** Chamado após confirmar "Sair da conta" — na Web, `navigate('home')` logo após `logout()`. */
    onLogout?: () => void;
    /**
     * Override opcional do seletor de imagem do modal de edição. Deixando de
     * fora, o próprio modal abre câmera/galeria via `useFotoPerfil` — que é o
     * comportamento padrão e o que a rota em AppRoutes usa.
     */
    onAlterarFoto?: () => Promise<string | null | undefined> | string | null | undefined;
}

export default function PerfilScreen({
    onNavigate,
    onEntrar,
    onLogout,
    onAlterarFoto,
}: Props) {
    // Controla a exibição do modal de edição dos dados do usuário.
    const [editando, setEditando] = useState(false);
    // Controla a confirmação antes de encerrar a sessão atual.
    const [confirmandoSaida, setConfirmandoSaida] = useState(false);

    // Estado e ações globais da sessão autenticada.
    const {
        usuario,
        logout,
        atualizarUsuario,
    } = useAuth();

    // Calcula o progresso e a orientação para completar o perfil do usuário.
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

    // Abre a confirmação para evitar saídas acidentais.
    const handleLogout = () => {
        setConfirmandoSaida(true);
    };

    // Fecha o modal, encerra a sessão e informa a rota para redirecionar.
    const handleConfirmarLogout = () => {
        setConfirmandoSaida(false);
        logout();
        onLogout?.();
    };

    return (
       <>
      
        <SafeAreaView style={styles.safe} edges={['bottom', 'left', 'right']}>
            {/* Mantém todo o conteúdo rolável em telas menores. */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.page}
            >
             <Header/>
            <View style={styles.containerCont}>
                {/* Resumo visual do perfil e acesso à edição. */}
                <PerfilHeader
                    usuario={usuario}
                    onEditar={() => setEditando(true)}
                />

                {/* Indicador de dados pendentes no cadastro. */}
                <CompletarPerfil
                    percentual={percentual}
                    mensagemDica={mensagemDica}
                />

                {/* Informações da conta e reputação agrupadas na mesma seção. */}
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

                {/* Atalhos disponíveis de acordo com o tipo de usuário. */}
                <PainelControle
                    tipo={usuario.tipo}
                    onNavigate={onNavigate}
                />

                {/* Sair da Conta */}
                
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

            {/* O modal é montado apenas durante a edição. */}
            {editando && (
                <EditarPerfilModal
                    usuario={usuario}
                    onClose={() => setEditando(false)}
                    onSalvar={atualizarUsuario}
                    onAlterarFoto={onAlterarFoto}
                />
                
            )}

            {/* Solicita confirmação explícita antes de executar o logout. */}
            <ConfirmModal
                open={confirmandoSaida}
                title="Sair da conta"
                message="Deseja realmente sair?"
                confirmLabel="Sair"
                cancelLabel="Cancelar"
                onConfirm={handleConfirmarLogout}
                onCancel={() => setConfirmandoSaida(false)}
            />
        </SafeAreaView>
     </> 
    );
}
