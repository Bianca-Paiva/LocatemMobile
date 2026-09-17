export interface AbaItem<T extends string> {
  key: T;
  label: string;
}

export interface AbasProps<T extends string> {
  abas: AbaItem<T>[];
  ativo: T;
  onChange: (valor: T) => void;
  contagem: Record<T, number>;
}
