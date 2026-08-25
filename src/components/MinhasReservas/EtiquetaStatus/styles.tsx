import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',

    alignItems: 'center',

    alignSelf: 'flex-start',

    paddingHorizontal: 12,

    paddingVertical: 6,

    borderRadius: 999,

    borderWidth: 1,
  },

  icon: {
    marginRight: 6,
  },

  label: {
    fontSize: 12,

    fontWeight: '700',

    includeFontPadding: false,
  },
});