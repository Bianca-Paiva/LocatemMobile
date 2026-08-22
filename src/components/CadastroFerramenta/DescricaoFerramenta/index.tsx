import { View, Text } from 'react-native';
import FormTextarea from '../../Input/FormTextarea';
import styles from './styles';
import type { DescricaoFerramentaProps } from './types';

const LIMITE_CARACTERES = 1000;
const MIN_CARACTERES = 50;

export default function DescricaoFerramenta({ value, onChange, error, shake }: DescricaoFerramentaProps) {
  return (
    <View style={styles.wrapper}>
      <FormTextarea
        id="descricao"
        label="Descrição da Ferramenta"
        required
        placeholder="Descreva a ferramenta, estado de uso, recomendações e observações importantes."
        value={value}
        maxLength={LIMITE_CARACTERES}
        onChangeText={onChange}
        error={error}
        shake={shake}
        minHeight={140}
      />

      <View style={styles.rodape}>
        <Text style={styles.contador}>
          {value.length} / {LIMITE_CARACTERES}
          {value.length < MIN_CARACTERES ? ` (mín. ${MIN_CARACTERES})` : ''}
        </Text>
      </View>
    </View>
  );
}
