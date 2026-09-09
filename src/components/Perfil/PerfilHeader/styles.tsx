import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFF',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#F3F4F6',
        padding: 20,
        gap: 16,
    },

    info: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },

    texts: {
        flex: 1,
        gap: 8,
    },

    name: {
        fontSize: 24,
        fontWeight: '800',
        color: '#1A1A1A',
    },

    badge: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 30,
        backgroundColor: '#FFF4B8',
    },

    badgeText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#8A6D00',
    },

    edit: {
        height: 40,
        borderRadius: 24,
        backgroundColor: '#FFD600',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
    },

    editText: {
        fontSize: 13,
        fontWeight: '700',
        color: '#0A0A0A',
    },
});

