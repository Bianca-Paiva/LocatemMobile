export interface SecaoCardProps {
  /** nome de ícone do MaterialCommunityIcons */
  icone: string;
  titulo: string;
  obrigatorio?: boolean;
  /** true quando os campos obrigatórios da seção já estão preenchidos */
  completo?: boolean;
  /** true quando o usuário tentou publicar e essa seção tem erro */
  comErro?: boolean;
  onPress: () => void;
}
