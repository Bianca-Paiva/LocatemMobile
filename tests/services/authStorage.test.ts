import AsyncStorage from '@react-native-async-storage/async-storage';
import { salvarSessao, carregarSessao, limparSessao } from '../../src/services/authStorage';
import type { Usuario } from '../../src/types/Auth/usuario.types';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

const CHAVE_SESSAO = '@locatemMobile:sessaoUsuario';

function criarUsuario(overrides: Partial<Usuario> = {}): Usuario {
  return {
    id: '1',
    nome: 'João Silva',
    email: 'joao@exemplo.com',
    senha: '',
    telefone: '11987654321',
    documento: '12345678900',
    endereco: 'Rua A, 100',
    tipo: 'locatario',
    tipoUsuario: 'Locatario',
    fotoUrl: '',
    emailVerificado: true,
    desde: 2024,
    reputacao: { rating: 0, totalAvaliacoes: 0, locacoesConcluidas: 0, entregasNoPrazoPercentual: 0 },
    ...overrides,
  } as Usuario;
}

beforeEach(async () => {
  await AsyncStorage.clear();
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('salvarSessao', () => {
  it('persiste o usuário serializado em JSON na chave correta', async () => {
    const usuario = criarUsuario();

    await salvarSessao(usuario);

    const bruto = await AsyncStorage.getItem(CHAVE_SESSAO);
    expect(JSON.parse(bruto!)).toEqual(usuario);
  });

  it('não lança exceção quando o AsyncStorage falha, apenas registra um warning', async () => {
    jest.spyOn(AsyncStorage, 'setItem').mockRejectedValueOnce(new Error('disco cheio'));

    await expect(salvarSessao(criarUsuario())).resolves.toBeUndefined();
    expect(console.warn).toHaveBeenCalled();
  });
});

describe('carregarSessao', () => {
  it('retorna null quando não há sessão salva', async () => {
    expect(await carregarSessao()).toBeNull();
  });

  it('retorna o usuário desserializado quando há uma sessão salva', async () => {
    const usuario = criarUsuario({ nome: 'Maria' });
    await AsyncStorage.setItem(CHAVE_SESSAO, JSON.stringify(usuario));

    expect(await carregarSessao()).toEqual(usuario);
  });

  it('retorna null e não lança exceção quando o AsyncStorage falha', async () => {
    jest.spyOn(AsyncStorage, 'getItem').mockRejectedValueOnce(new Error('falha de leitura'));

    expect(await carregarSessao()).toBeNull();
    expect(console.warn).toHaveBeenCalled();
  });

  it('propaga null quando o conteúdo salvo não é um JSON válido (lança e é capturado)', async () => {
    await AsyncStorage.setItem(CHAVE_SESSAO, '{json-invalido');

    expect(await carregarSessao()).toBeNull();
    expect(console.warn).toHaveBeenCalled();
  });
});

describe('limparSessao', () => {
  it('remove a sessão salva', async () => {
    await salvarSessao(criarUsuario());
    expect(await AsyncStorage.getItem(CHAVE_SESSAO)).not.toBeNull();

    await limparSessao();

    expect(await AsyncStorage.getItem(CHAVE_SESSAO)).toBeNull();
  });

  it('não lança exceção quando o AsyncStorage falha ao remover', async () => {
    jest.spyOn(AsyncStorage, 'removeItem').mockRejectedValueOnce(new Error('falha ao remover'));

    await expect(limparSessao()).resolves.toBeUndefined();
    expect(console.warn).toHaveBeenCalled();
  });
});

describe('round-trip', () => {
  it('salvarSessao seguido de carregarSessao retorna o mesmo usuário', async () => {
    const usuario = criarUsuario({ nome: 'Pedro', tipo: 'locador' });

    await salvarSessao(usuario);
    const recuperado = await carregarSessao();

    expect(recuperado).toEqual(usuario);
  });
});
