// Mesma responsabilidade do "CadastroFerramenta.types.ts" da versão Web:
// centraliza o formato dos dados do formulário, as constantes de opções
// e a validação. Os componentes de seção (InformacoesBasicas, FotosFerramenta...)
// continuam "burros": só recebem form/erros/onChangeCampo por props.

import { moedaParaNumero } from '../../hooks/masks';

export interface EspecificacaoForm {
  id: string;
  label: string;
  valor: string;
}

export type TipoAprovacao = 'manual' | 'automatica';

export interface CadastroFerramentaFormState {
  // Informações básicas
  nome: string;
  marca: string;
  modelo: string;
  categoria: string;
  estadoConservacao: string;
  quantidadeDisponivel: number;
  fonteAlimentacao: string;

  // Endereço de retirada
  cep: string;
  ruaAvenida: string;
  numero: string;
  complemento: string;
  usarMesmoEnderecoDevolucao: boolean;

  // Endereço de devolução (preenchido só quando usarMesmoEnderecoDevolucao === false)
  cepDevolucao: string;
  ruaAvenidaDevolucao: string;
  numeroDevolucao: string;
  complementoDevolucao: string;

  // Descrição
  descricao: string;

  // Especificações técnicas
  especificacoes: EspecificacaoForm[];

  // Fotos (data URLs / URIs locais — só front, sem upload de verdade ainda)
  fotos: string[];

  // Precificação
  valorDiaria: string;
  caucao: string;

  // Acessórios inclusos
  acessorios: string[];

  // Aprovação da locação
  tipoAprovacao: TipoAprovacao;

  // Calendário de disponibilidade
  diasIndisponiveis: string[];
}

export const CATEGORIAS_FERRAMENTA = [
  'Furadeiras e Parafusadeiras',
  'Serras',
  'Lixadeiras e Politrizes',
  'Ferramentas de Jardim',
  'Compressores e Pintura',
  'Andaimes e Escadas',
  'Elétrica e Iluminação',
  'Medição e Nivelamento',
  'Outros',
];

export const ESTADOS_CONSERVACAO = [
  'Novo',
  'Seminovo',
  'Usado - bom estado',
  'Usado - com marcas de uso',
];

export const OPCOES_FONTE_ALIMENTACAO = [
  '110V',
  '220V',
  'Bivolt',
  'Bateria',
  'A gasolina',
  'Manual',
];

export const LIMITE_CARACTERES_DESCRICAO = 1000;
export const MIN_CARACTERES_DESCRICAO = 50;
export const MAXIMO_FOTOS = 8;

export function criarFormularioVazio(): CadastroFerramentaFormState {
  return {
    nome: '',
    marca: '',
    modelo: '',
    categoria: '',
    estadoConservacao: '',
    quantidadeDisponivel: 1,
    fonteAlimentacao: '',

    cep: '',
    ruaAvenida: '',
    numero: '',
    complemento: '',
    usarMesmoEnderecoDevolucao: false,

    cepDevolucao: '',
    ruaAvenidaDevolucao: '',
    numeroDevolucao: '',
    complementoDevolucao: '',

    descricao: '',

    especificacoes: [{ id: `esp-${Date.now()}`, label: '', valor: '' }],

    fotos: [],

    valorDiaria: '',
    caucao: '',

    acessorios: [],

    tipoAprovacao: 'manual',

    diasIndisponiveis: [],
  };
}

// ---------------------------------------------------------------------------
// Seções: cada uma vira um "card pequeno" na tela mobile. É essa lista que
// alimenta o grid da tela principal e os modais que abrem ao tocar no card.
// ---------------------------------------------------------------------------
export type SecaoId =
  | 'informacoesBasicas'
  | 'fotos'
  | 'descricao'
  | 'especificacoes'
  | 'endereco'
  | 'precificacao'
  | 'acessorios'
  | 'aprovacao'
  | 'calendario';

