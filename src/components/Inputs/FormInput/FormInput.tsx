import { useEffect, useRef } from 'react';
import {
  Animated,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

import { styles } from './styles';

interface FormInputProps extends TextInputProps {
  label?: string;
  error?: string;
  status?: 'erro' | 'sucesso' | '';
  shake?: boolean;
  required?: boolean;
}

export default function FormInput({
  label,
  error,
  status = '',
  shake = false,
  required,
  style,
  ...props
}: FormInputProps) {
  // Equivalente RN da animação CSS "shake" da Web (classe .shake aplicada
  // via style module quando `shakes.<campo>.shake` fica true por ~400ms).
  // Como React Native não tem CSS, a mesma prop `shake` — que já existia
  // aqui mas nunca era usada — agora dispara um Animated.sequence.
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
      {label && (
        <Text style={styles.label}>
          {label}

          {required && (
            <Text style={styles.required}>
              {' '}
              *
            </Text>
          )}
        </Text>
      )}

      <TextInput
        {...props}
        style={[
          styles.input,
          status === 'erro' && styles.erro,
          status === 'sucesso' &&
            styles.sucesso,
          style,
        ]}
      />

      {!!error && (
        <Text style={styles.error}>
          {error}
        </Text>
      )}
    </Animated.View>
  );
}
