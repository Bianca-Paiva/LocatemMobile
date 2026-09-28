/** Cenarios cobertos pelos testes de masks. */
import {
  maskCEP,
  maskMoeda,
  moedaParaNumero,
  maskCPF,
  maskCNPJ,
  maskPhone,
  validateCEP,
  validateFullName,
  validatePhone,
  validateDocument,
  maskNumeroCartao,
  detectarBandeiraCartao,
  nomeBandeiraCartao,
  maskValidadeCartao,
  validateValidadeCartao,
  maskCVV,
} from '../../../src/utils/Formatacao/masks';

describe('maskCEP', () => {
  it('formata progressivamente até 8 dígitos', () => {
    expect(maskCEP('012')).toBe('012');
    expect(maskCEP('01234')).toBe('01234');
    expect(maskCEP('012345')).toBe('01234-5');
    expect(maskCEP('01234567')).toBe('01234-567');
  });

  it('remove caracteres não numéricos', () => {
    expect(maskCEP('01234-567')).toBe('01234-567');
    expect(maskCEP('abc01234567def')).toBe('01234-567');
  });

  it('ignora dígitos além do 8º', () => {
    expect(maskCEP('012345678999')).toBe('01234-567');
  });
});

describe('maskMoeda', () => {
  it('mantém apenas números e vírgula', () => {
    expect(maskMoeda('R$ 45,00')).toBe('45,00');
  });

  it('limita a 2 casas decimais após a vírgula', () => {
    expect(maskMoeda('45,12345')).toBe('45,12');
  });

  it('retorna string sem vírgula quando não houver parte decimal', () => {
    expect(maskMoeda('4500')).toBe('4500');
  });

  it('junta múltiplas vírgulas na parte decimal (usa a primeira como separador)', () => {
    expect(maskMoeda('45,1,2')).toBe('45,12');
  });
});

describe('moedaParaNumero', () => {
  it('converte "45,00" para 45', () => {
    expect(moedaParaNumero('45,00')).toBe(45);
  });

  it('remove pontos de milhar e converte vírgula em ponto decimal', () => {
    expect(moedaParaNumero('1.234,56')).toBe(1234.56);
  });

  it('retorna 0 para string vazia', () => {
    expect(moedaParaNumero('')).toBe(0);
  });

  it('retorna 0 para valor inválido', () => {
    expect(moedaParaNumero('abc')).toBe(0);
  });
});

describe('maskCPF', () => {
  it('aplica a máscara progressivamente', () => {
    expect(maskCPF('123')).toBe('123');
    expect(maskCPF('1234')).toBe('123.4');
    expect(maskCPF('123456')).toBe('123.456');
    expect(maskCPF('1234567')).toBe('123.456.7');
    expect(maskCPF('12345678910')).toBe('123.456.789-10');
  });

  it('limita a 11 dígitos', () => {
    expect(maskCPF('123456789109999')).toBe('123.456.789-10');
  });

  it('remove caracteres não numéricos antes de mascarar', () => {
    expect(maskCPF('123.456.789-10')).toBe('123.456.789-10');
  });
});

describe('maskCNPJ', () => {
  it('aplica a máscara completa', () => {
    expect(maskCNPJ('12345678000199')).toBe('12.345.678/0001-99');
  });

  it('limita a 14 dígitos', () => {
    expect(maskCNPJ('123456780001999999')).toBe('12.345.678/0001-99');
  });

  it('aplica a máscara progressivamente enquanto digita', () => {
    expect(maskCNPJ('12')).toBe('12');
    expect(maskCNPJ('123')).toBe('12.3');
    expect(maskCNPJ('123456')).toBe('12.345.6');
  });
});

describe('maskPhone', () => {
  it('formata celular com DDD (11 dígitos)', () => {
    expect(maskPhone('11987654321')).toBe('(11) 98765-4321');
  });

  it('limita a 11 dígitos', () => {
    expect(maskPhone('119876543219999')).toBe('(11) 98765-4321');
  });

  it('remove caracteres não numéricos', () => {
    expect(maskPhone('(11) 98765-4321')).toBe('(11) 98765-4321');
  });
});

describe('validateCEP', () => {
  it('valida CEP com 8 dígitos, com ou sem máscara', () => {
    expect(validateCEP('01234-567')).toBe(true);
    expect(validateCEP('01234567')).toBe(true);
  });

  it('invalida CEP com menos ou mais de 8 dígitos', () => {
    expect(validateCEP('1234567')).toBe(false);
    expect(validateCEP('123456789')).toBe(false);
    expect(validateCEP('')).toBe(false);
  });
});

describe('validateFullName', () => {
  it('valida nome com pelo menos 2 palavras de 2+ letras', () => {
    expect(validateFullName('João Silva')).toBe(true);
  });

  it('invalida nome com apenas uma palavra', () => {
    expect(validateFullName('João')).toBe(false);
  });

  it('invalida quando alguma palavra tem menos de 2 letras', () => {
    expect(validateFullName('João A')).toBe(false);
  });

  it('ignora espaços extras entre e nas pontas do nome', () => {
    expect(validateFullName('  João   Silva  ')).toBe(true);
  });

  it('invalida string vazia', () => {
    expect(validateFullName('')).toBe(false);
  });
});

describe('validatePhone', () => {
  it('aceita 10 dígitos (fixo com DDD)', () => {
    expect(validatePhone('1132345678')).toBe(true);
  });

  it('aceita 11 dígitos (celular com DDD)', () => {
    expect(validatePhone('11987654321')).toBe(true);
  });

  it('rejeita quantidade de dígitos diferente de 10 ou 11', () => {
    expect(validatePhone('123456789')).toBe(false);
    expect(validatePhone('123456789012')).toBe(false);
  });

  it('ignora máscara ao validar', () => {
    expect(validatePhone('(11) 98765-4321')).toBe(true);
  });
});

