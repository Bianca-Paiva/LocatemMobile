import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  toast: {
    position: 'absolute',

    bottom: 32,

    alignSelf: 'center',

    backgroundColor: '#1A1814',

    paddingVertical: 14,
    paddingHorizontal: 28,

    borderRadius: 100,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 24,

    elevation: 8,
  },

  texto: {
    color: '#FFFFFF',

    fontSize: 14,

    fontWeight: '600',
  },
});