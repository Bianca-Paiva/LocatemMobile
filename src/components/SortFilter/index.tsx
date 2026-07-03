import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";


interface SortFilterProps {

  // Texto que será exibido no botão.
  value: string;

  // Função chamada quando o usuário selecionar uma opção.
  onSelect: (value: string) => void;
}


// Array contendo todas as opções de ordenação.
const options = [
  "Mais relevantes",
  "Menor preço",
  "Maior preço",
];

export default function SortFilter({

  // Recebe as propriedades enviadas pelo componente pai.
  value,
  onSelect,

}: SortFilterProps) {

  // Estado responsável por controlar se o dropdown está aberto ou fechado.
  const [visible, setVisible] = useState(false);


  // Função executada quando uma opção é selecionada.
  function handleSelect(option: string) {

    // Envia a opção escolhida para o componente pai.
    onSelect(option);

    // Fecha o dropdown após selecionar uma opção.
    setVisible(false);
  }


  return (

    // Container principal do componente.
    <View style={styles.container}>

      {/* Botão que abre e fecha o dropdown */}
      <TouchableOpacity

        style={styles.button}
        // Alterna entre abrir e fechar o dropdown.
        onPress={() => setVisible(!visible)}
      >

        {/* Exibe a opção atualmente selecionada */}
        <Text style={styles.text}>
          {value}
        </Text>

        {/* Ícone que muda dependendo do estado do dropdown */}
        <Ionicons

          // Se estiver aberto mostra uma seta para cima,
          // caso contrário mostra uma seta para baixo.
          name={visible ? "chevron-up" : "chevron-down"}

          size={22}
          color="#8A8A8A"
        />

      </TouchableOpacity>


      {/* O dropdown só é renderizado quando visible for true */}
      {visible && (

        <View style={styles.dropdown}>

          {/* Percorre todas as opções do array */}
          {options.map((option) => (

            // Cria um botão para cada opção.
            <TouchableOpacity

              // Chave única para o React identificar cada item.
              key={option}

              // Aplica o estilo normal e,
              // caso seja a opção selecionada,
              // adiciona também o estilo de destaque.
              style={[
                styles.option,
                option === value && styles.selectedOption,
              ]}

              // Ao clicar chama a função de seleção.
              onPress={() => handleSelect(option)}
            >

              {/* Texto da opção */}
              <Text

                // Também altera a aparência do texto
                // quando a opção estiver selecionada.
                style={[
                  styles.optionText,
                  option === value && styles.selectedText,
                ]}
              >
                {option}
              </Text>

            </TouchableOpacity>

          ))}

        </View>

      )}

    </View>
  );
}