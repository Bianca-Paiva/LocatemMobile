import { StyleSheet } from 'react-native';
import colors from '../../../theme/colors';

export const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.bgCard,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 18,
    },

    title: {
        fontSize: 15,
        fontWeight: '700',
        color: colors.textDark,
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
        borderColor: colors.border,
        borderRadius: 12,
        backgroundColor: colors.bgMain,
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
        backgroundColor: colors.primarySoft,
        alignItems: 'center',
        justifyContent: 'center',
        color: colors.amber,
    },

    texts: {
        flex: 1,
        gap: 2,
    },

    optionTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: colors.textDark,
    },

    description: {
        fontSize: 12,
        color: colors.textMuted,
    },
});
