import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFF',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#F3F4F6',
        padding: 18,
    },

    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
        marginBottom: 12,
    },

    title: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1A1A1A',
        flex: 1,
    },

    percent: {
        fontSize: 13,
        fontWeight: '700',
        color: '#6B5A00',
    },

    track: {
        height: 8,
        borderRadius: 8,
        backgroundColor: '#EEF0F2',
        overflow: 'hidden',
    },

    fill: {
        height: '100%',
        backgroundColor: '#FFD600',
        borderRadius: 8,
    },

    tip: {
        marginTop: 10,
        fontSize: 13,
        color: '#777',
    },
});
