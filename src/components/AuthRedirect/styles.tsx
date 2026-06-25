import { StyleSheet } from "react-native";

 const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center', // Alinha os textos verticalmente caso tenham tamanhos ligeiramente diferentes
  },
  footerText: {
    fontSize: 15,
    color: '#6c727f',
    fontFamily: 'Inter_400Regular',
  },
  registerText: {
    fontSize: 15,
    color: '#000000',
    fontFamily: 'Inter_500Medium',
    marginLeft: 4, // Pequeno espaçamento para desgrudar do texto estático
  }
});

export default styles;