/** Cenarios cobertos pelos testes de ferramentaService. */
import {
  listarFerramentas,
  cadastrarFerramenta,
  listarCategorias,
  editarFerramenta,
  desativarFerramenta,
  ativarFerramenta,
} from "../../src/services/ferramentaService";
import * as authStorage from "../../src/services/authStorage";

jest.mock("../../src/services/authStorage", () => ({
  carregarSessao: jest.fn(),
  salvarSessao: jest.fn(),
  limparSessao: jest.fn(),
}));

const API_BASE_URL = "http://10.0.2.2:5033";

const carregarSessaoMock = authStorage.carregarSessao as jest.Mock;
const fetchMock = () => (globalThis as any).fetch as jest.Mock;

/** Simula uma sessao com o token informado, ou sem token quando null. */
function comSessao(token: string | null) {
  carregarSessaoMock.mockResolvedValueOnce(token ? { token } : null);
}

/** Configura uma resposta de rede bem-sucedida com o corpo informado. */
function mockFetchOk(corpo: any, status = 200, statusText = "OK") {
  (globalThis as any).fetch = jest.fn().mockResolvedValueOnce({
    ok: true,
    status,
    statusText,
    text: async () => JSON.stringify(corpo),
  });
}

/** Configura uma resposta bem-sucedida sem conteudo. */
function mockFetchSemCorpo(status = 200, statusText = "OK") {
  (globalThis as any).fetch = jest.fn().mockResolvedValueOnce({
    ok: true,
    status,
    statusText,
    text: async () => "",
  });
}

/** Configura uma resposta de erro com status e corpo informados. */
function mockFetchErro(status: number, statusText: string, corpoTexto = "") {
  (globalThis as any).fetch = jest.fn().mockResolvedValueOnce({
    ok: false,
    status,
    statusText,
    text: async () => corpoTexto,
  });
}

beforeEach(() => {
  // resetAllMocks limpa também as filas de mockResolvedValueOnce que
  // sobrarem de testes anteriores (clearAllMocks não faz isso).
  jest.resetAllMocks();
  // fetch sempre definido, para que expects como `not.toHaveBeenCalled()`
  // funcionem mesmo quando o teste roda isolado.
  (globalThis as any).fetch = jest.fn();
  jest.spyOn(console, "log").mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("listarFerramentas", () => {
  it("busca as ferramentas com o token da sessão no header Authorization", async () => {
    comSessao("abc123");
    mockFetchOk([{ id: 1, nome: "Furadeira" }]);

    const resultado = await listarFerramentas();

    expect(fetchMock()).toHaveBeenCalledWith(
      `${API_BASE_URL}/api/Ferramenta`,
      expect.objectContaining({
        method: "GET",
        headers: expect.objectContaining({ Authorization: "Bearer abc123" }),
      }),
    );
    expect(resultado).toEqual([{ id: 1, nome: "Furadeira" }]);
  });

  it("não envia Authorization quando não há sessão/token", async () => {
    comSessao(null);
    mockFetchOk([]);

    await listarFerramentas();

    const [, opcoes] = fetchMock().mock.calls[0];
    expect(opcoes.headers.Authorization).toBeUndefined();
  });

  it("retorna array vazio quando a resposta não tem corpo", async () => {
    comSessao(null);
    mockFetchSemCorpo();

    expect(await listarFerramentas()).toEqual([]);
  });

  it("lança erro com status e corpo da resposta quando a API falha", async () => {
    comSessao(null);
    mockFetchErro(500, "Internal Server Error", "Falha no servidor");

    await expect(listarFerramentas()).rejects.toThrow(
      "Erro 500: Falha no servidor",
    );
  });

  it("usa o statusText quando o corpo do erro vem vazio", async () => {
    comSessao(null);
    mockFetchErro(404, "Not Found", "");

    await expect(listarFerramentas()).rejects.toThrow("Erro 404: Not Found");
  });
});

describe("cadastrarFerramenta", () => {
  const dados = {
    nome: "Furadeira",
    marca: "Bosch",
    modelo: "X1",
    descricao: "Furadeira de impacto",
    acessorios: ["broca"],
    diaria: 50,
    caucao: 200,
    categoriaId: 1,
  };

  it("lança erro quando não há usuário autenticado (sem token)", async () => {
    comSessao(null);

    await expect(cadastrarFerramenta(dados)).rejects.toThrow(
      "Usuário não autenticado.",
    );
    expect(fetchMock()).not.toHaveBeenCalled();
  });

  it("envia POST com o token e o corpo serializado", async () => {
    comSessao("tok1");
    mockFetchOk({ id: 1, ...dados });

    const resultado = await cadastrarFerramenta(dados);

    expect(fetchMock()).toHaveBeenCalledWith(
      `${API_BASE_URL}/api/Ferramenta`,
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({ Authorization: "Bearer tok1" }),
        body: JSON.stringify(dados),
      }),
    );
    expect(resultado).toEqual({ id: 1, ...dados });
  });

  it("retorna null quando a API responde sem corpo", async () => {
    comSessao("tok1");
    mockFetchSemCorpo(201, "Created");

    expect(await cadastrarFerramenta(dados)).toBeNull();
  });

  it("lança erro com o status e corpo quando a API rejeita o cadastro", async () => {
    comSessao("tok1");
    mockFetchErro(400, "Bad Request", "Categoria inválida");

    await expect(cadastrarFerramenta(dados)).rejects.toThrow(
      "Erro 400: Categoria inválida",
    );
  });
});

