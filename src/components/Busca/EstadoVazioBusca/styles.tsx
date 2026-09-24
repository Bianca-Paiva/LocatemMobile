import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 56,
    paddingHorizontal: 24,
    marginHorizontal: 20,
    marginTop: 24,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#E5E5E5',
    borderRadius: 16,
  },

  icon: {
    marginBottom: 12,
    opacity: 0.35,
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

  limparButton: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    backgroundColor: '#FFD600',
  },

  limparButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1C1E',
  },
});
