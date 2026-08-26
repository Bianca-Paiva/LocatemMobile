import { StyleSheet } from 'react-native';
import colors from '../../../theme/colors';

export default StyleSheet.create({
  wrapper: {
    gap: 10,
    width: '100%',
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: 32,
    paddingLeft: 12,
    paddingRight: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#F9FAFB',
  },
  chipTexto: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
  },
  chipBotaoRemover: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#EEF0F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dica: {
    fontSize: 12,
    color: colors.textMuted,
  },
});
