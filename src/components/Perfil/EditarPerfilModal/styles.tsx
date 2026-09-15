import { StyleSheet } from 'react-native';
import colors from '../../../theme/colors';

export const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(10,10,10,0.45)',
        justifyContent: 'flex-end',
    },

    modal: {
        maxHeight: '92%',
        backgroundColor: colors.bgCard,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderWidth: 1,
        borderColor: colors.primaryLight,
    },

    header: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },

    title: {
        fontSize: 18,
        fontWeight: '800',
        color: colors.textDark,
    },

    close: {
        width: 34,
        height: 34,
        borderRadius: 17,
        alignItems: 'center',
        justifyContent: 'center',
    },

    content: {
        padding: 20,
        paddingBottom: 36,
    },

    photo: {
        alignItems: 'center',
        gap: 10,
        marginBottom: 20,
    },

    photoButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 14,
        paddingVertical: 7,
        borderRadius: 20,
        backgroundColor: colors.primarySoft,
    },

    photoText: {
        fontSize: 12,
        fontWeight: '700',
        color: colors.amber,
    },

    alert: {
        backgroundColor: colors.errorBg,
        borderRadius: 10,
        padding: 12,
        marginBottom: 16,
    },

    alertTitle: {
        fontWeight: '800',
        color: '#B42318',
    },

    alertMessage: {
        marginTop: 3,
        color: '#7A271A',
    },

    form: {
        gap: 14,
    },

    section: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.textDark,
        marginTop: 8,
    },

    cepLink: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.linkColor,
        textDecorationLine: 'underline',
        marginTop: -4,
    },
});
