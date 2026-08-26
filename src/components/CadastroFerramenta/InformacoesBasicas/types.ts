import type { CadastroFerramentaFormState } from '../../../pages/CadastroFerramenta/CadastroFerramenta.types';

export type CampoBasico =
  | 'nome'
  | 'marca'
  | 'modelo'
  | 'categoria'
  | 'estadoConservacao'
  | 'quantidadeDisponivel'
  | 'fonteAlimentacao';

export interface ErrosBasico {
  nome?: string;
  marca?: string;
  modelo?: string;
  categoria?: string;
  estadoConservacao?: string;
  fonteAlimentacao?: string;
}

export interface InformacoesBasicasProps {
  form: Pick<CadastroFerramentaFormState, CampoBasico>;
  onChangeCampo: <K extends CampoBasico>(campo: K, valor: CadastroFerramentaFormState[K]) => void;
  erros: ErrosBasico;
  shake: boolean;
}
