import type { EspecificacaoForm } from '../../../pages/CadastroFerramenta/CadastroFerramenta.types';

export interface EspecificacoesTecnicasFormProps {
  especificacoes: EspecificacaoForm[];
  onChange: (especificacoes: EspecificacaoForm[]) => void;
  erroPublicacao?: string;
}