export interface SecaoMeta {
  id: SecaoId;
  titulo: string;
  subtitulo: string;
  /** nome de ícone do @expo/vector-icons (MaterialCommunityIcons) */
  icone: string;
  obrigatorio: boolean;
}

export const SECOES: SecaoMeta[] = [ 
  {
    id: 'fotos',
    titulo: 'Enviar Arquivos',
    subtitulo: 'Fotos da ferramenta (mín. 1)',
    icone: 'camera-outline',
    obrigatorio: true,
  },
  {
    id: 'informacoesBasicas',
    titulo: 'Informações Básicas',
    subtitulo: 'Nome, marca, modelo e categoria',
    icone: 'information-outline',
    obrigatorio: true,
  },
 
  {
    id: 'descricao',
    titulo: 'Descrição',
    subtitulo: 'Detalhes e observações',
    icone: 'text-box-outline',
    obrigatorio: true,
  },
  {
    id: 'especificacoes',
    titulo: 'Especificações Técnicas',
    subtitulo: 'Torque, potência, voltagem...',
    icone: 'format-list-bulleted',
    obrigatorio: false,
  },
  {
    id: 'endereco',
    titulo: 'Endereço de Retirada',
    subtitulo: 'CEP, rua e número',
    icone: 'map-marker-outline',
    obrigatorio: true,
  },
  {
    id: 'precificacao',
    titulo: 'Precificação',
    subtitulo: 'Valor da diária e caução',
    icone: 'currency-usd',
    obrigatorio: true,
  },
  {
    id: 'acessorios',
    titulo: 'Acessórios Inclusos',
    subtitulo: 'Itens que acompanham',
    icone: 'toolbox-outline',
    obrigatorio: false,
  },
  {
    id: 'aprovacao',
    titulo: 'Aprovação da Locação',
    subtitulo: 'Manual ou automática',
    icone: 'check-decagram-outline',
    obrigatorio: true,
  },
  {
    id: 'calendario',
    titulo: 'Disponibilidade',
    subtitulo: 'Marque os dias indisponíveis',
    icone: 'calendar-blank-outline',
    obrigatorio: false,
  },
];

// ---------------------------------------------------------------------------
// Validação central (mesmas regras que os campos "required" da Web tinham)
// ---------------------------------------------------------------------------
export interface ErrosFormulario {
  nome?: string;
  marca?: string;
  modelo?: string;
  categoria?: string;
  estadoConservacao?: string;
  fonteAlimentacao?: string;
  cep?: string;
  ruaAvenida?: string;
  numero?: string;
  cepDevolucao?: string;
  ruaAvenidaDevolucao?: string;
  numeroDevolucao?: string;
  descricao?: string;
  especificacoes?: string;
  fotos?: string;
  valorDiaria?: string;
  tipoAprovacao?: string;
}

