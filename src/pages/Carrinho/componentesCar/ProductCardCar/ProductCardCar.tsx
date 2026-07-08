import React from "react";
import {
  Image,
  Pressable,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
 
import Checkbox from "../../../../components/Checkbox";
import QuantitySelector from "../../../../components/QuantitySelector";
 
import styles from "./styles";
 
export interface ProductCardCarProps {
  image: any;
 
  title: string;
 
  dailyPrice: number;
 
  rentalDays: number;
 
  quantity: number;
 
  availableQuantity?: number;
 
  selected: boolean;
 
  onSelect: () => void;
 
  onDelete: () => void;
 
  onIncreaseDays: () => void;
  onDecreaseDays: () => void;
 
  onIncreaseQuantity: () => void;
  onDecreaseQuantity: () => void;
}
 
export default function ProductCardCar({
  image,
  title,
  dailyPrice,
  rentalDays,
  quantity,
  availableQuantity = 0,
  selected,
 
  onSelect,
  onDelete,
 
  onIncreaseDays,
  onDecreaseDays,
 
  onIncreaseQuantity,
  onDecreaseQuantity,
}: ProductCardCarProps) {
  const total = dailyPrice * rentalDays * quantity;
 
  return (
<View style={styles.container}>
 
      <Checkbox
        checked={selected}
        onPress={onSelect}
      />
 
      <Image
        source={image}
        style={styles.image}
      />
 
      <View style={styles.content}>
 
        <View style={styles.header}>
 
          <Text
            numberOfLines={1}
            style={styles.title}
>
            {title}
</Text>
 
          <Pressable onPress={onDelete}>
<Ionicons
              name="trash-outline"
              size={18}
              color="#888"
            />
</Pressable>
 
        </View>
 
        <Text style={styles.subtitle}>
          {rentalDays} dias de aluguel
</Text>
 
        <View style={styles.priceRow}>
<Text style={styles.price}>
            R$ {dailyPrice.toFixed(2).replace(".", ",")}/dia × {rentalDays} dias
</Text>
 
          <Text style={styles.total}>
            Total: R$ {total.toFixed(2).replace(".", ",")}
</Text>
</View>
 
        <View style={styles.selectorRow}>
 
          <View>
 
            <Text style={styles.info}>
              Máx. 30
</Text>
 
            <QuantitySelector
              value={rentalDays}
              label="dias"
              min={1}
              max={30}
              onIncrease={onIncreaseDays}
              onDecrease={onDecreaseDays}
            />
 
          </View>
 
          <View>
 
            <Text style={styles.info}>
              +{availableQuantity} disponíveis
</Text>
 
            <QuantitySelector
              value={quantity}
              label="unidade"
              min={1}
              max={availableQuantity}
              onIncrease={onIncreaseQuantity}
              onDecrease={onDecreaseQuantity}
            />
 
          </View>
 
        </View>
 
      </View>
 
    </View>
  );
}