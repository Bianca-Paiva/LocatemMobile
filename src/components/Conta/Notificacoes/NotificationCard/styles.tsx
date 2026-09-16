import { StyleSheet } from 'react-native';

// Cores de fundo/ícone por `type`, usadas apenas quando a notificação não está
// atrelada a uma reserva (equivalente às classes .icon_success, .icon_warning etc
// do CSS na versão Web).
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
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: 'rgba(246, 202, 69, 0.6)',
    borderRadius: 16,
    padding: 18,
    gap: 14,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
  },

  iconWrapper: {
    flexShrink: 0,
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },

  content: {
    flex: 1,
    minWidth: 0,
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },

  description: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },

  extraInfo: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  extraInfoText: {
    fontSize: 13,
    color: '#6B7280',
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F6C945',
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 10,
    paddingLeft: 52,
  },

  timestamp: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  timestampText: {
    fontSize: 13,
    color: '#9A9A9A',
  },

  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginLeft: 'auto',
  },

  renovarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#F6C945',
  },

  renovarButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A1A',
  },

  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },

  detailsButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333333',
  },
});
