import React from "react";

import { Pressable, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import styles from "./styles";
 
interface CheckboxProps {

  checked: boolean;

  onPress: () => void;

  size?: number;

}
 
export default function Checkbox({

  checked,

  onPress,

  size = 24,

}: CheckboxProps) {

  return (
<Pressable

      onPress={onPress}

      style={[

        styles.container,

        {

          width: size,

          height: size,

        },

        checked && styles.checked,

      ]}
>

      {checked && (
<Ionicons

          name="checkmark"

          size={size - 8}

          color="#FFF"

        />

      )}
</Pressable>

  );

}
 
// Para usar o componente Checkbox, você pode importá-lo e utilizá-lo em seu código da seguinte forma:
// import Checkbox from './components/Checkbox';
// Em seguida, você pode renderizar o componente Checkbox em seu JSX, passando as props necessárias, como checked e onPress. Por exemplo:

// ================================================================

// const [selected, setSelected] = useState(false);
 
// <Checkbox
//     checked={selected}
//     onPress={() => setSelected(!selected)}
// />