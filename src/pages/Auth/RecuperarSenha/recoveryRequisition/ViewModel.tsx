import React, { useState } from "react";
import { Alert } from "react-native";

const RecoveryRequisitionViewModel = () => {
    // 1. ESTADO: Guarda as informações que o usuário digita na tela
    const [values, setValues] = useState({
        userEmail: "",
    });

    // 2. ATUALIZAÇÃO: Pega o texto novo digitado e salva no estado acima
    const onEmailChange = (text: string) => {
        setValues({
            ...values, // Mantém outras informações (se existirem) intactas
            userEmail: text,
        });
    }

    // 3. VALIDAÇÃO
    const validateSendEmail = (onSuccess: () => void) => {
        
        // Regra A: Bloqueia se o campo estiver vazio ou só tiver espaços (trim)
        if (!values.userEmail.trim()) {
            Alert.alert("Atenção", "Por favor, informe o seu e-mail.");
            return; // Para a função aqui
        }

        // Regra B: Bloqueia se o texto não tiver formato de e-mail (ex: faltou o @) -> utilizando o regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(values.userEmail)) {
            Alert.alert("E-mail inválido", "Por favor, digite um e-mail com formato válido (ex: seu@email.com).");
            return; // Para a função aqui
        }

        console.log("E-mail validado e pronto para envio:", values.userEmail);

        // Se passou por todas as regras sem ser barrado, executa a ação da tela (ex: navegar)
        onSuccess();
    }

    return {
        ...values,
        onEmailChange,
        validateSendEmail,
    }
}

export default RecoveryRequisitionViewModel;