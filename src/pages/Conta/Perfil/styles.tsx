import { StyleSheet } from 'react-native';
import colors from '../../../theme/colors';

export const styles = StyleSheet.create({
    // Área segura que ocupa toda a altura disponível da tela.
    safe: {
        flex: 1,
    },

    // Contêiner rolável que define o fundo da página.
    page: {
        
        backgroundColor: colors.bgApp,
    },
    // Espaçamento externo aplicado ao conteúdo principal do perfil.
    containerCont: {
   
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 48,

    gap: 10,
  },

    // Agrupa os cards de informações pessoais e reputação.
    columns: {
        gap: 16,
    },

    // Botão secundário, alinhado à direita, para saída da conta.
    logout: {
        alignSelf: 'flex-end',
        minHeight: 42,
        paddingHorizontal: 18,
        borderRadius: 24,
        borderWidth: 1.5,
        borderColor: '#F3C2C2',
        backgroundColor: colors.bgCard,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },

    // Texto de destaque do botão de logout.
    logoutText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#D33',
    },

    // Estado vazio reutilizável para ausência de conteúdo.
    empty: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
        gap: 14,
    },

    // Mensagem apresentada dentro do estado vazio.
    emptyText: {
        textAlign: 'center',
        fontSize: 15,
        color: colors.textMuted,
    },

    // Ação principal para usuários que ainda não iniciaram sessão.
    btnLogin: {
        height: 42,
        paddingHorizontal: 20,
        borderRadius: 24,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },

    // Rótulo do botão de entrada na conta.
    btnLoginText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0A0A0A',
    },
});
