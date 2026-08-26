import { ImageSourcePropType } from 'react-native';

export interface CustomerFeedback {
  id: string;
  reviewerName: string;         
  starRating: number;           
  feedbackMessage: string;      
  hasAttachedPhotos: boolean;   
}

export interface StoreInfo{
    storeName: string;
    averageReputation: number;
    isVerifiedStore: boolean;
    storeBadgeImage?: string;
}

export interface TechnicalSpecs{
    powerSource: string;
    maxTorque: string;
    chuckSize: string;
    includedAccessories: string;
}

export interface ProductMockData {
    id: string;
    productTitle: string;
    overallAverageRating: number;
    totalCustomerReviewsCount: number;
    dailyRentalPrice: number;
    availableVoltageOptions: string[];
    storeInfo: StoreInfo;   
    fullDescription: string;
    technicalSpecs: TechnicalSpecs;
    productImages: ImageSourcePropType[];
    custumerFeedback: CustomerFeedback[];
}

export const mockProductData: ProductMockData = {
  id: "PROD-001",
  productTitle: "Furadeira Parafusadeira Sem Fio A Bateria 10mm Com Maleta E Acessórios The Black Tools",
  overallAverageRating: 4.8,
  totalCustomerReviewsCount: 120,
  dailyRentalPrice: 15.00,
  availableVoltageOptions: ["12V", "20V", "Bivolt"],
  storeInfo: {
    storeName: "HomePro Pro Store",
    averageReputation: 4.9,
    isVerifiedStore: true,
    storeBadgeImage: "https://via.placeholder.com/100x100.png?text=Store+Badge"//Colocar imagem real do badge da loja aqui
  },
  fullDescription: "Ideal para uso doméstico e profissional leve. Perfeita para montagem de móveis, instalações e pequenos reparos...",
  technicalSpecs: {
    powerSource: "Bateria de Íons de Lítio 18V máx",
    maxTorque: "65 Nm",
    chuckSize: "13mm Sem chave",
    includedAccessories: "2 baterias, carregador, estojo rígido, conjunto de 10 bits",
  },
  productImages: [
    require("../../assets/images/imagesProdutos/Furadeira1.webp"),
    require("../../assets/images/imagesProdutos/img-carrossel-2.png"),
    require("../../assets/images/imagesProdutos/img-carrossel-3.png")
  ],
  custumerFeedback: [
    {
      id: "REV-01",
      reviewerName: "João Silva",
      starRating: 5,
      feedbackMessage: "Furadeira muito boa. Usei pra montar um guarda-roupas e sobrou bateria. Recomendo!",
      hasAttachedPhotos: false
    },
    {
      id: "REV-02",
      reviewerName: "Maria Souza",
      starRating: 4,
      feedbackMessage: "A entrega foi rápida e o produto atendeu minhas expectativas.",
      hasAttachedPhotos: true
    }
  ]
};