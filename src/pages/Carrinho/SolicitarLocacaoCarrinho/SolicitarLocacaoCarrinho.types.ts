/**
 * Tipos da tela "Detalhes da Locação" (fluxo "Adicionar ao carrinho").
 *
 * Espelha, no Mobile, os tipos usados pelo modal equivalente na Web (ver
 * `web/src/components/SolicitarLocacao/SolicitarLocacaoModal/SolicitarLocacaoModal.types.ts`)
 * — aqui a mesma informação (período, horários e quantidade) vive numa tela
 * cheia própria, e não num modal sobreposto à tela do produto.
 */

/** Estado do formulário desta tela */
export interface LocacaoCarrinhoFormState {
  dataEntrega: string; /** Data no formato ISO ("yyyy-mm-dd"), selecionada no calendário do CampoData */
  horarioEntrega: string; /** Ex: "09:00" */
  dataDevolucao: string; /** Data no formato ISO ("yyyy-mm-dd") */
  horarioDevolucao: string; /** Ex: "18:00" */
  quantidade: number;
}

/** Resumo calculado exibido na tela */
export interface ResumoLocacaoCarrinhoCalculado {
  dataEntregaFormatada: string; /** Ex: "10/08/2026" */
  dataDevolucaoFormatada: string; /** Ex: "15/08/2026" */
  entregaHorarioFormatado: string; /** Ex: "09:00 às 12:00" */
  devolucaoHorarioFormatado: string; /** Ex: "14:00 às 17:00" */
  diarias: number;
  periodoValido: boolean;
  quantidadeFormatada: string; /** Ex: "2 unidades" */
  aluguel: number;
  aluguelFormatado: string;
  frete: number;
  freteFormatado: string;
  valor: number;
  valorFormatado: string;
  /** true quando datas, horários e quantidade estão todos preenchidos e o período é válido */
  formularioCompleto: boolean;
}

/** Dados prontos para virar um item do carrinho ao confirmar a tela */
export interface DadosLocacaoCarrinho {
  produtoId?: number;
  dataEntrega: string;
  horarioEntrega: string;
  dataDevolucao: string;
  horarioDevolucao: string;
  quantidade: number;
  resumo: ResumoLocacaoCarrinhoCalculado;
}
