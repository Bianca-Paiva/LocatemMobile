import { carregarSessao } from './authStorage';

const API_BASE_URL = 'http://10.0.2.2:5033';

export async function listarFerramentas() {
  const sessao = await carregarSessao();
  const token = sessao?.token;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  console.log('REQUISIÇÃO:', `${API_BASE_URL}/api/Ferramenta`);
  console.log('TOKEN EXISTE:', !!token);

  const resposta = await fetch(`${API_BASE_URL}/api/Ferramenta`, {
    method: 'GET',
    headers,
  });

  const texto = await resposta.text();

  console.log('STATUS:', resposta.status);
  console.log('RESPOSTA:', texto);

  if (!resposta.ok) {
    throw new Error(
      `Erro ${resposta.status}: ${texto || resposta.statusText}`,
    );
  }

  if (!texto) {
    return [];
  }

  return JSON.parse(texto);
}

export async function cadastrarFerramenta(dados: {
  nome: string;
  marca: string;
  modelo: string;
  descricao: string;
  acessorios: string[];
  diaria: number;
  caucao: number;
  categoriaId: number;
}) {
  const sessao = await carregarSessao();
  const token = sessao?.token;

  if (!token) {
    throw new Error('Usuário não autenticado.');
  }

  const resposta = await fetch(`${API_BASE_URL}/api/Ferramenta`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dados),
  });

  const texto = await resposta.text();

  console.log('CADASTRO FERRAMENTA - STATUS:', resposta.status);
  console.log('CADASTRO FERRAMENTA - RESPOSTA:', texto);

  if (!resposta.ok) {
    throw new Error(
      `Erro ${resposta.status}: ${texto || resposta.statusText}`,
    );
  }

  if (!texto) {
    return null;
  }

  return JSON.parse(texto);
}

export async function listarCategorias() {
  const sessao = await carregarSessao();
  const token = sessao?.token;

  const resposta = await fetch(`${API_BASE_URL}/api/Categoria`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const texto = await resposta.text();

  console.log('CATEGORIAS - STATUS:', resposta.status);
  console.log('CATEGORIAS - RESPOSTA:', texto);

  if (!resposta.ok) {
    throw new Error(
      `Erro ${resposta.status}: ${texto || resposta.statusText}`,
    );
  }

  if (!texto) {
    return [];
  }

  return JSON.parse(texto);
}

export async function editarFerramenta(
  id: string,
  dados: {
    nome: string;
    marca: string;
    modelo: string;
    descricao: string;
    acessorios: string[];
    diaria: number;
    caucao: number;
    categoriaId: number;
  },
) {
  const sessao = await carregarSessao();
  const token = sessao?.token;

  if (!token) {
    throw new Error('Usuário não autenticado.');
  }

  const resposta = await fetch(
    `${API_BASE_URL}/api/Ferramenta/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dados),
    },
  );

  const texto = await resposta.text();

  console.log('EDIÇÃO FERRAMENTA - STATUS:', resposta.status);
  console.log('EDIÇÃO FERRAMENTA - RESPOSTA:', texto);

  if (!resposta.ok) {
    throw new Error(
      `Erro ${resposta.status}: ${texto || resposta.statusText}`,
    );
  }

 return texto;
}

export async function desativarFerramenta(id: string) {
  const sessao = await carregarSessao();
  const token = sessao?.token;

  if (!token) {
    throw new Error('Usuário não autenticado.');
  }

  const resposta = await fetch(
    `${API_BASE_URL}/api/Ferramenta/${id}/Desativar`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const texto = await resposta.text();

  console.log('DESATIVAR FERRAMENTA - STATUS:', resposta.status);
  console.log('DESATIVAR FERRAMENTA - RESPOSTA:', texto);

  if (!resposta.ok) {
    throw new Error(
      `Erro ${resposta.status}: ${texto || resposta.statusText}`,
    );
  }

  return texto;
}