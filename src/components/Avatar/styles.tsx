import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    avatar: {
        borderRadius: 999,
        backgroundColor: '#E5E7EB',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        overflow: 'hidden',
    },

    avatarImg: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },

    avatarInitials: {
        fontWeight: '700',
        color: '#6B7280',
        letterSpacing: 0.2,
    },
});

