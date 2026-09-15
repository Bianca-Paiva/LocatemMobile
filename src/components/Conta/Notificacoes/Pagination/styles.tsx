import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 4,
  },

  arrowButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    backgroundColor: '#FFFFFF',
  },

  arrowButtonDisabled: {
    opacity: 0.5,
  },

  pageButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },

  pageButtonActive: {
    backgroundColor: '#F6C945',
    borderColor: '#F6C945',
  },

  pageButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4B4B4B',
  },

  pageButtonTextActive: {
    color: '#1A1A1A',
  },
});
