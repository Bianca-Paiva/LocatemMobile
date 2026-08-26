export interface PrecificacaoProps {
  valorDiaria: string;
  caucao: string;
  onChangeValorDiaria: (valor: string) => void;
  onChangeCaucao: (valor: string) => void;
  error?: string;
  shake?: boolean;
}
