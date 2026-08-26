import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    width: '100%',

    backgroundColor: '#FFFFFF',

    borderWidth: 1,

    borderColor: '#EEEEEE',

    borderRadius: 16,

    padding: 8,

    marginBottom: 20,
  },

  scrollContent: {
    flexDirection: 'row',

    alignItems: 'center',

    gap: 4,
  },

  tab: {
    flexDirection: 'row',

    alignItems: 'center',

    paddingHorizontal: 14,

    paddingVertical: 10,

    borderRadius: 12,

    backgroundColor: 'transparent',

    minHeight: 40,
  },

  tabAtiva: {
    backgroundColor: '#ffda24ff',
  },

  tabTexto: {
    fontSize: 13,

    fontWeight: '700',

    color: '#7A7A7A',
  },

  tabTextoAtivo: {
    color: '#0A0A0A',
  },

  contador: {
    marginLeft: 8,

    minWidth: 20,

    height: 20,

    paddingHorizontal: 6,

    borderRadius: 999,

    justifyContent: 'center',

    alignItems: 'center',

    backgroundColor: '#F0F0F0',
  },

  contadorAtivo: {
    backgroundColor: 'rgba(10,10,10,0.12)',
  },

  contadorTexto: {
    fontSize: 11,

    fontWeight: '800',

    color: '#7A7A7A',
  },

  contadorTextoAtivo: {
    color: '#0A0A0A',
  },
});