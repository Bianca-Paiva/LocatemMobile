import { StyleSheet } from 'react-native';
import colors from '../../../theme/colors';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.bgApp,
  },

  content: {
    paddingBottom: 48,
  },

  hero: {
    alignItems: 'center',
    backgroundColor: colors.primarySoft,
    paddingTop: 40,
    paddingBottom: 32,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.bgCard,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  heroTitle: {
    fontSize: 21,
    fontWeight: '700',
    color: colors.textDark,
    textAlign: 'center',
    marginBottom: 8,
  },

  heroSubtitle: {
    fontSize: 14.5,
    color: colors.textMuted,
    marginBottom: 16,
  },

  heroPrice: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.textDark,
  },

  pickupAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: 16,
    marginTop: 20,
    padding: 14,
    borderRadius: 12,
    backgroundColor: colors.successBg,
    borderWidth: 1,
    borderColor: colors.successBorder,
  },

  pickupAlertTexto: {
    flex: 1,
    fontSize: 13.5,
    color: colors.textDark,
  },

  resumoCard: {
    marginHorizontal: 16,
    marginTop: 16,
    padding: 18,
    borderRadius: 14,
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 14,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textDark,
  },

  detailsList: {
    gap: 12,
  },

  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  label: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  labelTexto: {
    fontSize: 13.5,
    color: colors.textMuted,
  },

  value: {
    fontSize: 13.5,
    fontWeight: '600',
    color: colors.textDark,
  },

  produtosSection: {
    marginHorizontal: 16,
    marginTop: 20,
    gap: 12,
  },

  listaProdutos: {
    gap: 10,
  },

  productCard: {
    flexDirection: 'row',
    gap: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.border,
  },

  productImagem: {
    width: 56,
    height: 56,
    borderRadius: 8,
    backgroundColor: colors.bgInput,
  },

  productInfo: {
    flex: 1,
    justifyContent: 'center',
    gap: 4,
  },

  productNome: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textDark,
  },

  productDetalhe: {
    fontSize: 12.5,
    color: colors.textMuted,
  },

  actions: {
    marginHorizontal: 16,
    marginTop: 24,
    gap: 10,
  },
});
