import {
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

import { styles } from '../FormInput/styles';

interface FormTextareaProps extends TextInputProps {
  label: string;
  error?: string;
  status?: 'erro' | 'sucesso' | '';
  shake?: boolean;
  required?: boolean;
}

export default function FormTextarea({
  label,
  error,
  status = '',
  shake = false,
  required,
  style,
  ...props
}: FormTextareaProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>
        {label}

        {required && (
          <Text style={styles.required}>
            {' '}*
          </Text>
        )}
      </Text>

      <TextInput
        {...props}
        multiline
        textAlignVertical="top"
        style={[
          styles.textarea,
          status === 'erro' && styles.erro,
          status === 'sucesso' && styles.sucesso,
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