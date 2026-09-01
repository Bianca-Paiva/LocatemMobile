export interface FotosFerramentaProps {
  fotos: string[];
  onChange: (fotos: string[]) => void;
  error?: string;
  shake?: boolean;
  /**
   * Avisa o componente pai (SecaoModal) quando o usuário começa/termina
   * de arrastar uma foto, pra que o ScrollView da seção possa ser
   * desabilitado durante o gesto e não brigue pelo toque.
   */
  onDragStateChange?: (arrastando: boolean) => void;
}
