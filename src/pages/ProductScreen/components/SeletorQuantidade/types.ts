export interface SeletorQuantidadeProps {
  quantidade: number;
  estoqueDisponivel: number;
  onDecrementar: () => void;
  onIncrementar: () => void;
}