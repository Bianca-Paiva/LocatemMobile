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
    productImages: string[];
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
  },
  fullDescription: "Ideal para uso doméstico e profissional leve. Perfeita para montagem de móveis, instalações e pequenos reparos...",
  technicalSpecs: {
    powerSource: "Bateria de Íons de Lítio 12V",
    maxTorque: "30 Nm",
    chuckSize: "10mm (3/8 polegadas)",
    includedAccessories: "2 baterias, carregador, maleta, kit de brocas...",
  },
  productImages: [
    "https://via.placeholder.com/400x400.png?text=Furadeira+1",
    "https://via.placeholder.com/400x400.png?text=Furadeira+2",
    "https://via.placeholder.com/400x400.png?text=Furadeira+3"
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