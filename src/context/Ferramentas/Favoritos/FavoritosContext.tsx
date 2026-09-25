import { createContext, useState } from 'react';
import type { ReactNode } from 'react';

/**
 * Estado global de favoritos (ferramentas salvas pelo usuário para alugar
 * depois). Espelha o padrão do `CarrinhoContext`: fonte única de verdade,
 * consumida tanto pelo botão de "curtir" nos cards de ferramenta (ex.:
 * `CardFerramentaLoja`) quanto pela tela "Meus Favoritos" (Conta > Favoritos),
 * assim favoritar em qualquer lugar do app reflete automaticamente na lista.
 */
interface FavoritosContextType {
  favoritos: number[];
  isFavorito: (id: number) => boolean;
  alternarFavorito: (id: number) => void;
  removerFavorito: (id: number) => void;
}

export const FavoritosContext = createContext<FavoritosContextType | null>(null);

export function FavoritosProvider({ children }: { children: ReactNode }) {
  const [favoritos, setFavoritos] = useState<number[]>([]);

  const isFavorito = (id: number) => favoritos.includes(id);

  const alternarFavorito = (id: number) => {
    setFavoritos((atuais) =>
      atuais.includes(id) ? atuais.filter((item) => item !== id) : [...atuais, id],
    );
  };

  const removerFavorito = (id: number) => {
    setFavoritos((atuais) => atuais.filter((item) => item !== id));
  };

  return (
    <FavoritosContext.Provider
      value={{ favoritos, isFavorito, alternarFavorito, removerFavorito }}
    >
      {children}
    </FavoritosContext.Provider>
  );
}
