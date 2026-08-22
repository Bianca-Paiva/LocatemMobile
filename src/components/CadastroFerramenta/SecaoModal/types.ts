import type { ReactNode } from 'react';

export interface SecaoModalProps {
  visible: boolean;
  onClose: () => void;
  icone: string;
  titulo: string;
  obrigatorio?: boolean;
  subtitulo: string;
  children: ReactNode;
}
