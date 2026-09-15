import { GestureResponderEvent, ImageSourcePropType } from "react-native";

export interface Product {
    id : string;
    imageUrl: string | ImageSourcePropType;
    title: string;
    storeName: string;
    price : number;
    period: string;
}

export interface ProductCardProps {
    product : Product;
    onPress?: (event: GestureResponderEvent) => void;
}