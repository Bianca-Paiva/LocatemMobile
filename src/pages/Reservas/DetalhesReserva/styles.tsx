// styles.ts

import { StyleSheet } from 'react-native';
import colors from '../../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
   backgroundColor: colors.bgApp,

  
  },

  containerCont: {
   
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 48,
  },

  conteudo: {
    gap: 18,
  },
   safeArea: {
    flex: 1,
  },
});