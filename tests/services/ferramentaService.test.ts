import {
  listarFerramentas,
  cadastrarFerramenta,
  listarCategorias,
  editarFerramenta,
  desativarFerramenta,
  ativarFerramenta,
} from '../../src/services/ferramentaService';
import * as authStorage from '../../src/services/authStorage';

jest.mock('../../src/services/authStorage', () => ({
  carregarSessao: jest.fn(),
  salvarSessao: jest.fn(),
  limparSessao: jest.fn(),
}));

const API_BASE_URL = 'http://10.0.2.2:5033';

function mockFetchOk(corpo: any) {
  global.fetch = jest.fn().mockResolvedValueOnce({
    ok: true,
    status: 200,
    statusText: 'OK',
    text: async () => JSON.stringify(corpo),
  });
}

function mockFetchErro(status: number, statusText: string, corpoTexto = '') {
  global.fetch = jest.fn().mockResolvedValueOnce({
    ok: false,
    status,
    statusText,
    text: async () => corpoTexto,
  });
}

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('listarFerramentas', () => {
  it('busca as ferramentas com o token da sessão no header Authorization', async () => {
    jest.spyOn(authStorage, 'carregarSessao').mockResolvedValueOnce({ token: 'abc123' } as any);
    mockFetchOk([{ id: 1, nome: 'Furadeira' }]);

    const resultado = await listarFerramentas();

    expect(global.fetch).toHaveBeenCalledWith(
      `${API_BASE_URL}/api/Ferramenta`,
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({ Authorization: 'Bearer abc123' }),
      }),
    );
    expect(resultado).toEqual([{ id: 1, nome: 'Furadeira' }]);
  });

  it('não envia Authorization quando não há sessão/token', async () => {
    jest.spyOn(authStorage, 'carregarSessao').mockResolvedValueOnce(null);
    mockFetchOk([]);

    await listarFerramentas();

    const [, opcoes] = (global.fetch as jest.Mock).mock.calls[0];
    expect(opcoes.headers.Authorization).toBeUndefined();
  });

  it('retorna array vazio quando a resposta não tem corpo', async () => {
    jest.spyOn(authStorage, 'carregarSessao').mockResolvedValueOnce(null);
    global.fetch = jest.fn().mockResolvedValueOnce({ ok: true, status: 200, statusText: 'OK', text: async () => '' });

    expect(await listarFerramentas()).toEqual([]);
  });

  it('lança erro com status e corpo da resposta quando a API falha', async () => {
    jest.spyOn(authStorage, 'carregarSessao').mockResolvedValueOnce(null);
    mockFetchErro(500, 'Internal Server Error', 'Falha no servidor');

    await expect(listarFerramentas()).rejects.toThrow('Erro 500: Falha no servidor');
  });

  it('usa o statusText quando o corpo do erro vem vazio', async () => {
    jest.spyOn(authStorage, 'carregarSessao').mockResolvedValueOnce(null);
    mockFetchErro(404, 'Not Found', '');

    await expect(listarFerramentas()).rejects.toThrow('Erro 404: Not Found');
  });
});

describe('cadastrarFerramenta', () => {
  const dados = {
    nome: 'Furadeira',
    marca: 'Bosch',
    modelo: 'X1',
    descricao: 'Furadeira de impacto',
    acessorios: ['broca'],
    diaria: 50,
    caucao: 200,
    categoriaId: 1,
  };

  it('lança erro quando não há usuário autenticado (sem token)', async () => {
    jest.spyOn(authStorage, 'carregarSessao').mockResolvedValueOnce(null);

    await expect(cadastrarFerramenta(dados)).rejects.toThrow('Usuário não autenticado.');
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('envia POST com o token e o corpo serializado', async () => {
    jest.spyOn(authStorage, 'carregarSessao').mockResolvedValueOnce({ token: 'tok1' } as any);
    mockFetchOk({ id: 1, ...dados });

    const resultado = await cadastrarFerramenta(dados);

    expect(global.fetch).toHaveBeenCalledWith(
      `${API_BASE_URL}/api/Ferramenta`,
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({ Authorization: 'Bearer tok1' }),
        body: JSON.stringify(dados),
      }),
    );
    expect(resultado).toEqual({ id: 1, ...dados });
  });

  it('retorna null quando a API responde sem corpo', async () => {
    jest.spyOn(authStorage, 'carregarSessao').mockResolvedValueOnce({ token: 'tok1' } as any);
    global.fetch = jest.fn().mockResolvedValueOnce({ ok: true, status: 201, statusText: 'Created', text: async () => '' });

    expect(await cadastrarFerramenta(dados)).toBeNull();
  });

  it('lança erro com o status e corpo quando a API rejeita o cadastro', async () => {
    jest.spyOn(authStorage, 'carregarSessao').mockResolvedValueOnce({ token: 'tok1' } as any);
    mockFetchErro(400, 'Bad Request', 'Categoria inválida');

    await expect(cadastrarFerramenta(dados)).rejects.toThrow('Erro 400: Categoria inválida');
  });
});

