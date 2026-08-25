import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    gap: 6,
  },

  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#141D23',
  },

  campoWrapper: {
    position: 'relative',
    width: '100%',
  },

  input: {
    width: '100%',
    height: 48,

    paddingLeft: 14,
    paddingRight: 40,

    backgroundColor: '#FFFFFF', // var(--color-bg-input)

    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 10,

    color: '#141D23',
    fontSize: 14,
  },

  icone: {
    position: 'absolute',
    top: 15,
    right: 14,

    width: 18,
    height: 18,

    opacity: 0.75,
  },

  required: {
    color: '#E11D48',
    fontSize: 14,
    lineHeight: 14,
  },

  erro: {
    borderColor: '#E11D48',

    shadowColor: '#E11D48',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.16,
    shadowRadius: 4,

    elevation: 2,
  },

  error: {
    fontSize: 12,
    color: '#E11D48',
    fontWeight: '600',
  },
});