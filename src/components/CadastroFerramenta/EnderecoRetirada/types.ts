import type { CadastroFerramentaFormState } from '../../../pages/CadastroFerramenta/CadastroFerramenta.types';

export type CampoEndereco =
  | 'cep'
  | 'ruaAvenida'
  | 'numero'
  | 'complemento'
  | 'usarMesmoEnderecoDevolucao'
  | 'cepDevolucao'
  | 'ruaAvenidaDevolucao'
  | 'numeroDevolucao'
  | 'complementoDevolucao';

export interface ErrosEndereco {
  cep?: string;
  ruaAvenida?: string;
  numero?: string;
  cepDevolucao?: string;
  ruaAvenidaDevolucao?: string;
  numeroDevolucao?: string;
}

export interface EnderecoRetiradaProps {
  form: Pick<CadastroFerramentaFormState, CampoEndereco>;
  onChangeCampo: <K extends CampoEndereco>(campo: K, valor: CadastroFerramentaFormState[K]) => void;
  erros: ErrosEndereco;
  shake: boolean;
}
