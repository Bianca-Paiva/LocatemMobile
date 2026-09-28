/**
 * Componente de autenticacao: apoia login, cadastro, recuperacao de senha ou protecao de rotas.
 */
import { TextStyle } from "react-native";

export interface AuthRedirectProps {
  text: string;
  buttonText: string;
  route: string;
  textStyle?: TextStyle;
  buttonTextStyle?: TextStyle;
}