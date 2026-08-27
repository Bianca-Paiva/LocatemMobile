// 🚀 ARQUITETURA: Importamos o tipo de imagem nativo do React Native
import { ImageSourcePropType } from 'react-native';

// ── 1. TIPAGENS LOCAIS ──────────────────────────────────────────────
// Mantemos o padrão em português para encaixar perfeitamente nos componentes que já criamos.

export interface EspecificacaoTecnica {
  label: string;
  valor: string;
}

export interface AvaliacaoProduto {
  nome: string;
  rating: number;
  tempo: string;
  texto: string;
  fotos: ImageSourcePropType[]; // Adaptado para aceitar require() nativo
  utilCount: number;
}

// ── 2. DADOS MOCKADOS ───────────────────────────────────────────────

// 🚀 REGRA DE NEGÓCIO: O Fallback Produto é usado caso a tela abra sem um produto selecionado.
export const FALLBACK_PRODUTO = {
  id: "PROD-001",
  title: "Furadeira Parafusadeira Sem Fio A Bateria 10mm The Black Tools",
  price: 15.00,
  rating: 4.8,
  reviewCount: 120,
  brand: "HomePro Pro Store",
  locador: "HomePro Pro Store",
  estoqueDisponivel: 5,
  opcoesTensao: ["127V", "220V", "Bivolt"],
  tipoAprovacao: 'manual', // Importante para o fluxo de reserva que construímos
  
  // ATENÇÃO: Ajuste os caminhos dos requires conforme a sua pasta 'assets' real
  images: [
    require("../../assets/images/imagesProdutos/Furadeira1.webp"),
    require("../../assets/images/imagesProdutos/img-carrossel-2.png"),
    require("../../assets/images/imagesProdutos/img-carrossel-3.png")
    // require("../../assets/images/imagesProdutos/img-carrossel-2.png"),
  ],
  imageVerificado: require("../../assets/images/verificadoAzul.png"),
  imageNota: require("../../assets/images/icons/StarFullYellow.png"), 
};

// Reutilizamos a lógica de cards da Home
export const MOCK_SEMELHANTES = [
  {
    id: "PROD-002",
    title: "Serra Tico-Tico 400W",
    brand: "Bosch",
    price: 25.00,
    images: [require("../../assets/images/imagesProdutos/Furadeira1.webp")], // Exemplo
    rating: 4.5,
    reviewCount: 89,
    imageVerificado: require("../../assets/images/verificadoAzul.png"),
    imageNota: require("../../assets/images/IconLike.png"),
  },
  {
    id: "PROD-003",
    title: "Parafusadeira de Impacto",
    brand: "Makita",
    price: 20.00,
    images: [require("../../assets/images/imagesProdutos/Furadeira1.webp")], // Exemplo
    rating: 4.9,
    reviewCount: 210,
    imageVerificado: require("../../assets/images/verificadoAzul.png"),
    imageNota: require("../../assets/images/IconLike.png"),
  }
];

export const MOCK_ESPECIFICACOES: EspecificacaoTecnica[] = [
  { label: 'Potência de saída', valor: 'Bateria de Íon-lítio de 18V máx' },
  { label: 'Torque máximo', valor: '65 Nm' },
  { label: 'Tamanho do mandril', valor: '13mm Sem chave' },
  { label: 'Acessórios incluídos', valor: '2 baterias, carregador, estojo rígido, conjunto de 10 bits' },
];

export const MOCK_AVALIACOES: AvaliacaoProduto[] = [
  {
    nome: 'João Silva',
    rating: 5,
    tempo: 'Há 2 dias',
    texto: 'Furadeira muito boa, usei pra montar um guarda-roupa inteiro. Super potente e a bateria durou o projeto todo.',
    fotos: [], // Se tiver fotos locais, use require() aqui
    utilCount: 12,
  },
  {
    nome: 'Maria Souza',
    rating: 4,
    tempo: 'Há 1 semana',
    texto: 'A entrega foi rápida e o produto atendeu minhas expectativas perfeitamente.',
    fotos: [],
    utilCount: 5,
  },
  {
    nome: 'Pedro Ribeiro',
    rating: 4,
    tempo: 'Há 2 semanas',
    texto: 'Máquina limpa e pronta para uso. Recomendo.',
    fotos: [],
    utilCount: 2,
  },
];