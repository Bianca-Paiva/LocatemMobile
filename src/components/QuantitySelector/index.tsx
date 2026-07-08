import React from "react";
import { View, Text, Pressable } from "react-native";
import styles from "./styles";
 
interface QuantitySelectorProps {
  value: number;
  label: string;
 
  min?: number;
  max?: number;
 
  onIncrease: () => void;
  onDecrease: () => void;
}
 
export default function QuantitySelector({
  value,
  label,
  min = 0,
  max = Infinity,
  onIncrease,
  onDecrease,
}: QuantitySelectorProps) {
  return (
<View style={styles.container}>
<Pressable
        style={styles.button}
        onPress={onDecrease}
        disabled={value <= min}
>
<Text
          style={[
            styles.symbol,
            value <= min && styles.disabledText,
          ]}
>
          −
</Text>
</Pressable>
 
      <Text style={styles.value}>
        {value} {label}
</Text>
 
      <Pressable
        style={styles.button}
        onPress={onIncrease}
        disabled={value >= max}
>
<Text
          style={[
            styles.symbol,
            value >= max && styles.disabledText,
          ]}
>
          +
</Text>
</Pressable>
</View>
  );
}


// Para usar componente QuantitySelector,
//  você pode importá-lo e utilizá-lo em outro componente ou página do
//   seu aplicativo React Native. Aqui está um exemplo de como fazer isso:

//===========================================================
// const [days, setDays] = useState(2);
 
// <QuantitySelector
//     value={days}
//     label="dias"
//     min={1}
//     max={30}
//     onIncrease={() => setDays(days + 1)}
//     onDecrease={() => setDays(days - 1)}
// />