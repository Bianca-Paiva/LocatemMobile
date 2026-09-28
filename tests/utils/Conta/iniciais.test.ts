/** Cenarios cobertos pelos testes de iniciais. */
import { getIniciais } from '../../../src/utils/Conta/Avatar/iniciais';

describe('getIniciais', () => {
  it('retorna a 1ª letra do primeiro e do último nome, em maiúsculo', () => {
    expect(getIniciais('João da Silva')).toBe('JS');
  });

  it('retorna as duas primeiras letras quando há apenas um nome', () => {
    expect(getIniciais('João')).toBe('JO');
  });

  it('lida com nome composto de duas palavras', () => {
    expect(getIniciais('Maria Oliveira')).toBe('MO');
  });

  it('ignora espaços extras no início/fim e entre palavras', () => {
    expect(getIniciais('  João   da   Silva  ')).toBe('JS');
  });

  it('retorna string vazia para entrada vazia', () => {
    expect(getIniciais('')).toBe('');
  });

  it('retorna sempre em maiúsculo mesmo se o nome vier em minúsculo', () => {
    expect(getIniciais('joão silva')).toBe('JS');
  });
});
