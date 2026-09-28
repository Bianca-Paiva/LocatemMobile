/**
 * Secao do cadastro de ferramenta: captura uma parte do anuncio criado pelo locador.
 */
import type { EspecificacaoForm } from '../../../../pages/Ferramentas/CadastroFerramenta/types';

export interface EspecificacoesTecnicasFormProps {
  especificacoes: EspecificacaoForm[];
  onChange: (especificacoes: EspecificacaoForm[]) => void;
  erroPublicacao?: string;
}
