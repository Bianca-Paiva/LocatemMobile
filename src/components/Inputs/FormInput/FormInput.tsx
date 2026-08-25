import {
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
  return (
    <View style={styles.wrapper}>
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
    </View>
  );
}