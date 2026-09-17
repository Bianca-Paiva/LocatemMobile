import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';

import { styles } from './styles';

export interface FormInputProps extends TextInputProps {
  label?: string;
  error?: string;
  status?: 'erro' | 'sucesso' | '';
  shake?: boolean;
  required?: boolean;
  /** conteúdo extra fixo à esquerda do texto (ex: prefixo "R$") */
  prefixo?: string;
  /** Atalho para forçar o estado de erro sem passar `status="erro"`. */
  invalido?: boolean;
  /** Estilo do container (borda/fundo/altura). O `style` vai para o TextInput. */
  containerStyle?: StyleProp<ViewStyle>;
}

export default function FormInput({
  label,
  error,
  status = '',
  shake = false,
  required,
  prefixo,
  invalido = false,
  style,
  containerStyle,
  placeholderTextColor = '#999999',
  editable,
  onFocus,
  onBlur,
  ...props
}: FormInputProps) {
  const translateX = useRef(new Animated.Value(0)).current;

  // Feedback de foco: `styles.inputFocused` já existia, mas nunca era aplicado.
  const [focado, setFocado] = useState(false);

  // `editable` é `undefined` por padrão no TextInput (= habilitado). A checagem
  // precisa ser explícita contra `false`, senão todo input sem a prop cai no
  // estilo de desabilitado.
  const desabilitado = editable === false;

  const comErro = status === 'erro' || invalido || !!error;
  const comSucesso = status === 'sucesso' && !comErro;

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
      {/* 1. Label */}
      {!!label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}

      {/* 2. Container do Input e do prefixo — é ele que desenha borda e fundo */}
      <View
        style={[
          styles.inputContainer,
          focado && !comErro && !comSucesso && styles.inputFocused,
          comSucesso && styles.sucesso,
          comErro && styles.erro,
          props.multiline && styles.rowMultiline,
          desabilitado && styles.inputRowDesabilitado,
          containerStyle,
        ]}
      >
        {!!prefixo && <Text style={styles.prefixo}>{prefixo}</Text>}

        <TextInput
          {...props}
          editable={editable}
          placeholderTextColor={placeholderTextColor}
          accessibilityLabel={props.accessibilityLabel ?? label}
          onFocus={(e) => {
            setFocado(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocado(false);
            onBlur?.(e);
          }}
          style={[
            styles.input,
            props.multiline && styles.inputMultiline,
            // O `style` do chamador vem por último para poder sobrescrever —
            // é o que faz o `minHeight` do FormTextarea finalmente valer.
            style,
          ]}
        />
      </View>

      {/* 3. Mensagem de erro */}
      {!!error && <Text style={styles.error}>{error}</Text>}
    </Animated.View>
  );
}
