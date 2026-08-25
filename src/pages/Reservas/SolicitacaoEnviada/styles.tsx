import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },

  content: {
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 16,

    alignItems: 'center',
  },

  iconCircle: {
    width: 92,
    height: 92,

    borderRadius: 46,

    backgroundColor: '#EAF2FE',

    justifyContent: 'center',
    alignItems: 'center',

    marginBottom: 24,
  },

  icon: {
    width: 48,
    height: 48,
  },

  title: {
    fontSize: 30,
    fontWeight: '800',

    color: '#1F2937',

    textAlign: 'center',

    marginBottom: 12,
  },

  description: {
    fontSize: 15,

    lineHeight: 22,

    color: '#6B7280',

    textAlign: 'center',

    marginBottom: 24,
  },

  alert: {
    width: '100%',

    flexDirection: 'row',

    alignItems: 'flex-start',

    backgroundColor: '#EAF2FE',

    borderWidth: 1,
    borderColor: '#D6E6FC',

    borderRadius: 12,

    paddingHorizontal: 16,
    paddingVertical: 14,

    marginBottom: 32,
  },

  alertIcon: {
    marginRight: 10,

    fontSize: 16,

    color: '#3D7CE0',
  },

  alertText: {
    flex: 1,

    fontSize: 13,

    lineHeight: 18,

    color: '#2C4D80',
  },

  actions: {
    width: '100%',

    gap: 12,

    marginTop: 24,
  },

  primaryButton: {
    height: 52,

    borderRadius: 14,

    backgroundColor: '#D6B656',

    justifyContent: 'center',
    alignItems: 'center',
  },

  primaryButtonText: {
    color: '#0A0A0A',

    fontSize: 15,

    fontWeight: '700',
  },

  secondaryButton: {
    height: 52,

    borderRadius: 14,

    borderWidth: 1,
    borderColor: '#EADFB0',

    backgroundColor: '#F5E3B3',

    justifyContent: 'center',
    alignItems: 'center',
  },

  secondaryButtonText: {
    color: '#6E5000',

    fontSize: 15,

    fontWeight: '700',
  },
});