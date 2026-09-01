import { PRODUTOS_MOCK } from "../../mocks/produtos.mock";
import { toProductCard } from "../../mocks/produtos.adapters";
import type { Product } from "../../components/ProductCard/types";


// ULTILIZAR MOCK PRODUCTS PARA TESTES, DEPOIS TROCAR PARA CHAMADA A API

// export async function buscarProdutos(nome: string) {
//     const response = await api.get(`/products?search=${nome}`);
//     return response.data;
// }

// FUNCAO PARA MOCK
// Busca agora roda sobre o catálogo real (PRODUTOS_MOCK), não mais sobre o
// mock desconectado de DadosMock — assim o `id` retornado bate com o do
// catálogo e a tela de detalhes consegue carregar o produto certo.

export async function buscarProdutos(nome: string): Promise<Product[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const resultado = PRODUTOS_MOCK
                .filter((produto) =>
                    produto.title.toLowerCase().includes(nome.toLowerCase())
                )
                .map(toProductCard);

            resolve(resultado);
        }, 500);
    });
}
