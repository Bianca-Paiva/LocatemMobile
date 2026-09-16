import type { EspecificacaoForm } from '../../../../pages/Ferramentas/CadastroFerramenta/types';

export interface EspecificacoesTecnicasFormProps {
  especificacoes: EspecificacaoForm[];
  onChange: (especificacoes: EspecificacaoForm[]) => void;
  erroPublicacao?: string;
}
