import { useRef, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, KeyboardTypeOptions, NativeSyntheticEvent, TextInputKeyPressEvent } from "react-native";

interface TokenInputProps{
    value:string,
    onChange:(value: string) => void;
}

export default function TokenInput({value, onChange}: TokenInputProps){

    // Armazena referências para os 5 TextInputs.
    // Permite manipular os campos diretamente, como mover o foco.
    const inputs = useRef<(TextInput | null)[]>([]);

    const [focusedIndex, setFocusedIndex] = useState(0);

    const handleKeyPress =(e: TextInputKeyPressEvent, index:number) => {
        //Aqui se a tecla de apagar for acionada  e o input estiver vazio e não ser o primeiro
        if(e.nativeEvent.key ==='Backspace' && !value[index] && index > 0){
            inputs.current[index - 1]?.focus();
            setFocusedIndex(index - 1);
        }
    }

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
            setFocusedIndex(index + 1);
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
                    onFocus={() => setFocusedIndex(index)}
                    style={[
                        styles.input,
                        (value[index] || focusedIndex === index) && styles.inputActive
                    ]}
                    keyboardType="numeric"
                    maxLength={1}
                    value={value[index] || ""}
                    
                    // Atualiza o token sempre que o usuário digitar algo
                    onChangeText={(text) =>
                    handleChange(text, index)
                    }
                    onKeyPress={(e) => handleKeyPress(e, index)}
                />
            ))}

        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        justifyContent:"center",
        gap:9,
        width : "100%",
        marginTop:12,
    },
    input:{
        width: 60,
        height:86,
        borderWidth: 1,
        borderColor: "#D9D9D9",
        borderRadius: 12,
        textAlign: "center",
        fontSize: 28,
    },
    inputActive:{
        borderColor:"#FFD700",
        borderWidth:2,
    },
})