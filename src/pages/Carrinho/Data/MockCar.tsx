import { Product } from "../../../Types/Product";
import { CartProduct } from "../useCarrinho";
 
export const cartMock: CartProduct[] = [
  {
    id: "1",
    title: "Furadeira Elétrica",
    image: require("../../../../assets/images/imagesProdutos/Furadeira1.webp"),
    dailyPrice: 49.99,
    rentalDays: 2,
    quantity: 1,
    availableQuantity: 50,
    selected: true,
  },
 
  {
    id: "2",
    title: "Parafusadeira",
    image: require("../../../../assets/images/imagesProdutos/Furadeira1.webp"),
    dailyPrice: 35.50,
    rentalDays: 4,
    quantity: 2,
    availableQuantity: 15,
    selected: false,
  },
 
  {
    id: "3",
    title: "Martelete Bosch",
    image: require("../../../../assets/images/imagesProdutos/Furadeira1.webp"),
    dailyPrice: 80,
    rentalDays: 1,
    quantity: 1,
    availableQuantity: 8,
    selected: true,
  },
];