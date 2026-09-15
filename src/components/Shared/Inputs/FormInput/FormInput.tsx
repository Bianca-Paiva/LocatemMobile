import { useEffect, useRef } from 'react';
import {
  Animated,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

import { styles } from './styles';

export interface FormInputProps extends TextInputProps {
  label?: string;
  error?: string;
  status?: 'erro' | 'sucesso' | '';
  shake?: boolean;
  required?: boolean;
  /** conteúdo extra fixo à esquerda do texto (ex: prefixo "R$") */
  prefixo?: string;
  invalido?: boolean;
}

export default function FormInput({
  label,
  error,
  status = '',
  shake = false,
  required,
  prefixo,
  style,
  ...props
}: FormInputProps) {
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!shake) return;

    translateX.setValue(0);

    Animated.sequence([
      Animated.timing(translateX, { toValue: -6, duration: 45, useNativeDriver: true }),
      Animated.timing(translateX, { toValue: 6, duration: 45, useNativeDriver: true }),
      Animated.timing(translateX, { toValue: -4, duration: 45, useNativeDriver: true }),
      Animated.timing(translateX, { toValue: 4, duration: 45, useNativeDriver: true }),
      Animated.timing(translateX, { toValue: 0, duration: 45, useNativeDriver: true }),
    ]).start();
  }, [shake, translateX]);

  return (
    <Animated.View style={[styles.wrapper, { transform: [{ translateX }] }]}>
      {/* 1. Renderiza a Label (se existir) */}
      {label && (
        <Text style={styles.label}>
          {label}
          {required && (
            <Text style={styles.required}> *</Text>
          )}
        </Text>
      )}

      {/* 2. Container do Input e Prefixo */}
      <View
        style={[
          styles.inputContainer, // <- Este estilo deve ter flexDirection: 'row' e alignItems: 'center'
          status === 'erro' && styles.erro,
          status === 'sucesso' && styles.sucesso,
          props.multiline && styles.rowMultiline,
          !props.editable && styles.inputRowDesabilitado,
        ]}
      >
        {/* Renderiza o prefixo se foi passado */}
        {!!prefixo && (
          <Text style={styles.prefixo}>{prefixo}</Text>
        )}

        <TextInput
          {...props}
          style={[
            styles.input, // <- Este estilo deve ter flex: 1 para ocupar o espaço ao lado do prefixo
            props.multiline && styles.inputMultiline,
          ]}
        />
      </View>

      {/* 3. Renderiza o Erro (se existir) */}
      {!!error && (
        <Text style={styles.error}>
          {error}
        </Text>
      )}
    </Animated.View>
  );
}