export function validarFormulario(form: CadastroFerramentaFormState): ErrosFormulario {
  const erros: ErrosFormulario = {};

  if (!form.nome.trim()) erros.nome = 'Informe o nome da ferramenta.';
  if (!form.marca.trim()) erros.marca = 'Informe a marca.';
  if (!form.modelo.trim()) erros.modelo = 'Informe o modelo.';
  if (!form.categoria) erros.categoria = 'Selecione uma categoria.';
  if (!form.estadoConservacao) erros.estadoConservacao = 'Selecione o estado de conservação.';
  if (!form.fonteAlimentacao) erros.fonteAlimentacao = 'Selecione a fonte de alimentação.';

  if (!/^\d{5}-\d{3}$/.test(form.cep)) erros.cep = 'Informe um CEP válido.';
  if (!form.ruaAvenida.trim()) erros.ruaAvenida = 'Informe a rua/avenida.';
  if (!form.numero.trim()) erros.numero = 'Informe o número.';

  if (!form.usarMesmoEnderecoDevolucao) {
    if (!/^\d{5}-\d{3}$/.test(form.cepDevolucao)) erros.cepDevolucao = 'Informe um CEP válido.';
    if (!form.ruaAvenidaDevolucao.trim()) erros.ruaAvenidaDevolucao = 'Informe a rua/avenida.';
    if (!form.numeroDevolucao.trim()) erros.numeroDevolucao = 'Informe o número.';
  }

  if (form.descricao.trim().length < MIN_CARACTERES_DESCRICAO) {
    erros.descricao = `Escreva pelo menos ${MIN_CARACTERES_DESCRICAO} caracteres.`;
  }

  const especificacaoIncompleta = form.especificacoes.some(
    (esp) => esp.label.trim() !== '' && esp.valor.trim() === '',
  ) || form.especificacoes.some((esp) => esp.label.trim() === '' && esp.valor.trim() !== '');
  if (especificacaoIncompleta) {
    erros.especificacoes = 'Preencha os dois campos da especificação ou remova a linha.';
  }

  if (form.fotos.length === 0) erros.fotos = 'Adicione pelo menos 1 foto.';

  if (!form.valorDiaria || moedaParaNumero(form.valorDiaria) <= 0) {
    erros.valorDiaria = 'Informe o valor da diária.';
  }

  if (!form.tipoAprovacao) erros.tipoAprovacao = 'Selecione o tipo de aprovação.';

  return erros;
}

/** Usado pra pintar o "badge" de completo/pendente no card de cada seção, antes mesmo de tentar publicar. */
export function secaoEstaCompleta(id: SecaoId, form: CadastroFerramentaFormState): boolean {
  switch (id) {
    case 'informacoesBasicas':
      return Boolean(
        form.nome.trim() && form.marca.trim() && form.modelo.trim() &&
        form.categoria && form.estadoConservacao && form.fonteAlimentacao,
      );
    case 'fotos':
      return form.fotos.length > 0;
    case 'descricao':
      return form.descricao.trim().length >= MIN_CARACTERES_DESCRICAO;
    case 'especificacoes':
      // opcional: "completo" se não tiver nenhuma linha pela metade
      return form.especificacoes.every((esp) => esp.label.trim() !== '' && esp.valor.trim() !== '');
    case 'endereco':
      return Boolean(
        /^\d{5}-\d{3}$/.test(form.cep) &&
        form.ruaAvenida.trim() &&
        form.numero.trim() &&
        (form.usarMesmoEnderecoDevolucao ||
          (/^\d{5}-\d{3}$/.test(form.cepDevolucao) &&
            form.ruaAvenidaDevolucao.trim() &&
            form.numeroDevolucao.trim())),
      );
    case 'precificacao':
      return moedaParaNumero(form.valorDiaria) > 0;
    case 'acessorios':
      return true; // opcional, sempre "completo"
    case 'aprovacao':
      return Boolean(form.tipoAprovacao);
    case 'calendario':
      return true; // opcional, sempre "completo"
    default:
      return false;
  }
}

/** Mapeia cada seção pras chaves de erro que ela é responsável por mostrar. */
export function secaoTemErro(id: SecaoId, erros: ErrosFormulario): boolean {
  switch (id) {
    case 'informacoesBasicas':
      return Boolean(erros.nome || erros.marca || erros.modelo || erros.categoria || erros.estadoConservacao || erros.fonteAlimentacao);
    case 'fotos':
      return Boolean(erros.fotos);
    case 'descricao':
      return Boolean(erros.descricao);
    case 'especificacoes':
      return Boolean(erros.especificacoes);
    case 'endereco':
      return Boolean(
        erros.cep || erros.ruaAvenida || erros.numero ||
        erros.cepDevolucao || erros.ruaAvenidaDevolucao || erros.numeroDevolucao,
      );
    case 'precificacao':
      return Boolean(erros.valorDiaria);
    case 'aprovacao':
      return Boolean(erros.tipoAprovacao);
    default:
      return false;
  }
}
