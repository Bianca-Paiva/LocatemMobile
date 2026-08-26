export interface SeletorQuantidadeProps {
  quantidade: number;
  onIncrementar: () => void;
  onDecrementar: () => void;
  minimo?: number;
  maximo?: number;
  label?: string;
}
