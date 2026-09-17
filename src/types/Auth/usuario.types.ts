export type TipoUsuario = 'locatario' | 'locador' | 'adm';

export interface ReputacaoUsuario {
  rating: number;
  totalAvaliacoes: number;
  locacoesConcluidas: number;
  entregasNoPrazoPercentual?: number;
}

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  documento: string;
  endereco: string;
  tipo: TipoUsuario;
  fotoUrl?: string;
  emailVerificado: boolean;
  desde: number;
  reputacao: ReputacaoUsuario;
  token?: string
}

export interface PerfilFormData {
  nome: string;
  telefone: string;
  documento: string;
  cep: string;
  logradouro: string;
  numero: string;
}
