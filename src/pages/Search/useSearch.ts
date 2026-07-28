import { mockProducts } from "../../components/DadosMock/MockDados";


// ULTILIZAR MOCK PRODUCTS PARA TESTES, DEPOIS TROCAR PARA CHAMADA A API

// export async function buscarProdutos(nome: string) {
//     const response = await api.get(`/products?search=${nome}`);
//     return response.data;
// }

// FUNCAO PARA MOCK

export async function buscarProdutos(nome: string): Promise<typeof mockProducts> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const resultado = mockProducts.filter((produto) =>
                produto.title.toLowerCase().includes(nome.toLowerCase())
            );

            resolve(resultado);
        }, 500);
    });
}