import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFF',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#F3F4F6',
        padding: 18,
        alignItems: 'center',
    },

    title: {
        alignSelf: 'flex-start',
        fontSize: 15,
        fontWeight: '700',
        color: '#1A1A1A',
        marginBottom: 16,
    },

    rating: {
        fontSize: 44,
        fontWeight: '800',
        color: '#1A1A1A',
    },

    stars: {
        flexDirection: 'row',
        gap: 3,
        marginBottom: 16,
    },

    metrics: {
        width: '100%',
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
        paddingTop: 14,
        alignItems: 'center',
    },

    based: {
        fontSize: 12,
        color: '#777',
        marginBottom: 4,
    },

    metric: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1A1A1A',
        marginBottom: 2,
    },

    link: {
        marginTop: 14,
        fontSize: 13,
        fontWeight: '600',
        color: '#6B5A00',
    },
});

