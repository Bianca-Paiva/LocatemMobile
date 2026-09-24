import type { ProdutoBusca } from '../pages/Search/Searchtypes';
import type { NotificationData } from '../pages/Conta/Notificacoes/Notificacoes.types';

/**
 * ==========================================================================
 * MOCKS DE QA — Busca/Filtro e Notificações
 * ==========================================================================
 * Dados pensados pra exercitar os cenários de borda mapeados no roteiro de
 * testes de `src/utils/Busca/__tests__/filtrarProdutos.test.ts` (preços nas
 * bordas das faixas, produto sem voltagem, rating 0, múltiplas formas de
 * pagamento, disponibilidade true/false, marcas com acento pra testar
 * busca case-insensitive) e cenários de notificações (todas as datas
 * relevantes pro filtro de período, todos os tipos/categorias existentes,
 * lidas e não lidas).
 *
 * Isso é material de apoio pra QA/desenvolvimento — não substitui
 * `src/mocks/produtos.mock.ts` (catálogo "de produção" usado pelo app) nem
 * `src/pages/Conta/Notificacoes/Notificacao.mock.ts` (dados iniciais reais
 * do store de notificações). Use este arquivo quando precisar de um
 * conjunto pequeno e controlado de dados pra testar manualmente a tela de
 * Busca ou escrever novos testes automatizados.
 * ==========================================================================
 */

// Placeholder de imagem via URI remota — evita depender de assets locais
// só pra popular este mock.
const imagemPlaceholder = { uri: 'https://placehold.co/400x400?text=Ferramenta' };

export const PRODUTOS_BUSCA_QA_MOCK: ProdutoBusca[] = [
  {
    id: 9001,
    title: 'Furadeira de Impacto Profissional',
    marca: 'Bosch',
    categoria: 'Ferramentas Elétricas',
    price: '150,00', // faixa "R$101 - R$200"
    images: [imagemPlaceholder],
    imageVerificado: imagemPlaceholder,
    imageNota: imagemPlaceholder,
    rating: 4.5,
    reviewCount: 128,
    paymentMethods: ['Cartão de Crédito', 'Pix'],
    available: true,
    locador: 'Ferramentas do João',
    localizacao: 'São Paulo, SP',
    estoqueDisponivel: 5,
    voltagem: '220V',
  },
  {
    id: 9002,
    title: 'Parafusadeira sem fio',
    marca: 'DeWalt',
    categoria: 'Ferramentas Elétricas',
    price: '50,00', // borda de cima da faixa "R$0 - R$50"
    images: [imagemPlaceholder],
    imageVerificado: imagemPlaceholder,
    imageNota: imagemPlaceholder,
    rating: 5,
    reviewCount: 340,
    paymentMethods: ['Pix'],
    available: true,
    locador: 'Loja da Ana',
    localizacao: 'Campinas, SP',
    estoqueDisponivel: 2,
    voltagem: 'Bateria',
  },
  {
    id: 9003,
    title: 'Serra Circular de Bancada',
    marca: 'Makita',
    categoria: 'Marcenaria',
    price: '201,00', // borda de baixo da faixa "R$201+"
    images: [imagemPlaceholder],
    imageVerificado: imagemPlaceholder,
    imageNota: imagemPlaceholder,
    rating: 3,
    reviewCount: 12,
    paymentMethods: ['Cartão de Crédito', 'Cartão de Débito', 'Pix'],
    available: false, // edge case: indisponível pra locação
    locador: 'Depósito Central',
    localizacao: 'Rio de Janeiro, RJ',
    estoqueDisponivel: 0,
    voltagem: '127V',
  },
  {
    id: 9004,
    title: 'Betoneira 400L',
    marca: 'Menegotti',
    categoria: 'Construção',
    price: '89,90', // preço "quebrado", testa parsing de vírgula decimal
    images: [imagemPlaceholder],
    imageVerificado: imagemPlaceholder,
    imageNota: imagemPlaceholder,
    rating: 0, // edge case: sem nenhuma avaliação ainda
    reviewCount: 0,
    paymentMethods: ['Cartão de Débito'],
    available: true,
    locador: 'Construlider',
    localizacao: 'Belo Horizonte, MG',
    estoqueDisponivel: 1,
    voltagem: undefined, // edge case: sem voltagem cadastrada (ex: item manual)
  },
  {
    id: 9005,
    title: 'Roçadeira à Gasolina',
    marca: 'Áurea Máquinas', // edge case: marca com acento, testa busca case/acento-insensitive
    categoria: 'Jardinagem',
    price: '51,00', // borda de baixo da faixa "R$51 - R$100"
    images: [imagemPlaceholder],
    imageVerificado: imagemPlaceholder,
    imageNota: imagemPlaceholder,
    rating: 2,
    reviewCount: 4,
    paymentMethods: ['Pix'],
    available: true,
    locador: 'Jardim Fácil',
    localizacao: 'Curitiba, PR',
    estoqueDisponivel: 3,
    voltagem: 'Manual',
  },
];

