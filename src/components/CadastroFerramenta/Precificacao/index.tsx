import { View, Text } from 'react-native';
import FormInput from '../../Input/FormInput';
import { maskMoeda } from '../../../hooks/masks';
import styles from './styles';
import type { PrecificacaoProps } from './types';

export default function Precificacao({
  valorDiaria,
  caucao,
  onChangeValorDiaria,
  onChangeCaucao,
  error,
  shake,
}: PrecificacaoProps) {
  return (
    <View style={styles.wrapper}>
      <View>
        <FormInput
          id="valorDiaria"
          label="Valor da Diária"
          required
          prefixo="R$"
          keyboardType="decimal-pad"
          placeholder="Ex: 45,00"
          value={valorDiaria}
          onChangeText={(texto) => onChangeValorDiaria(maskMoeda(texto))}
          error={error}
          shake={shake && Boolean(error)}
          accessibilityLabel="Valor da diária"
        />
        {!error ? <Text style={styles.dica}>Valor cobrado por dia de locação.</Text> : null}
      </View>

      <View>
        <FormInput
          id="caucao"
          label="Caução (opcional)"
          prefixo="R$"
          keyboardType="decimal-pad"
          placeholder="Ex: 200,00"
          value={caucao}
          onChangeText={(texto) => onChangeCaucao(maskMoeda(texto))}
          accessibilityLabel="Caução"
        />
        <Text style={styles.dica}>Valor devolvido após a devolução da ferramenta.</Text>
      </View>
    </View>
  );
}