describe("listarCategorias", () => {
  it("retorna a lista de categorias da API", async () => {
    comSessao("tok");
    mockFetchOk([{ id: 1, nome: "Ferramentas Elétricas" }]);

    expect(await listarCategorias()).toEqual([
      { id: 1, nome: "Ferramentas Elétricas" },
    ]);
  });

  it("retorna array vazio quando a resposta vem sem corpo", async () => {
    comSessao(null);
    mockFetchSemCorpo();

    expect(await listarCategorias()).toEqual([]);
  });

  it("lança erro quando a API falha", async () => {
    comSessao(null);
    mockFetchErro(500, "Internal Server Error", "Erro interno");

    await expect(listarCategorias()).rejects.toThrow("Erro 500: Erro interno");
  });
});

describe("editarFerramenta", () => {
  const dados = {
    nome: "Furadeira",
    marca: "Bosch",
    modelo: "X1",
    descricao: "desc",
    acessorios: [] as string[],
    diaria: 50,
    caucao: 200,
    categoriaId: 1,
  };

  it("lança erro quando não há usuário autenticado", async () => {
    comSessao(null);

    await expect(editarFerramenta("42", dados)).rejects.toThrow(
      "Usuário não autenticado.",
    );
    expect(fetchMock()).not.toHaveBeenCalled();
  });

  it("envia PUT para o id correto com o token", async () => {
    comSessao("tok2");
    mockFetchOk({ ok: true });

    await editarFerramenta("42", dados);

    expect(fetchMock()).toHaveBeenCalledWith(
      `${API_BASE_URL}/api/Ferramenta/42`,
      expect.objectContaining({
        method: "PUT",
        headers: expect.objectContaining({ Authorization: "Bearer tok2" }),
        body: JSON.stringify(dados),
      }),
    );
  });

  it("lança erro quando a API rejeita a edição", async () => {
    comSessao("tok2");
    mockFetchErro(403, "Forbidden", "Sem permissão");

    await expect(editarFerramenta("42", dados)).rejects.toThrow(
      "Erro 403: Sem permissão",
    );
  });
});

describe("desativarFerramenta / ativarFerramenta", () => {
  it("desativarFerramenta lança erro sem token", async () => {
    comSessao(null);

    await expect(desativarFerramenta("7")).rejects.toThrow(
      "Usuário não autenticado.",
    );
    expect(fetchMock()).not.toHaveBeenCalled();
  });

  it("desativarFerramenta envia PATCH para a rota /Desativar", async () => {
    comSessao("tok3");
    mockFetchOk({});

    await desativarFerramenta("7");

    expect(fetchMock()).toHaveBeenCalledWith(
      `${API_BASE_URL}/api/Ferramenta/7/Desativar`,
      expect.objectContaining({
        method: "PATCH",
        headers: expect.objectContaining({ Authorization: "Bearer tok3" }),
      }),
    );
  });

  it("ativarFerramenta lança erro sem token", async () => {
    comSessao(null);

    await expect(ativarFerramenta("7")).rejects.toThrow(
      "Usuário não autenticado.",
    );
    expect(fetchMock()).not.toHaveBeenCalled();
  });

  it("ativarFerramenta envia PATCH para a rota /Ativar", async () => {
    comSessao("tok4");
    mockFetchOk({});

    await ativarFerramenta("7");

    expect(fetchMock()).toHaveBeenCalledWith(
      `${API_BASE_URL}/api/Ferramenta/7/Ativar`,
      expect.objectContaining({
        method: "PATCH",
        headers: expect.objectContaining({ Authorization: "Bearer tok4" }),
      }),
    );
  });

  it("ativarFerramenta lança erro com status quando a API falha", async () => {
    comSessao("tok4");
    mockFetchErro(409, "Conflict", "Já está ativa");

    await expect(ativarFerramenta("7")).rejects.toThrow(
      "Erro 409: Já está ativa",
    );
  });
});
