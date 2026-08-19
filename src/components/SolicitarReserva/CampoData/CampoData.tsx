import { View, Text, TextInput } from 'react-native';
import { Image } from 'react-native';

import calendarioIcon from '../../../assets/images/icons/iconCalendarioReservas.png';
import { styles } from './styles';

interface CampoDataProps {

  label: string;
  value: string;
  onChange: (value: string) => void;
  min?: string;
  required?: boolean;
  error?: string;
}

export default function CampoData({
  label,
  value,
  onChange,
  required = false,
  error,
}: CampoDataProps) {
  return (
    <View
      style={[
        styles.wrapper,
      ]}
    >
      <Text style={styles.label}>
        {label}

        {required && (
          <Text style={styles.required}> *</Text>
        )}
      </Text>

      <View style={styles.campoWrapper}>
        <TextInput
          style={[
            styles.input,
            error && styles.erro,
          ]}
          value={value}
          onChangeText={onChange}
          placeholder="dd/mm/aaaa"
        />

        <Image
          source={calendarioIcon}
          style={styles.icone}
          resizeMode="contain"
        />
      </View>

      {error && (
        <Text style={styles.error}>
          {error}
        </Text>
      )}
    </View>
  );
}