describe('listarCategorias', () => {
  it('retorna a lista de categorias da API', async () => {
    jest.spyOn(authStorage, 'carregarSessao').mockResolvedValueOnce({ token: 'tok' } as any);
    mockFetchOk([{ id: 1, nome: 'Ferramentas Elétricas' }]);

    expect(await listarCategorias()).toEqual([{ id: 1, nome: 'Ferramentas Elétricas' }]);
  });

  it('retorna array vazio quando a resposta vem sem corpo', async () => {
    jest.spyOn(authStorage, 'carregarSessao').mockResolvedValueOnce(null);
    global.fetch = jest.fn().mockResolvedValueOnce({ ok: true, status: 200, statusText: 'OK', text: async () => '' });

    expect(await listarCategorias()).toEqual([]);
  });

  it('lança erro quando a API falha', async () => {
    jest.spyOn(authStorage, 'carregarSessao').mockResolvedValueOnce(null);
    mockFetchErro(500, 'Internal Server Error', 'Erro interno');

    await expect(listarCategorias()).rejects.toThrow('Erro 500: Erro interno');
  });
});

describe('editarFerramenta', () => {
  const dados = {
    nome: 'Furadeira',
    marca: 'Bosch',
    modelo: 'X1',
    descricao: 'desc',
    acessorios: [],
    diaria: 50,
    caucao: 200,
    categoriaId: 1,
  };

  it('lança erro quando não há usuário autenticado', async () => {
    jest.spyOn(authStorage, 'carregarSessao').mockResolvedValueOnce(null);

    await expect(editarFerramenta('42', dados)).rejects.toThrow('Usuário não autenticado.');
  });

  it('envia PUT para o id correto com o token', async () => {
    jest.spyOn(authStorage, 'carregarSessao').mockResolvedValueOnce({ token: 'tok2' } as any);
    mockFetchOk({ ok: true });

    await editarFerramenta('42', dados);

    expect(global.fetch).toHaveBeenCalledWith(
      `${API_BASE_URL}/api/Ferramenta/42`,
      expect.objectContaining({
        method: 'PUT',
        headers: expect.objectContaining({ Authorization: 'Bearer tok2' }),
        body: JSON.stringify(dados),
      }),
    );
  });

  it('lança erro quando a API rejeita a edição', async () => {
    jest.spyOn(authStorage, 'carregarSessao').mockResolvedValueOnce({ token: 'tok2' } as any);
    mockFetchErro(403, 'Forbidden', 'Sem permissão');

    await expect(editarFerramenta('42', dados)).rejects.toThrow('Erro 403: Sem permissão');
  });
});

describe('desativarFerramenta / ativarFerramenta', () => {
  it('desativarFerramenta lança erro sem token', async () => {
    jest.spyOn(authStorage, 'carregarSessao').mockResolvedValueOnce(null);
    await expect(desativarFerramenta('7')).rejects.toThrow('Usuário não autenticado.');
  });

  it('desativarFerramenta envia PATCH para a rota /Desativar', async () => {
    jest.spyOn(authStorage, 'carregarSessao').mockResolvedValueOnce({ token: 'tok3' } as any);
    mockFetchOk({});

    await desativarFerramenta('7');

    expect(global.fetch).toHaveBeenCalledWith(
      `${API_BASE_URL}/api/Ferramenta/7/Desativar`,
      expect.objectContaining({ method: 'PATCH' }),
    );
  });

  it('ativarFerramenta lança erro sem token', async () => {
    jest.spyOn(authStorage, 'carregarSessao').mockResolvedValueOnce(null);
    await expect(ativarFerramenta('7')).rejects.toThrow('Usuário não autenticado.');
  });

  it('ativarFerramenta envia PATCH para a rota /Ativar', async () => {
    jest.spyOn(authStorage, 'carregarSessao').mockResolvedValueOnce({ token: 'tok4' } as any);
    mockFetchOk({});

    await ativarFerramenta('7');

    expect(global.fetch).toHaveBeenCalledWith(
      `${API_BASE_URL}/api/Ferramenta/7/Ativar`,
      expect.objectContaining({ method: 'PATCH' }),
    );
  });

  it('ativarFerramenta lança erro com status quando a API falha', async () => {
    jest.spyOn(authStorage, 'carregarSessao').mockResolvedValueOnce({ token: 'tok4' } as any);
    mockFetchErro(409, 'Conflict', 'Já está ativa');

    await expect(ativarFerramenta('7')).rejects.toThrow('Erro 409: Já está ativa');
  });
});
