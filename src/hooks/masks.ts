// Máscaras reaproveitadas 1:1 da versão Web (são funções puras de string,
// não dependem de nada específico do DOM, então funcionam iguais no RN).

/** Formata "00000000" -> "00000-000" enquanto o usuário digita. */
export function maskCEP(valor: string): string {
  const apenasNumeros = valor.replace(/\D/g, '').slice(0, 8);

  if (apenasNumeros.length <= 5) return apenasNumeros;

  return `${apenasNumeros.slice(0, 5)}-${apenasNumeros.slice(5)}`;
}

/** Máscara simples de moeda: mantém apenas números e vírgula decimal (2 casas). */
export function maskMoeda(valor: string): string {
  const limpo = valor.replace(/[^\d,]/g, '');
  const partes = limpo.split(',');

  if (partes.length <= 1) return limpo;

  return `${partes[0]},${partes.slice(1).join('').slice(0, 2)}`;
}

/** Converte "45,00" -> 45.00 (number). Usado só na validação/soma, nunca pra exibir. */
export function moedaParaNumero(valor: string): number {
  if (!valor) return 0;
  return Number(valor.replace(/\./g, '').replace(',', '.')) || 0;
}

/**
 * Aplica a máscara de CPF (999.999.999-99) em tempo de digitação.
 * value String bruta contendo o texto digitado pelo usuário.
 */
export function maskCPF(value: string): string {
    // 1. Remove tudo que não for número (\D) e limita a string a 11 dígitos
    const digits = value.replace(/\D/g, '').substring(0, 11)
    
    // 2. Aplica a pontuação progressivamente conforme o usuário digita
    return digits
        .replace(/(\d{3})(\d)/, '$1.$2')       // Coloca o primeiro ponto: 123.4
        .replace(/(\d{3})(\d)/, '$1.$2')       // Coloca o segundo ponto: 123.456.7
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2') // Coloca o hífen no final: 123.456.789-10
}

/**
 * Aplica a máscara de CNPJ (99.999.999/9999-99) em tempo de digitação.
 * value String bruta contendo o texto digitado pelo usuário.
 */
export function maskCNPJ(value: string): string {
    // 1. Remove tudo que não for número (\D) e limita a string a 14 dígitos
    const digits = value.replace(/\D/g, '').substring(0, 14)
    
    // 2. Aplica a pontuação do CNPJ de forma progressiva
    return digits
        .replace(/^(\d{2})(\d)/, '$1.$2')             // Coloca o primeiro ponto: 12.3
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3') // Coloca o segundo ponto: 12.345.6
        .replace(/\.(\d{3})(\d)/, '.$1/$2')           // Coloca a barra: 12.345.678/9
        .replace(/(\d{4})(\d)/, '$1-$2')              // Coloca o hífen nos últimos 2 dígitos: 12.345.678/0001-99
}

/**
 * Aplica a máscara de Telefone fixo ou celular: (99) 99999-9999.
 * value String bruta contendo o texto digitado pelo usuário.
 */
export function maskPhone(value: string): string {
    // 1. Remove tudo que não for número e limita a 11 dígitos (DDD + 9 dígitos)
    const digits = value.replace(/\D/g, '').substring(0, 11)
    
    // 2. Formata com parênteses e hífen dinamicamente
    return digits
        .replace(/^(\d{2})(\d)/g, '($1) $2') // Coloca o DDD entre parênteses: (11) 9
        .replace(/(\d{5})(\d)/, '$1-$2')     // Coloca o hífen após o 5º dígito do número (para celular): (11) 99999-9999
}



/**
 * Valida se o CEP possui a quantidade de dígitos correta.
 * value O CEP com ou sem máscara.
 */
export function validateCEP(value: string): boolean {
    const digits = value.replace(/\D/g, '')
    return digits.length === 8
}

/**
 * Valida se o texto inserido é um nome completo.
 * Critério: Ter pelo menos 2 palavras e cada palavra ter pelo menos 2 letras.
 */
export function validateFullName(value: string): boolean {
    // Limpa espaços nas pontas (.trim), quebra a string por espaços e remove itens vazios do array
    const parts = value.trim().split(' ').filter(p => p.length > 0)
    
    // Retorna verdadeiro se tiver 2 ou mais partes E todas as partes tiverem 2 ou mais caracteres
    return parts.length >= 2 && parts.every(p => p.length >= 2)
}

/**
 * Valida o tamanho numérico de um telefone.
 * Critério: Deve conter exatamente 10 dígitos (fixo com DDD) ou 11 dígitos (celular com DDD).
 */
