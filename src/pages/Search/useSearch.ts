import { PRODUTOS_MOCK } from "../../mocks/produtos.mock";
import type { Produto } from "../../types/produto.types";

export async function buscarProdutos(
  nome: string
): Promise<Produto[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const resultado = PRODUTOS_MOCK.filter((produto) =>
        produto.title.toLowerCase().includes(nome.toLowerCase())
      );

      resolve(resultado);
    }, 500);
  });
}
