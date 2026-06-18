import { use, useRef } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, KeyboardTypeOptions } from "react-native";

interface TokenInputProps{
    value:string,
    onChange:(value: string) => void;
}

export default function TokenInput({value, onChange}: TokenInputProps){

    // Armazena referências para os 5 TextInputs.
    // Permite manipular os campos diretamente, como mover o foco.
    const inputs = useRef<(TextInput | null)[]>([]);

    /**
        Atualiza o valor do token na posição informada
        e move o foco para o próximo campo quando um caractere é digitado.
        text - Caractere digitado pelo usuário.
        index - Índice do campo que recebeu a alteração.
     */
    const handleChange = (text:string, index:number) => {
        
        // Converte a string do token em um array de caracteres.
        const tokenArray = value.split("");

        // Atualiza a posição correspondente ao campo alterado.
        tokenArray[index] = text;

        // Reconstrói o token como uma única string.
        const newToken = tokenArray.join("");

        // Notifica o componente pai sobre a alteração.
        onChange(newToken);
        
        // Se houver um valor digitado e não for o último campo,
        // move automaticamente o foco para o próximo input.
        if(text && index < 4){
            inputs.current[index +1]?.focus();
        }
    };

    return(
        <View style={styles.container}>

            {/* Cria dinamicamente os 5 campos do token */}
            {[0, 1, 2, 3, 4].map((index) => (
                <TextInput
                    key={index}
                    // Salva a referência de cada TextInput no array inputs.current
                    ref={(ref) => {
                        inputs.current[index] = ref;
                    }}
                    style={styles.input}
                    keyboardType="numeric"
                    maxLength={1}
                    value={value[index] || ""}
                    
                    // Atualiza o token sempre que o usuário digitar algo
                    onChangeText={(text) =>
                    handleChange(text, index)
                    }
                />
            ))}

        </View>
    );
}

const styles = StyleSheet.create({
    container:{},
    input:{}
})