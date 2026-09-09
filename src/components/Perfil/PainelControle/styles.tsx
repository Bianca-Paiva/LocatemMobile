import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFF',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#F3F4F6',
        padding: 18,
    },

    title: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1A1A1A',
        marginBottom: 14,
    },

    grid: {
        gap: 12,
    },

    option: {
        minHeight: 68,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        padding: 14,
        borderWidth: 1,
        borderColor: '#F3F4F6',
        borderRadius: 12,
        backgroundColor: '#FAFAFA',
    },

    pressed: {
        transform: [{ scale: 0.99 }],
    },

    disabled: {
        opacity: 0.65,
    },

    icon: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: '#FFF4B8',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#8A6D00',
    },

    texts: {
        flex: 1,
        gap: 2,
    },

    optionTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1A1A1A',
    },

    description: {
        fontSize: 12,
        color: '#777',
    },
});

