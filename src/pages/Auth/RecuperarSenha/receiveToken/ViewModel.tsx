import { useState, useEffect } from "react";
import { Alert } from "react-native";

const useReceiveTokenViewModel = () => {
  // 1. ESTADOS: Armazenam os dados que mudam e afetam o visual da tela
  const [token, setToken] = useState(""); // Guarda os 5 dígitos do código
  const [timer, setTimer] = useState(50); // Controla o tempo de bloqueio do reenvio

  // 2. CRONÔMETRO: Ciclo de vida do relógio regressivo
  useEffect(() => {
    // Se o tempo já zerou, não faz nada (evita processamento desnecessário)
    if (timer === 0) return;

    // Cria um processo em segundo plano que subtrai 1 segundo do timer a cada 1000ms
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    // Cleanup: Destrói o processo se a tela for fechada ou o timer mudar.
    // Isso evita vazamento de memória (o app ficar lento com o tempo).
    return () => clearInterval(interval);
  }, [timer]);

  // 3. AÇÃO: reenviar o código
  const handleResendToken = () => {
    // Só permite o disparo se a trava de tempo já estiver liberada
    if (timer === 0) {
      setTimer(50); // Trava o botão novamente por mais 50s
      // Api -> Ponto de integração com a API de reenvio de e-mail
      console.log("Sistema: Novo token solicitado.");
    }
  };

  // 4. VALIDAÇÃO: Simulação de comunicação com o backend
  // Recebe o 'onSuccess' (a rotação de tela) como injeção de dependência
  const handleVerifyToken = (onSuccess: () => void) => {
    
    // Regra A: Proteção de frontend (não deixa enviar código incompleto para a API)
    if (token.length < 5) {
      Alert.alert("Atenção", "Por favor, preencha todos os 5 dígitos do código.");
      return; // Aborta a operação
    }

    // Regra B: Simulação de resposta do servidor (Mock)
    // Usamos um valor fixo para testar o sucesso e o erro durante o desenvolvimento
    const MOCK_TOKEN_CORRETO = "12345";

    if (token !== MOCK_TOKEN_CORRETO) {
      Alert.alert("Código Inválido", "O código inserido está incorreto. Tente novamente.");
      return; // Aborta a operação
    }

    // Fluxo de Sucesso: O código é válido
    console.log("Sistema: Token validado com sucesso!", token);
    onSuccess(); // Executa a navegação que a tela mandou
  };

  // 5. EXPORTAÇÃO: Expõe apenas o que a interface (View) precisa enxergar
  return {
    token,
    setToken,
    timer,
    handleResendToken,
    handleVerifyToken,
  };
};

export default useReceiveTokenViewModel;