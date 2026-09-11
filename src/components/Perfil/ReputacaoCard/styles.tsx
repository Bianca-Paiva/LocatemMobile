import { StyleSheet } from 'react-native';
import colors from '../../../theme/colors';

export const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.bgCard,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 18,
        alignItems: 'center',
    },

    title: {
        alignSelf: 'flex-start',
        fontSize: 15,
        fontWeight: '700',
        color: colors.textDark,
        marginBottom: 16,
    },

    rating: {
        fontSize: 40,
        fontWeight: '800',
        color: colors.textDark,
    },

    stars: {
        flexDirection: 'row',
        gap: 3,
        marginBottom: 16,
    },

    metrics: {
        width: '100%',
        borderTopWidth: 1,
        borderTopColor: colors.border,
        paddingTop: 14,
        alignItems: 'center',
    },

    based: {
        fontSize: 12,
        color: colors.textMuted,
        marginBottom: 4,
    },

    metric: {
        fontSize: 14,
        fontWeight: '700',
        color: colors.textDark,
        marginBottom: 2,
    },

    link: {
        marginTop: 14,
        fontSize: 13,
        fontWeight: '600',
        color: colors.amber,
    },
});