export function validatePhone(value: string): boolean {
    // Remove qualquer máscara (parênteses, hífens, espaços) sobrando só os números
    const digits = value.replace(/\D/g, '')
    
    // Retorna true se o tamanho for válido para o padrão brasileiro
    return digits.length === 10 || digits.length === 11
}

/**
 * Valida a quantidade de dígitos de um documento brasileiro.
 *  value O documento com ou sem máscara.
 *  isCNPJ Flag indicando se deve validar como CNPJ (true) ou CPF (false).
 */
export function validateDocument(value: string, isCNPJ: boolean): boolean {
    // Remove qualquer formatação, deixando apenas os números isolados
    const digits = value.replace(/\D/g, '')
    
    // Retorna true se tiver 14 dígitos para CNPJ ou 11 dígitos para CPF
    return isCNPJ ? digits.length === 14 : digits.length === 11
}

// ============================================================
//  MÁSCARAS DE CARTÃO (fluxo de Pagamento)
//  Portadas 1:1 da Web (hooks/Mascaras/masks.ts) — são funções puras de
//  string, não dependem do DOM, então funcionam iguais no React Native.
// ============================================================

/** Código identificando a bandeira detectada de um cartão. Vazio quando nenhuma bandeira reconhecida. */
export type BandeiraCartao = 'VISA' | 'MASTER' | 'AMEX' | 'ELO' | 'DISCOVER' | 'DINERS' | ''

/** Aplica a máscara do número do cartão (blocos de 4 dígitos) em tempo de digitação. */
export function maskNumeroCartao(value: string): string {
    // 1. Remove tudo que não for número e limita a 16 dígitos
    const digits = value.replace(/\D/g, '').substring(0, 16)

    // 2. Insere um espaço a cada 4 dígitos: 0000 0000 0000 0000
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ')
}

/**
 * Detecta a bandeira do cartão a partir dos primeiros dígitos do número.
 * Detecção visual/UX; a validação real deve ocorrer na API.
 */
export function detectarBandeiraCartao(numero: string): BandeiraCartao {
    const digits = numero.replace(/\D/g, '')

    if (/^4/.test(digits)) return 'VISA'

    if (/^5[1-5]/.test(digits)) return 'MASTER'

    if (/^2(2[2-9]|[3-6]|7[01]|720)/.test(digits)) return 'MASTER'

    if (/^3[47]/.test(digits)) return 'AMEX'

    if (/^6(?:011|5)/.test(digits)) return 'DISCOVER'

    if (/^(4011|4312|4389|4514|4576|5041|5066|5067|509|6277|6362|6363|650|6516|6550)/.test(digits)) return 'ELO'

    if (/^3(?:0[0-5]|[68])/.test(digits)) return 'DINERS'

    return ''
}

/** Nome de exibição da bandeira detectada (ex.: para salvar junto do cartão). */
export function nomeBandeiraCartao(codigo: BandeiraCartao): string {
    const nomes: Record<Exclude<BandeiraCartao, ''>, string> = {
        VISA: 'Visa',
        MASTER: 'Mastercard',
        AMEX: 'American Express',
        ELO: 'Elo',
        DISCOVER: 'Discover',
        DINERS: 'Diners',
    }

    return codigo ? nomes[codigo] : 'Cartão'
}

/** Aplica a máscara de validade do cartão (MM/AA) em tempo de digitação. */
export function maskValidadeCartao(value: string): string {
    // 1. Remove tudo que não for número e limita a 4 dígitos (MMAA)
    const digits = value.replace(/\D/g, '').substring(0, 4)

    // 2. Insere a barra depois do mês, quando já houver o 3º dígito digitado
    if (digits.length >= 3) {
        return `${digits.slice(0, 2)}/${digits.slice(2)}`
    }

    return digits
}

/** Valida a validade do cartão no formato MM/AA: mês válido (01-12) e não vencido. */
export function validateValidadeCartao(value: string): boolean {
    if (value.length !== 5) return false

    const [mes, ano] = value.split('/').map(Number)

    if (!mes || mes < 1 || mes > 12) return false

    const anoAtual = new Date().getFullYear() % 100
    const mesAtual = new Date().getMonth() + 1

    return ano > anoAtual || (ano === anoAtual && mes >= mesAtual)
}

/** Aplica a máscara do CVV do cartão (somente números, até 3 dígitos). */
export function maskCVV(value: string): string {
    return value.replace(/\D/g, '').substring(0, 3)
}