// ---------------------------------------------------------------------------
// Notificações — datas calculadas em relação a "agora" pra sempre cair nos
// buckets certos do filtro de período (Hoje / Ontem / Esta semana / Este
// mês), não importa quando os testes/telas rodarem.
// ---------------------------------------------------------------------------

const agora = new Date();

function hace(diasAtras: number, horas = 9, minutos = 0): string {
  const data = new Date(agora);
  data.setDate(data.getDate() - diasAtras);
  data.setHours(horas, minutos, 0, 0);
  return data.toISOString();
}

// Garante um dia dentro do mês passado (mas fora de "esta semana"/"hoje"/"ontem").
function mesPassado(): string {
  const data = new Date(agora.getFullYear(), agora.getMonth() - 1, 15, 9, 0, 0);
  return data.toISOString();
}

export const NOTIFICACOES_QA_MOCK: NotificationData[] = [
  {
    id: 'qa-1',
    type: 'success',
    categoria: 'locacao-confirmada',
    title: 'Locacao confirmada (hoje, não lida)',
    description: 'Sua locacao da Furadeira de Impacto foi confirmada.',
    timestamp: 'Hoje',
    date: hace(0),
    lida: false,
    details: { equipamento: 'Furadeira de Impacto', status: 'Confirmada' },
  },
  {
    id: 'qa-2',
    type: 'warning',
    categoria: 'devolucao-pendente',
    title: 'Devolução pendente (ontem, lida)',
    description: 'A devolução da Betoneira 400L vence amanhã.',
    timestamp: 'Ontem',
    date: hace(1),
    lida: true,
    details: { equipamento: 'Betoneira 400L', dataLimite: hace(-1) },
  },
  {
    id: 'qa-3',
    type: 'delivery',
    categoria: 'entrega-andamento',
    title: 'Entrega em andamento (esta semana)',
    description: 'A Parafusadeira sem fio está a caminho.',
    timestamp: 'Esta semana',
    date: hace(2),
    lida: false,
    extraInfo: 'Tempo estimado de chegada: Hoje às 15:00',
    details: { statusEntrega: 'Em rota', previsaoChegada: 'Hoje às 15:00' },
  },
  {
    id: 'qa-4',
    type: 'error',
    categoria: 'pagamento-recusado',
    title: 'Pagamento recusado (este mês)',
    description: 'Não conseguimos processar o pagamento da Serra Circular.',
    timestamp: 'Este mês',
    date: hace(10),
    lida: true,
    details: { motivoRecusa: 'Cartão sem limite disponível' },
  },
  {
    id: 'qa-5',
    type: 'info',
    categoria: 'ferramenta-devolvida',
    title: 'Ferramenta devolvida (mês passado)',
    description: 'A Roçadeira à Gasolina foi devolvida com sucesso.',
    timestamp: 'Mês passado',
    date: mesPassado(), // edge case: fora de todos os filtros exceto "Todas"
    lida: true,
    details: { dataDevolucao: mesPassado() },
  },
  {
    id: 'qa-6',
    type: 'promotion',
    categoria: 'promocao-disponivel',
    title: 'Cupom disponível (hoje, não lida)',
    description: '10% de desconto em ferramentas de jardinagem.',
    timestamp: 'Hoje',
    date: hace(0, 8, 30),
    lida: false,
    details: { cupom: 'JARDIM10', desconto: '10%', validade: hace(-7) },
  },
  {
    id: 'qa-7',
    type: 'message',
    categoria: 'nova-mensagem',
    title: 'Nova mensagem (hoje, não lida)',
    description: 'Você recebeu uma mensagem do locador.',
    timestamp: 'Hoje',
    date: hace(0, 14, 0),
    lida: false,
    details: { remetente: 'Ferramentas do João', assunto: 'Sobre a retirada' },
  },
  {
    id: 'qa-8',
    type: 'reminder',
    categoria: 'avaliacao-pendente',
    title: 'Avalie sua locacao (ontem, não lida)',
    description: 'Que tal avaliar a Betoneira 400L que você alugou?',
    timestamp: 'Ontem',
    date: hace(1, 18, 0),
    lida: false,
    details: { notaSugerida: '5' },
  },
];
