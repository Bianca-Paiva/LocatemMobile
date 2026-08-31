import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export const ICON_BG_BY_TYPE: Record<string, { fundo: string; cor: string }> = {
  success: { fundo: '#DCF5E3', cor: '#2EAE60' },
  warning: { fundo: '#FDECC8', cor: '#E8A33D' },
  delivery: { fundo: '#DCEBFC', cor: '#3B82F6' },
  error: { fundo: '#FBDCDC', cor: '#E34747' },
  info: { fundo: '#E2E8F0', cor: '#475569' },
  promotion: { fundo: '#F2DCFC', cor: '#A855F7' },
  message: { fundo: '#DEE2FC', cor: '#6366F1' },
  reminder: { fundo: '#FDE7C8', cor: '#D97706' },
};

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(26, 26, 26, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },

  modal: {
    width: '100%',
    maxWidth: 540,
    maxHeight: height - 96,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#F6C945',
    padding: 20,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    marginBottom: 20,
  },

  iconWrapper: {
    flexShrink: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerText: {
    flex: 1,
    minWidth: 0,
  },

  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },

  description: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },

  closeButton: {
    flexShrink: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  details: {
    gap: 16,
    padding: 16,
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    marginBottom: 20,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },

  label: {
    fontSize: 13,
    color: '#4B4B4B',
    flexShrink: 0,
  },

  value: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'right',
  },

  footer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    gap: 10,
  },

  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 18,
    backgroundColor: '#F6C945',
  },

  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
});