describe('validateDocument', () => {
  it('valida CPF com 11 dígitos quando isCNPJ é false', () => {
    expect(validateDocument('123.456.789-10', false)).toBe(true);
    expect(validateDocument('123.456.789-1', false)).toBe(false);
  });

  it('valida CNPJ com 14 dígitos quando isCNPJ é true', () => {
    expect(validateDocument('12.345.678/0001-99', true)).toBe(true);
    expect(validateDocument('12.345.678/0001-9', true)).toBe(false);
  });
});

describe('cartão — máscaras e bandeira', () => {
  describe('maskNumeroCartao', () => {
    it('agrupa em blocos de 4 dígitos', () => {
      expect(maskNumeroCartao('4111111111111111')).toBe('4111 1111 1111 1111');
    });

    it('limita a 16 dígitos', () => {
      expect(maskNumeroCartao('41111111111111119999')).toBe('4111 1111 1111 1111');
    });

    it('não deixa espaço sobrando no final ao digitar parcialmente', () => {
      expect(maskNumeroCartao('41111111')).toBe('4111 1111');
    });
  });

  describe('detectarBandeiraCartao', () => {
    it('detecta Visa (inicia com 4)', () => {
      expect(detectarBandeiraCartao('4111111111111111')).toBe('VISA');
    });

    it('detecta Mastercard (51-55)', () => {
      expect(detectarBandeiraCartao('5500000000000004')).toBe('MASTER');
    });

    it('detecta Mastercard na nova faixa (2221-2720)', () => {
      expect(detectarBandeiraCartao('2223000048400011')).toBe('MASTER');
    });

    it('detecta American Express (34 ou 37)', () => {
      expect(detectarBandeiraCartao('340000000000009')).toBe('AMEX');
      expect(detectarBandeiraCartao('370000000000002')).toBe('AMEX');
    });

    it('detecta Discover (6011 ou 65)', () => {
      expect(detectarBandeiraCartao('6011000000000004')).toBe('DISCOVER');
      expect(detectarBandeiraCartao('6500000000000002')).toBe('DISCOVER');
    });

    it('detecta Elo por prefixos conhecidos', () => {
      expect(detectarBandeiraCartao('6362970000457013')).toBe('ELO');
    });

    it('detecta Diners (300-305, 36, 38)', () => {
      expect(detectarBandeiraCartao('30000000000004')).toBe('DINERS');
      expect(detectarBandeiraCartao('36000000000008')).toBe('DINERS');
    });

    it('retorna string vazia para número não reconhecido', () => {
      expect(detectarBandeiraCartao('0000000000000000')).toBe('');
    });

    it('ignora espaços/máscara ao detectar', () => {
      expect(detectarBandeiraCartao('4111 1111 1111 1111')).toBe('VISA');
    });
  });

  describe('nomeBandeiraCartao', () => {
    it('retorna o nome de exibição de cada bandeira', () => {
      expect(nomeBandeiraCartao('VISA')).toBe('Visa');
      expect(nomeBandeiraCartao('MASTER')).toBe('Mastercard');
      expect(nomeBandeiraCartao('AMEX')).toBe('American Express');
      expect(nomeBandeiraCartao('ELO')).toBe('Elo');
      expect(nomeBandeiraCartao('DISCOVER')).toBe('Discover');
      expect(nomeBandeiraCartao('DINERS')).toBe('Diners');
    });

    it('retorna "Cartão" como fallback quando não há bandeira detectada', () => {
      expect(nomeBandeiraCartao('')).toBe('Cartão');
    });
  });

  describe('maskValidadeCartao', () => {
    it('insere a barra após o mês (2 dígitos)', () => {
      expect(maskValidadeCartao('1225')).toBe('12/25');
    });

    it('não insere barra com menos de 3 dígitos', () => {
      expect(maskValidadeCartao('1')).toBe('1');
      expect(maskValidadeCartao('12')).toBe('12');
    });

    it('limita a 4 dígitos', () => {
      expect(maskValidadeCartao('122599')).toBe('12/25');
    });
  });

  describe('validateValidadeCartao', () => {
    const anoAtual = new Date().getFullYear() % 100;
    const mesAtual = new Date().getMonth() + 1;

    it('rejeita formato com tamanho diferente de 5 (MM/AA)', () => {
      expect(validateValidadeCartao('1/25')).toBe(false);
      expect(validateValidadeCartao('')).toBe(false);
    });

    it('rejeita mês inválido (0 ou maior que 12)', () => {
      expect(validateValidadeCartao('00/30')).toBe(false);
      expect(validateValidadeCartao('13/30')).toBe(false);
    });

    it('aceita uma validade futura', () => {
      expect(validateValidadeCartao('12/99')).toBe(true);
    });

    it('rejeita uma validade já vencida', () => {
      expect(validateValidadeCartao('01/20')).toBe(false);
    });

    it('aceita o mês/ano atual (ainda não vencido)', () => {
      const mesFormatado = String(mesAtual).padStart(2, '0');
      const anoFormatado = String(anoAtual).padStart(2, '0');
      expect(validateValidadeCartao(`${mesFormatado}/${anoFormatado}`)).toBe(true);
    });
  });

  describe('maskCVV', () => {
    it('mantém apenas números e limita a 3 dígitos', () => {
      expect(maskCVV('12a3b45')).toBe('123');
    });

    it('aceita menos de 3 dígitos durante a digitação', () => {
      expect(maskCVV('1')).toBe('1');
    });
  });
});
