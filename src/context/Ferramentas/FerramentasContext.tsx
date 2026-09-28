// Contexto global de "Minhas Ferramentas".
// Guarda em memoria os anuncios do locador e sincroniza criacao,
// edicao e status com a API quando o usuario esta autenticado.
import React, {createContext, useContext, useState, useMemo, useEffect,} from 'react';
import type { ReactNode } from 'react';
import type { CadastroFerramentaFormState } from '../../pages/Ferramentas/CadastroFerramenta/types';
import {
  listarFerramentas,
  listarCategorias,
  cadastrarFerramenta,
  editarFerramenta as editarFerramentaApi,
  desativarFerramenta, ativarFerramenta,
} from '../../services/ferramentaService';

import { moedaParaNumero } from '../../utils/Formatacao/masks';
export type StatusFerramenta = 'ativa' | 'inativa';

export interface Ferramenta extends CadastroFerramentaFormState {
  id: string;
  status: StatusFerramenta;
  criadoEm: string;
}

interface FerramentasContextData {
  ferramentas: Ferramenta[];
  adicionarFerramenta: (form: CadastroFerramentaFormState) => void;
  editarFerramenta: (id: string, form: CadastroFerramentaFormState) => void;
  removerFerramenta: (id: string) => void;
  alternarStatusFerramenta: (id: string) => void;
  obterFerramenta: (id: string) => Ferramenta | undefined;
}

const FerramentasContext = createContext<FerramentasContextData | undefined>(
  undefined,
);

