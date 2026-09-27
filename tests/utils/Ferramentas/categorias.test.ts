import {
  extrairCategoriaTopo,
  extrairNomeSubcategoria,
  derivarCategorias,
  derivarMarcas,
} from '../../../src/utils/Ferramentas/Catalogo/categorias';
import type { Produto } from '../../../src/types/Ferramentas/produto.types';

function criarProduto(overrides: Partial<Produto> = {}): Produto {
  return {
    id: 1,
    title: 'Furadeira',
    marca: 'Bosch',
    price: '150,00',
    images: [],
    imageVerificado: {} as any,
    imageNota: {} as any,
    rating: 4,
    reviewCount: 10,
    locador: 'Loja A',
    localizacao: 'São Paulo, SP',
    categoria: 'Ferramentas Elétricas',
    estoqueDisponivel: 3,
    paymentMethods: [],
    available: true,
    ...overrides,
  };
}

describe('extrairCategoriaTopo', () => {
  it('extrai apenas a categoria de topo quando há subcategoria', () => {
    expect(extrairCategoriaTopo('Ferramentas Elétricas • Corte e Desgaste')).toBe('Ferramentas Elétricas');
  });

  it('retorna a própria string quando não há subcategoria', () => {
    expect(extrairCategoriaTopo('Jardinagem e Paisagismo')).toBe('Jardinagem e Paisagismo');
  });
});

describe('extrairNomeSubcategoria', () => {
  it('extrai apenas o rótulo da subcategoria', () => {
    expect(extrairNomeSubcategoria('Ferramentas Elétricas • Corte e Desgaste')).toBe('Corte e Desgaste');
  });

  it('retorna a própria string quando não há separador', () => {
    expect(extrairNomeSubcategoria('Jardinagem e Paisagismo')).toBe('Jardinagem e Paisagismo');
  });
});

describe('derivarCategorias', () => {
  it('agrupa produtos pela categoria de topo', () => {
    const produtos = [
      criarProduto({ id: 1, categoria: 'Ferramentas Elétricas • Corte e Desgaste' }),
      criarProduto({ id: 2, categoria: 'Ferramentas Elétricas • Pintura' }),
      criarProduto({ id: 3, categoria: 'Jardinagem e Paisagismo' }),
    ];

    const resultado = derivarCategorias(produtos);

    expect(resultado).toEqual([
      {
        categoria: 'Ferramentas Elétricas',
        subcategorias: ['Ferramentas Elétricas • Corte e Desgaste', 'Ferramentas Elétricas • Pintura'],
      },
      { categoria: 'Jardinagem e Paisagismo', subcategorias: [] },
    ]);
  });

  it('não duplica a mesma subcategoria vinda de produtos diferentes', () => {
    const produtos = [
      criarProduto({ id: 1, categoria: 'Ferramentas Elétricas • Corte e Desgaste' }),
      criarProduto({ id: 2, categoria: 'Ferramentas Elétricas • Corte e Desgaste' }),
    ];

    const resultado = derivarCategorias(produtos);

    expect(resultado).toHaveLength(1);
    expect(resultado[0].subcategorias).toHaveLength(1);
  });

  it('mantém a ordem em que as categorias aparecem no catálogo', () => {
    const produtos = [
      criarProduto({ id: 1, categoria: 'Jardinagem e Paisagismo' }),
      criarProduto({ id: 2, categoria: 'Ferramentas Elétricas • Pintura' }),
    ];

    const resultado = derivarCategorias(produtos);

    expect(resultado.map((c) => c.categoria)).toEqual(['Jardinagem e Paisagismo', 'Ferramentas Elétricas']);
  });

  it('retorna array vazio para catálogo vazio', () => {
    expect(derivarCategorias([])).toEqual([]);
  });
});

describe('derivarMarcas', () => {
  it('retorna marcas únicas na ordem em que aparecem', () => {
    const produtos = [
      criarProduto({ id: 1, marca: 'Bosch' }),
      criarProduto({ id: 2, marca: 'DeWalt' }),
      criarProduto({ id: 3, marca: 'Bosch' }),
    ];

    expect(derivarMarcas(produtos)).toEqual(['Bosch', 'DeWalt']);
  });

  it('retorna array vazio para catálogo vazio', () => {
    expect(derivarMarcas([])).toEqual([]);
  });
});
