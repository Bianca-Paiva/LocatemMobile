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

  container: {
    position: 'relative',
    width: '100%',
  },

  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    width: '100%',
    height: 48,

    paddingHorizontal: 14,

    backgroundColor: '#FFFFFF', // var(--color-bg-input)

    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 10,
  },

  triggerText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },

  chevron: {
    width: 14,
    height: 14,

    marginLeft: 8,

    opacity: 0.75,
  },

  chevronOpen: {
    transform: [{ rotate: '180deg' }],
  },

  menu: {
    position: 'absolute',

    top: 52,
    left: 0,
    right: 0,

    zIndex: 50,

    backgroundColor: '#FFFFFF',

    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 10,

    padding: 4,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 24,

    elevation: 8,

    maxHeight: 220,
  },

  option: {
    paddingVertical: 8,
    paddingHorizontal: 10,

    borderRadius: 6,
  },

  optionText: {
    fontSize: 14,
    color: '#374151',
  },

  optionActive: {
    backgroundColor: '#F5E3B3',
  },

  optionActiveText: {
    color: '#6E5000',
    fontWeight: '600',
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