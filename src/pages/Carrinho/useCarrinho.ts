import { ImageSourcePropType } from "react-native";

export interface CartProduct {
    id: string;
    image: ImageSourcePropType;
    title: string;
    dailyPrice: number;
    rentalDays: number;
    quantity: number;
    availableQuantity: number;
    selected: boolean;
}
