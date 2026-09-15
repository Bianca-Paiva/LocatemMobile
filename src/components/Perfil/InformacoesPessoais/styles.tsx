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

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
    },

    title: {
        fontSize: 15,
        fontWeight: '700',
        color: colors.textDark,
    },

    iconButton: {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: colors.primarySoft,
        alignItems: 'center',
        justifyContent: 'center',
    },

    row: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
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
        color: colors.textMuted,
        textTransform: 'uppercase',
        letterSpacing: 0.4,
    },

    value: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.textDark,
    },
});
