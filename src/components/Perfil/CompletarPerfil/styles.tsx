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

    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
        marginBottom: 12,
    },

    title: {
        fontSize: 15,
        fontWeight: '700',
        color: colors.textDark,
        flex: 1,
    },

    percent: {
        fontSize: 13,
        fontWeight: '700',
        color: colors.amber,
    },

    track: {
        height: 8,
        borderRadius: 8,
        backgroundColor: '#EEF0F2',
        overflow: 'hidden',
    },

    fill: {
        height: '100%',
        backgroundColor: colors.primary,
        borderRadius: 8,
    },

    tip: {
        marginTop: 10,
        fontSize: 13,
        color: colors.textMuted,
    },
});
