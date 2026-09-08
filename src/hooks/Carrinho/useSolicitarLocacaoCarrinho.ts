import { useMemo, useState } from 'react';

import type { ProdutoSelecionado } from '../../context/ProdutoContext';

import { formatarIntervaloHorario } from '../../utils/horario';

import type {
  DadosLocacaoCarrinho,
  LocacaoCarrinhoFormState,
  ResumoLocacaoCarrinhoCalculado,
} from '../../pages/Carrinho/SolicitarLocacaoCarrinho/SolicitarLocacaoCarrinho.types';

/**
 * Centraliza a lógica de negócio da tela "Detalhes da Locação".
 * Controla o formulário, cálculos de valores, período e quantidade.
 */

// Converte uma data ISO ("yyyy-mm-dd") em um objeto Date sem considerar fuso horário.
function parseDataIso(dataIso: string): Date | null {
  if (!dataIso) return null;

  const [ano, mes, dia] = dataIso.split('-').map(Number);

  if (!ano || !mes || !dia) return null;

  return new Date(ano, mes - 1, dia);
}

// Converte uma data ISO ("yyyy-mm-dd") para o formato brasileiro ("dd/mm/yyyy").
function formatarDataBr(dataIso: string): string {
  const data = parseDataIso(dataIso);

  if (!data) return '';

  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');

  return `${dia}/${mes}/${data.getFullYear()}`;
}

// Formata um valor numérico como moeda brasileira.
function formatarMoeda(valor: number): string {
  return `R$ ${valor.toFixed(2).replace('.', ',')}`;
}

// Adiciona uma quantidade de dias a uma data e retorna o resultado em formato ISO.
function adicionarDias(dataIso: string, dias: number): string {
  const data = parseDataIso(dataIso);

  if (!data) return '';

  data.setDate(data.getDate() + dias);

  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');

  return `${ano}-${mes}-${dia}`;
}

// Valor fixo do frete utilizado enquanto o cálculo real ainda é mockado.
const FRETE_PADRAO = 10;

interface UseSolicitarLocacaoCarrinhoParams {
  /** Quantidade inicial selecionada na tela do produto. */
  quantidadeInicial?: number;

  /** Quantidade de diárias selecionada na tela do produto. */
  duracaoInicial?: number | null;

  /** Produto utilizado para calcular os valores e limites da locação. */
  produto: ProdutoSelecionado;
}

export function useSolicitarLocacaoCarrinho({
  produto,
  quantidadeInicial,
  duracaoInicial,
}: UseSolicitarLocacaoCarrinhoParams) {
  // Mantém os dados preenchidos pelo usuário na tela de locação.
  const [form, setForm] = useState<LocacaoCarrinhoFormState>({
    dataEntrega: '',
    horarioEntrega: '',
    dataDevolucao: '',
    horarioDevolucao: '',
    quantidade: quantidadeInicial ?? 1,
  });

  // Converte o preço diário do produto para número.
  // useMemo evita refazer o cálculo enquanto o preço não mudar.
  const precoDiaria = useMemo(() => {
    const preco = Number(String(produto.price).replace(',', '.'));

    return Number.isFinite(preco) ? preco : 0;
  }, [produto.price]);

  // Atualiza qualquer campo do formulário de forma genérica.
  const setCampo = <K extends keyof LocacaoCarrinhoFormState>(
    campo: K,
    valor: LocacaoCarrinhoFormState[K],
  ) => {
    setForm((atual) => ({ ...atual, [campo]: valor }));
  };

  // Ao selecionar a data de entrega, calcula automaticamente
  // a data de devolução usando a duração escolhida anteriormente.
  const handleDataEntregaChange = (valor: string) => {
    setForm((atual) => {
      let dataDevolucao = atual.dataDevolucao;

      if (duracaoInicial && duracaoInicial > 0) {
        dataDevolucao = adicionarDias(valor, duracaoInicial);
      }

      return { ...atual, dataEntrega: valor, dataDevolucao };
    });
  };

  // Diminui a quantidade sem permitir valores menores que 1.
  const decrementarQuantidade = () =>
    setForm((atual) => ({
      ...atual,
      quantidade: Math.max(1, atual.quantidade - 1),
    }));

  // Aumenta a quantidade sem ultrapassar o estoque disponível.
  const incrementarQuantidade = () =>
    setForm((atual) => ({
      ...atual,
      quantidade: Math.min(
        produto.estoqueDisponivel,
        atual.quantidade + 1,
      ),
    }));

  // Calcula os valores e valida o período sempre que os dados do formulário
  // ou o preço do produto forem alterados.
  const resumo: ResumoLocacaoCarrinhoCalculado = useMemo(() => {
    const inicio = parseDataIso(form.dataEntrega);
    const fim = parseDataIso(form.dataDevolucao);

    // Calcula a diferença entre as datas em milissegundos.
    const diffMs =
      inicio && fim ? fim.getTime() - inicio.getTime() : 0;

    // Converte a diferença de milissegundos para dias.
    const diasBrutos = Math.round(
      diffMs / (1000 * 60 * 60 * 24),
    );

    // O período é válido somente quando a devolução ocorre depois da entrega.
    const periodoValido = Boolean(
      inicio && fim && diasBrutos > 0,
    );

    const diarias = periodoValido ? diasBrutos : 0;

    // Frete atualmente definido como valor fixo.
    const frete = FRETE_PADRAO;

    // Calcula o aluguel considerando diárias, preço diário e quantidade.
    const aluguel =
      diarias * precoDiaria * form.quantidade;

    // Soma aluguel e frete para obter o valor estimado.
    const valor = aluguel + frete;

    // Verifica se todos os campos obrigatórios estão preenchidos
    // e se o período selecionado é válido.
    const formularioCompleto = Boolean(
      form.dataEntrega &&
        form.horarioEntrega &&
        form.dataDevolucao &&
        form.horarioDevolucao &&
        form.quantidade > 0 &&
        periodoValido,
    );

    return {
      // Datas formatadas para exibição na interface.
      dataEntregaFormatada: formatarDataBr(form.dataEntrega),
      dataDevolucaoFormatada: formatarDataBr(form.dataDevolucao),

      // Horários formatados para exibição.
      entregaHorarioFormatado: form.horarioEntrega
        ? formatarIntervaloHorario(form.horarioEntrega)
        : '',

      devolucaoHorarioFormatado: form.horarioDevolucao
        ? formatarIntervaloHorario(form.horarioDevolucao)
        : '',

      diarias,
      periodoValido,

      // Exibe a quantidade com singular/plural correto.
      quantidadeFormatada: `${form.quantidade} ${
        form.quantidade === 1 ? 'unidade' : 'unidades'
      }`,

      aluguel,
      aluguelFormatado: formatarMoeda(aluguel),

      frete,
      freteFormatado: formatarMoeda(frete),

      valor,
      valorFormatado: formatarMoeda(valor),

      formularioCompleto,
    };
  }, [form, precoDiaria]);

  // Monta o objeto final com todos os dados necessários da locação.
  const montarDadosLocacao = (): DadosLocacaoCarrinho => ({
    produtoId: produto.id,
    dataEntrega: form.dataEntrega,
    horarioEntrega: form.horarioEntrega,
    dataDevolucao: form.dataDevolucao,
    horarioDevolucao: form.horarioDevolucao,
    quantidade: form.quantidade,
    resumo,
  });

  // Expõe apenas os estados e funções necessários para a tela.
  return {
    form,
    setCampo,
    handleDataEntregaChange,
    decrementarQuantidade,
    incrementarQuantidade,
    resumo,
    montarDadosLocacao,
  };
}