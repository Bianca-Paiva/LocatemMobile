import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(26,26,26,0.45)',
        justifyContent: 'flex-end',
    },

    modal: {
        maxHeight: '92%',
        backgroundColor: '#FFF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderWidth: 1,
        borderColor: '#F6C945',
    },

    header: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },

    title: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1A1A1A',
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

    avatar: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: '#FFD600',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },

    avatarImage: {
        width: '100%',
        height: '100%',
    },

    initials: {
        fontSize: 24,
        fontWeight: '800',
    },

    photoButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 14,
        paddingVertical: 7,
        borderRadius: 20,
        backgroundColor: '#FFF4B8',
    },

    photoText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#8A6D00',
    },

    alert: {
        backgroundColor: '#FFF3F3',
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

    field: {
        gap: 6,
    },

    label: {
        fontSize: 13,
        fontWeight: '700',
        color: '#333',
    },

    input: {
        height: 46,
        borderWidth: 1,
        borderColor: '#DADADA',
        borderRadius: 10,
        paddingHorizontal: 13,
        fontSize: 14,
        color: '#1A1A1A',
        backgroundColor: '#FFF',
    },

    inputError: {
        borderColor: '#D33',
    },

    error: {
        fontSize: 12,
        color: '#D33',
    },

    section: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0A0A0A',
        marginTop: 8,
    },

    cepLink: {
        fontSize: 14,
        fontWeight: '600',
        color: '#007BFF',
        textDecorationLine: 'underline',
        marginTop: -4,
    },

    save: {
        height: 48,
        borderRadius: 24,
        backgroundColor: '#FFD600',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 6,
    },

    saveText: {
        fontSize: 14,
        fontWeight: '800',
        color: '#0A0A0A',
    },
});