/** Compartilha a lista de ferramentas e suas operacoes de carregamento e atualizacao. */
export function FerramentasProvider({ children }: { children: ReactNode }) {
  const [ferramentas, setFerramentas] = useState<Ferramenta[]>([]);

  useEffect(() => {
    /** Busca as ferramentas do usuario e atualiza o estado de carregamento e erro. */
    async function carregarFerramentas() {
      try {
        const dados = await listarFerramentas();

console.log('FERRAMENTAS RECEBIDAS:', dados);

const ferramentasAtivas = dados.filter(  (item: any) => item.status === 1,);
const ferramentasConvertidas: Ferramenta[] = ferramentasAtivas.map((item: any) => ({

  id: String(item.ferramentaId),
  nome: item.nome ?? '',
  marca: item.marca ?? '',
  modelo: item.modelo ?? '',
  categoria: item.categoria?.nome ?? '',
  estadoConservacao: '',
  quantidadeDisponivel: 1,
  fonteAlimentacao: '',
  cep: '',
  ruaAvenida: '',
  numero: '',
  complemento: '',
  usarMesmoEnderecoDevolucao: true,
  cepDevolucao: '',
  ruaAvenidaDevolucao: '',
  numeroDevolucao: '',
  complementoDevolucao: '',
  descricao: item.descricao ?? '',
  especificacoes: [],
  fotos: item.imagens ?? [],
  valorDiaria: String(item.diaria ?? 0),
  caucao: String(item.caucao ?? 0),
  acessorios: item.acessorios
    ? item.acessorios.split(',').map((a: string) => a.trim())
    : [],
  tipoAprovacao: 'automatica',
  diasIndisponiveis: [],
  status: item.status === 1 ? 'ativa' : 'inativa',
  criadoEm: item.dataCadastro,
}));

setFerramentas(ferramentasConvertidas);
      } catch (erro) {
        console.error('ERRO AO CARREGAR FERRAMENTAS:', erro);
      }
    }

    carregarFerramentas();
  }, []);

  const adicionarFerramenta = async (
  form: CadastroFerramentaFormState,
) => {
  try {
    const categorias = await listarCategorias();

    const categoriaSelecionada = categorias.find(
      (categoria: { id: number; nome: string }) =>
        categoria.nome === form.categoria,
    );

    if (!categoriaSelecionada) {
      throw new Error(
        'A categoria selecionada não foi encontrada.',
      );
    }

    const nova = await cadastrarFerramenta({
      nome: form.nome,
      marca: form.marca,
      modelo: form.modelo,
      descricao: form.descricao,
      acessorios: form.acessorios,
      diaria: moedaParaNumero(form.valorDiaria),
      caucao: moedaParaNumero(form.caucao),
      categoriaId: Number(categoriaSelecionada.id),
    });

    const ferramentaNova: Ferramenta = {
      ...form,
      id: String(nova.ferramentaId),
      status: 'ativa',
      criadoEm: nova.dataCadastro ?? new Date().toISOString(),
    };

    setFerramentas((atual) => [
      ferramentaNova,
      ...atual,
    ]);
  } catch (erro) {
    console.error('ERRO AO CADASTRAR FERRAMENTA:', erro);
    throw erro;
  }
};

  const editarFerramenta = async (
  id: string,
  form: CadastroFerramentaFormState,
) => {
  try {
    // A API recebe categoria por ID; a tela trabalha com o nome exibido ao usuario.
    const categorias = await listarCategorias();

    const categoriaSelecionada = categorias.find(
      (categoria: { id: number; nome: string }) =>
        categoria.nome === form.categoria,
    );

    if (!categoriaSelecionada) {
      throw new Error(
        'A categoria selecionada não foi encontrada.',
      );
    }

    await editarFerramentaApi(id, {
      nome: form.nome,
      marca: form.marca,
      modelo: form.modelo,
      descricao: form.descricao,
      acessorios: form.acessorios,
      diaria: moedaParaNumero(form.valorDiaria),
      caucao: moedaParaNumero(form.caucao),
      categoriaId: Number(categoriaSelecionada.id),
    });

    // So atualiza a UI depois da API confirmar, evitando mostrar alteracao nao persistida.
    setFerramentas((atual) =>
      atual.map((f) =>
        f.id === id
          ? {
              ...f,
              ...form,
            }
          : f,
      ),
    );
  } catch (erro) {
    console.error('ERRO AO EDITAR FERRAMENTA:', erro);
    throw erro;
    
  }
};

/** Remove a ferramenta indicada da lista gerenciada pelo contexto. */
const removerFerramenta = async (id: string) => {
  try {
    // Na LOCATEM, remover anuncio significa desativar a ferramenta no backend.
    await desativarFerramenta(id);

    // Depois da confirmacao, o anuncio sai da lista ativa do locador.
    setFerramentas((atual) =>
      atual.filter((f) => f.id !== id),
    );
  } catch (erro) {
    console.error('ERRO AO REMOVER FERRAMENTA:', erro);
    throw erro;
  }
};

/** Alterna a disponibilidade da ferramenta indicada. */
const alternarStatusFerramenta = async (id: string) => {
  try {
    const ferramentaAtual = ferramentas.find((f) => f.id === id);

    if (!ferramentaAtual) {
      return;
    }

    if (ferramentaAtual.status === 'ativa') {
      await desativarFerramenta(id);
    } else {
      await ativarFerramenta(id);
    }

    setFerramentas((atual) =>
      atual.map((f) =>
        f.id === id
          ? {
              ...f,
              status: f.status === 'ativa' ? 'inativa' : 'ativa',
            }
          : f,
      ),
    );
  } catch (erro) {
    console.error('ERRO AO ALTERAR STATUS DA FERRAMENTA:', erro);
    throw erro;
  }
};

  /** Retorna a ferramenta correspondente ao identificador informado. */
  const obterFerramenta = (id: string) =>
    ferramentas.find((f) => f.id === id);

  const value = useMemo(
    () => ({
      ferramentas,
      adicionarFerramenta,
      editarFerramenta,
      removerFerramenta,
      alternarStatusFerramenta,
      obterFerramenta,
    }),
    [ferramentas],
  );

  return (
    <FerramentasContext.Provider value={value}>
      {children}
    </FerramentasContext.Provider>
  );
}

/** Retorna o contexto de ferramentas e valida se o provider foi montado. */
export function useFerramentas() {
  const context = useContext(FerramentasContext);

  if (!context) {
    throw new Error(
      'useFerramentas precisa ser usado dentro de um <FerramentasProvider>.',
    );
  }

  return context;
}
