// Equivalente mobile do FormInput da Web: label + campo + erro + "shake" de validação.
// O shake é feito com Animated (o CSS usava @keyframes gentleShake).
import { useEffect, useRef } from 'react';
import { View, Text, TextInput, Animated } from 'react-native';
import styles from './styles';
import colors from '../../../theme/colors';
import type { FormInputProps } from './types';

export default function FormInput({
  id,
  label,
  placeholder,
  value,
  onChangeText,
  required,
  error,
  invalido,
  shake,
  keyboardType = 'default',
  maxLength,
  multiline = false,
  minHeight,
  editable = true,
  returnKeyType,
  onSubmitEditing,
  onBlur,
  onKeyPress,
  accessibilityLabel,
  prefixo,
}: FormInputProps) {
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!shake) return;
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: -4, duration: 55, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 4, duration: 55, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -4, duration: 55, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 4, duration: 55, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 55, useNativeDriver: true }),
    ]).start();
  }, [shake]);

  return (
    <View style={styles.wrapper}>
      {label ? (
        <Text style={styles.label}>
          {label}
          {required ? <Text style={styles.obrigatorio}> *</Text> : null}
        </Text>
      ) : null}

      <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
        <View
          style={[
            styles.inputRow,
            multiline && styles.rowMultiline,
            (error || invalido) ? styles.inputRowErro : null,
            !editable && styles.inputRowDesabilitado,
          ]}
        >
          {prefixo ? <Text style={styles.prefixo}>{prefixo}</Text> : null}

          <TextInput
            nativeID={id}
            style={[
              styles.input,
              multiline && [styles.inputMultiline, { minHeight: minHeight ?? 100 }],
            ]}
            placeholder={placeholder}
            placeholderTextColor={colors.textMuted2}
            value={value}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
            maxLength={maxLength}
            multiline={multiline}
            editable={editable}
            returnKeyType={returnKeyType}
            onSubmitEditing={onSubmitEditing}
            onBlur={onBlur}
            onKeyPress={onKeyPress}
            accessibilityLabel={accessibilityLabel ?? label ?? placeholder}
          />
        </View>
      </Animated.View>

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}
