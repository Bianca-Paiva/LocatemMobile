import type { ReactNode } from 'react';

export interface SecaoModalProps {
  visible: boolean;
  onClose: () => void;
  icone: string;
  titulo: string;
  obrigatorio?: boolean;
  subtitulo: string;
  children: ReactNode;
  /**
   * Permite que a seção (ex: FotosFerramenta, durante o drag de reordenar)
   * desabilite temporariamente o scroll do modal, evitando que o
   * ScrollView "roube" o toque de um gesto de arrastar interno.
   * Padrão: true.
   */
  scrollEnabled?: boolean;
}
