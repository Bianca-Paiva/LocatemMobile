// Store em memória (sem AsyncStorage, sem backend) — como combinado, os dados
// somem quando o app fecha. Serve só pra testar o fluxo de cadastro ponta a ponta.
import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { CadastroFerramentaFormState } from '../pages/CadastroFerramenta/CadastroFerramenta.types';

export interface FerramentaCadastrada extends CadastroFerramentaFormState {
  id: string;
  criadaEm: string; // ISO string
}

interface FerramentasContextValue {
  ferramentas: FerramentaCadastrada[];
  adicionarFerramenta: (form: CadastroFerramentaFormState) => FerramentaCadastrada;
  removerFerramenta: (id: string) => void;
}

const FerramentasContext = createContext<FerramentasContextValue | null>(null);

export function FerramentasProvider({ children }: { children: ReactNode }) {
  const [ferramentas, setFerramentas] = useState<FerramentaCadastrada[]>([]);

  const adicionarFerramenta = (form: CadastroFerramentaFormState) => {
    const nova: FerramentaCadastrada = {
      ...form,
      id: `ferramenta-${Date.now()}`,
      criadaEm: new Date().toISOString(),
    };
    setFerramentas((atual) => [nova, ...atual]);
    return nova;
  };

  const removerFerramenta = (id: string) => {
    setFerramentas((atual) => atual.filter((f) => f.id !== id));
  };

  const value = useMemo(
    () => ({ ferramentas, adicionarFerramenta, removerFerramenta }),
    [ferramentas],
  );

  return <FerramentasContext.Provider value={value}>{children}</FerramentasContext.Provider>;
}

export function useFerramentas() {
  const ctx = useContext(FerramentasContext);
  if (!ctx) {
    throw new Error('useFerramentas precisa ser usado dentro de <FerramentasProvider>.');
  }
  return ctx;
}
