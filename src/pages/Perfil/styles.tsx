import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export const styles = StyleSheet.create({
    safe: {
        flex: 1,
    },

    page: {
        
        backgroundColor: colors.bgApp,
    },
    containerCont: {
   
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 48,
  },

    columns: {
        gap: 16,
    },

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

    logoutText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#D33',
    },

    empty: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
        gap: 14,
    },

    emptyText: {
        textAlign: 'center',
        fontSize: 15,
        color: colors.textMuted,
    },

    btnLogin: {
        height: 42,
        paddingHorizontal: 20,
        borderRadius: 24,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },

    btnLoginText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0A0A0A',
    },
});
