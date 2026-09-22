import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',

    justifyContent: 'center',

    paddingVertical: 56,

    paddingHorizontal: 24,

    borderWidth: 1.5,

    borderStyle: 'dashed',

    borderColor: '#E5E5E5',

    borderRadius: 16,
  },

  icon: {
    width: 40,

    height: 40,

    opacity: 0.3,

    marginBottom: 12,
  },

  title: {
    fontSize: 16,

    fontWeight: '700',

    color: '#1F2937',

    textAlign: 'center',

    marginBottom: 4,
  },

  description: {
    fontSize: 14,

    color: '#6B7280',

    textAlign: 'center',

    maxWidth: 320,
  },
});