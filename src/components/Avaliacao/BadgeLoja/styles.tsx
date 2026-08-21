import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',

    marginBottom: 5,
  },

  logoContainer: {
    width: 28,
    height: 28,

    borderRadius: 4,

    justifyContent: 'center',
    alignItems: 'center',

    overflow: 'hidden',

    marginRight: 4,
  },

  logoAusente: {
    backgroundColor: '#F1EFE9',

    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#E0DDD6',
  },

  logo: {
    width: '100%',
    height: '100%',
  },

  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  texto: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1A1814',
  },

  link: {
    color: '#1554F0',

    fontSize: 12,
    fontWeight: '700',

    paddingLeft: 6,
    paddingRight: 4,
  },

  verificado: {
    width: 14,
    height: 14,
  },
});