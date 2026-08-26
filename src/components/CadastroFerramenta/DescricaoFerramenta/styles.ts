import { StyleSheet } from 'react-native';
import colors from '../../../theme/colors';

export default StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  rodape: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 6,
  },
  contador: {
    fontSize: 12,
    color: colors.textMuted,
  },
});
