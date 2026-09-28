/**
 * Componente de autenticacao: apoia login, cadastro, recuperacao de senha ou protecao de rotas.
 */
import {ImageSourcePropType} from "react-native";

export interface UserTypeCardProps {
    title: string;
    description: string;
    icon: ImageSourcePropType;
    selected: boolean;
    onPress: () => void;
}