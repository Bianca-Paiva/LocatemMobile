import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFF',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#F3F4F6',
        padding: 18,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
    },

    title: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1A1A1A',
    },

    iconButton: {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: '#FFF4B8',
        alignItems: 'center',
        justifyContent: 'center',
    },

    row: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
        gap: 4,
    },

    last: {
        borderBottomWidth: 0,
        paddingBottom: 0,
    },

    label: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },

    labelText: {
        fontSize: 11,
        fontWeight: '600',
        color: '#777',
        textTransform: 'uppercase',
        letterSpacing: 0.4,
    },

    value: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1A1A1A',
    },
});