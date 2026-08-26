export interface FotosFerramentaProps {
  fotos: string[];
  onChange: (fotos: string[]) => void;
  error?: string;
  shake?: boolean;
}
