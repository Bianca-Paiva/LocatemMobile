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