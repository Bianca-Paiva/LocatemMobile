import type { TipoAprovacao } from '../../../../pages/Ferramentas/CadastroFerramenta/types';

export interface OpcaoAprovacao {
  valor: TipoAprovacao;
  titulo: string;
  descricao: string;
  recomendado?: boolean;
}

export interface AprovacaoLocacaoProps {
  tipoAprovacao: TipoAprovacao;
  onChange: (valor: TipoAprovacao) => void;
  error?: string;
  shake?: boolean;
}
