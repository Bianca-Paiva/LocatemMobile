// Contexto global de "Minhas Ferramentas".
// Guarda em memória as ferramentas do usuário
// e agora também carrega as ferramentas do backend.
import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from 'react';
import type { ReactNode } from 'react';
import type { CadastroFerramentaFormState } from '../../pages/Ferramentas/CadastroFerramenta/types';
import { listarFerramentas } from '../../services/ferramentaService';

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

export function FerramentasProvider({ children }: { children: ReactNode }) {
  const [ferramentas, setFerramentas] = useState<Ferramenta[]>([]);

  useEffect(() => {
    async function carregarFerramentas() {
      try {
        const dados = await listarFerramentas();

        console.log('FERRAMENTAS RECEBIDAS:', dados);

        setFerramentas(dados);
      } catch (erro) {
        console.error('ERRO AO CARREGAR FERRAMENTAS:', erro);
      }
    }

    carregarFerramentas();
  }, []);

  const adicionarFerramenta = (form: CadastroFerramentaFormState) => {
    const nova: Ferramenta = {
      ...form,
      id: `ferramenta-${Date.now()}`,
      status: 'ativa',
      criadoEm: new Date().toISOString(),
    };

    setFerramentas((atual) => [nova, ...atual]);
  };

  const editarFerramenta = (
    id: string,
    form: CadastroFerramentaFormState,
  ) => {
    setFerramentas((atual) =>
      atual.map((f) => (f.id === id ? { ...f, ...form } : f)),
    );
  };

  const removerFerramenta = (id: string) => {
    setFerramentas((atual) => atual.filter((f) => f.id !== id));
  };

  const alternarStatusFerramenta = (id: string) => {
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
  };

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

export function useFerramentas() {
  const context = useContext(FerramentasContext);

  if (!context) {
    throw new Error(
      'useFerramentas precisa ser usado dentro de um <FerramentasProvider>.',
    );
  }

  return context;
}