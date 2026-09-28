/**
 * Service local de busca usado pela SearchScreen enquanto a busca real
 * ainda usa o catalogo mockado do app.
 */
import { PRODUTOS_MOCK } from "../../mocks/produtos.mock";
import type { Produto } from "../../types/Ferramentas/produto.types";

/**
 * Simula uma chamada assincrona filtrando ferramentas pelo nome.
 * O delay preserva a experiencia de loading esperada na tela de busca.
 */
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
