import { useMemo, useState } from 'react';

import type {
  ChaveSubAvaliacao,
  ProdutoAvaliacao,
} from '../../pages/Avaliacao/Avaliacao.types';

import { produtosAvaliacaoMock } from '../../pages/Avaliacao/Avaliacao.mock';

import { obterLogoLocador } from '../../pages/Avaliacao/logoLocador';

import type {
  ReservaData,
} from '../../pages/Reservas/MinhasReservas/MinhasReservas.types';

const DURACAO_TOAST_MS = 3000;

/**
 * Converte uma reserva finalizada
 * para um ProdutoAvaliacao.
 */
function criarProdutoAvaliacaoAPartirDaReserva(
  reserva: ReservaData
): ProdutoAvaliacao {
  return {
    id: reserva.id,

    nome: reserva.produto,

    dataLocacao: `Locado em ${reserva.periodo}`,

    imagem: reserva.imagem,

    status: 'pendente',

    notaGlobal: 0,

    subAvaliacoes: {
      locador: 0,
      entrega: 0,
      produto: 0,
    },

    observacao: '',

    loja: {
      nome: reserva.locador,
      logo: obterLogoLocador(
        reserva.locador
      ),
    },
  };
}

export function useAvaliacoes() {
  const [produtos, setProdutos] =
    useState<ProdutoAvaliacao[]>(
      produtosAvaliacaoMock
    );

  const [idAtual, setIdAtual] =
    useState<string | null>(null);

  const [
    observacaoRascunho,
    setObservacaoRascunho,
  ] = useState('');

  const [
    camposComErro,
    setCamposComErro,
  ] = useState<ChaveSubAvaliacao[]>(
    []
  );

  const [erroVisivel, setErroVisivel] =
    useState(false);

  const [
    toastVisivel,
    setToastVisivel,
  ] = useState(false);

  /**
   * Produtos pendentes.
   */
  const produtosPendentes =
    useMemo(
      () =>
        produtos.filter(
          (produto) =>
            produto.status ===
            'pendente'
        ),
      [produtos]
    );

  /**
   * Produtos realizados.
   */
  const produtosRealizados =
    useMemo(
      () =>
        produtos.filter(
          (produto) =>
            produto.status ===
            'realizada'
        ),
      [produtos]
    );

  /**
   * Produto aberto no modal.
   */
  const produtoAtual =
    useMemo(
      () =>
        produtos.find(
          (produto) =>
            produto.id === idAtual
        ) ?? null,
      [produtos, idAtual]
    );

  /**
   * Outros produtos exibidos no carrossel.
   */
  const itensCarrossel =
    useMemo(
      () =>
        produtos.filter(
          (produto) =>
            produto.status ===
              'pendente' &&
            produto.id !== idAtual
        ),
      [produtos, idAtual]
    );

  /**
   * Abre o modal.
   */
  function abrirModal(id: string) {
    const produto = produtos.find(
      (produto) =>
        produto.id === id
    );

    setIdAtual(id);

    setObservacaoRascunho(
      produto?.observacao ?? ''
    );

    setCamposComErro([]);

    setErroVisivel(false);
  }

  /**
   * Inicia avaliação vinda da reserva.
   */
  function iniciarAvaliacaoDaReserva(
    reserva: ReservaData
  ) {
    setProdutos((atual) => {
      const jaExiste = atual.some(
        (produto) =>
          produto.id === reserva.id
      );

      return jaExiste
        ? atual
        : [
            criarProdutoAvaliacaoAPartirDaReserva(
              reserva
            ),
            ...atual,
          ];
    });

    setIdAtual(reserva.id);
  }

  /**
   * Fecha modal.
   */
  function fecharModal() {
    setIdAtual(null);

    setObservacaoRascunho('');

    setCamposComErro([]);

    setErroVisivel(false);
  }

  /**
   * Avaliação rápida via estrelas do card.
   */
  function selecionarNotaGlobalEAbrir(
    id: string,
    valor: number
  ) {
    setProdutos((atual) =>
      atual.map((produto) =>
        produto.id === id
          ? {
              ...produto,
              notaGlobal: valor,
            }
          : produto
      )
    );

    abrirModal(id);
  }

  /**
   * Define nota de locador,
   * entrega ou produto.
   */
  function selecionarSubNota(
    chave: ChaveSubAvaliacao,
    valor: number
  ) {
    if (idAtual === null) {
      return;
    }

    setProdutos((atual) =>
      atual.map((produto) =>
        produto.id === idAtual
          ? {
              ...produto,

              subAvaliacoes: {
                ...produto.subAvaliacoes,

                valor,
              },
            }
          : produto
      )
    );

    setCamposComErro((atual) =>
      atual.filter(
        (campo) => campo !== chave
      )
    );
  }

  /**
   * Verifica campos obrigatórios.
   */
  function validarSubNotas(
    produto: ProdutoAvaliacao
  ): ChaveSubAvaliacao[] {
    return (
      Object.keys(
        produto.subAvaliacoes
      ) as ChaveSubAvaliacao[]
    ).filter(
      (chave) =>
        produto.subAvaliacoes[
          chave
        ] === 0
    );
  }

  /**
   * Envia avaliação.
   */
  function enviarAvaliacao() {
    if (!produtoAtual) {
      return;
    }

    const faltando =
      validarSubNotas(
        produtoAtual
      );

    if (faltando.length > 0) {
      setCamposComErro(
        faltando
      );

      setErroVisivel(true);

      return;
    }

    const notas =
      Object.values(
        produtoAtual
          .subAvaliacoes
      );

    const media =
      Math.round(
        notas.reduce(
          (a, b) => a + b,
          0
        ) / notas.length
      );

    setProdutos((atual) =>
      atual.map((produto) =>
        produto.id ===
        produtoAtual.id
          ? {
              ...produto,

              notaGlobal: media,

              observacao:
                observacaoRascunho,

              status:
                'realizada',
            }
          : produto
      )
    );

    fecharModal();

    exibirToast();
  }

  /**
   * Toast de sucesso.
   */
  function exibirToast() {
    setToastVisivel(true);

    setTimeout(() => {
      setToastVisivel(false);
    }, DURACAO_TOAST_MS);
  }

  return {
    produtosPendentes,
    produtosRealizados,

    produtoAtual,
    itensCarrossel,

    observacaoRascunho,

    camposComErro,
    erroVisivel,

    toastVisivel,

    setObservacaoRascunho,

    abrirModal,

    iniciarAvaliacaoDaReserva,

    fecharModal,

    selecionarNotaGlobalEAbrir,

    selecionarSubNota,

    enviarAvaliacao,
  };
}