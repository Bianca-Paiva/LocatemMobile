import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },

    page: {
        padding: 16,
        paddingBottom: 40,
        gap: 16,
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
        backgroundColor: '#FFF',
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
    },

    emptyText: {
        textAlign: 'center',
        fontSize: 15,
        color: '#777',
    },
});
