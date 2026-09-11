import { StyleSheet } from 'react-native';
import colors from '../../../theme/colors';

export const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.bgCard,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: colors.border,
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
        color: colors.textDark,
    },

    badge: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 30,
        backgroundColor: colors.primarySoft,
    },

    badgeText: {
        fontSize: 11,
        fontWeight: '700',
        color: colors.amber,
    },

    edit: {
        height: 40,
        borderRadius: 24,
        backgroundColor: colors.primary,
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
