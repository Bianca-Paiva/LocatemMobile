import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    gap: 6,
  },

  label: {
    flexDirection: 'row',
    alignItems: 'center',

    fontSize: 14,
    fontWeight: '600',

    color: '#141D23',
  },

  input: {
    width: '100%',
    height: 48,

    paddingHorizontal: 14,

    borderRadius: 10,

    borderWidth: 1.5,
    borderColor: '#E5E7EB',

    fontSize: 14,

    backgroundColor: '#FFFFFF', // var(--color-bg-input)

    color: '#141D23',
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

  sucesso: {
    borderColor: '#22C55E',
  },

  textarea: {
    width: '100%',

    minHeight: 120,

    paddingVertical: 14,
    paddingHorizontal: 16,

    borderRadius: 14,

    borderWidth: 1.5,
    borderColor: '#E5E7EB',

    fontSize: 14,

    backgroundColor: '#FFFFFF', // var(--color-bg-input)

    textAlignVertical: 'top',
  },

  required: {
    color: '#E11D48',

    fontSize: 16,

    lineHeight: 16,
  },

  error: {
    fontSize: 13,

    color: '#E11D48',

    fontWeight: '500',
  },

  inputFocused: {
    borderColor: '#FFCC0060',
    borderWidth: 1,
  },
});