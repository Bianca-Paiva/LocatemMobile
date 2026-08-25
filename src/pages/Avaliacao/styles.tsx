import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    paddingHorizontal: 18,
    paddingBottom: 48,
  },

  tabs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',

    borderBottomWidth: 2,
    borderBottomColor: '#E0DDD6',

    marginBottom: 24,
  },

  tabBtn: {
    paddingVertical: 12,
    paddingHorizontal: 60,
  },

  tabBtnActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#1554F0',
  },

  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#A09E99',
  },

  tabTextActive: {
    color: '#1554F0',
  },

  tabPanel: {
    flex: 1,
  },
});