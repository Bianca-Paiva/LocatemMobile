import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const horizontalPadding = width >= 1024 ? 32 : width >= 640 ? 24 : 16;
const bottomPadding = width >= 1024 ? 64 : width >= 640 ? 56 : 48;
const gapLista = width >= 640 ? 16 : 14;

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  content: {
    gap: 18,
  },

  containerCont: {
    paddingBottom: bottomPadding,
    paddingHorizontal: horizontalPadding,
    gap: 20,
  },

  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    flexWrap: 'wrap',
  },

  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 4,
    paddingHorizontal: 4,
  },

  clearButtonDisabled: {
    opacity: 0.4,
  },

  clearButtonText: {
    fontSize: 14,
    color: '#6B7280',
  },

  list: {
    gap: gapLista,
  },

  emptyState: {
    alignItems: 'center',
    paddingVertical: 64,
    paddingHorizontal: 24,
    borderWidth: 1.5,
    borderColor: '#E5E5E5',
    borderStyle: 'dashed',
    borderRadius: 16,
  },

  emptyTitle: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
  },

  emptyDescription: {
    marginTop: 4,
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    maxWidth: 320,
  },



// modaç trash

modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.15)',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 24,
},

modalContainer: {
  width: '100%',
  maxWidth: 400,
  backgroundColor: '#FFFFFF',
  borderRadius: 16,
  padding: 24,
},

modalTitle: {
  fontSize: 18,
  fontWeight: '700',
  marginBottom: 12,
  color: '#111827',
},

modalDescription: {
  color: '#6B7280',
  lineHeight: 22,
  marginBottom: 24,
},

modalActions: {
  flexDirection: 'row',
  justifyContent: 'flex-end',
  gap: 12,
},

cancelButton: {
  paddingVertical: 10,
  paddingHorizontal: 16,
},

cancelButtonText: {
  color: '#6B7280',
  fontWeight: '600',
},

confirmButton: {
  backgroundColor: '#EF4444',
  paddingVertical: 10,
  paddingHorizontal: 16,
  borderRadius: 8,
},

confirmButtonText: {
  color: '#FFFFFF',
  fontWeight: '700',
},

});
