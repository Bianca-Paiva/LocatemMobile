// No app Web, "Enter" adiciona e "Backspace" (com campo vazio) remove o último chip.
// No RN usamos onSubmitEditing para o Enter e o evento onKeyPress (que também
// dispara Backspace em teclados físicos/software na maioria dos dispositivos) pro Backspace.
import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FormInput from '../../Input/FormInput';
import styles from './styles';
import colors from '../../../theme/colors';
import type { AcessoriosInclusosProps } from './types';

export default function AcessoriosInclusos({ acessorios, onChange }: AcessoriosInclusosProps) {
  const [texto, setTexto] = useState('');

  const adicionar = () => {
    const valor = texto.trim();
    if (!valor || acessorios.includes(valor)) {
      setTexto('');
      return;
    }
    onChange([...acessorios, valor]);
    setTexto('');
  };

  const remover = (item: string) => {
    onChange(acessorios.filter((a) => a !== item));
  };

  return (
    <View style={styles.wrapper}>
      {acessorios.length > 0 && (
        <View style={styles.chips}>
          {acessorios.map((item) => (
            <View key={item} style={styles.chip}>
              <Text style={styles.chipTexto}>{item}</Text>
              <TouchableOpacity
                style={styles.chipBotaoRemover}
                onPress={() => remover(item)}
                accessibilityLabel={`Remover ${item}`}
              >
                <MaterialCommunityIcons name="close" size={12} color={colors.textMuted} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      <FormInput
        id="acessorio-incluso"
        placeholder="Adicione um acessório e toque em Enter"
        value={texto}
        onChangeText={setTexto}
        onSubmitEditing={adicionar}
        onBlur={adicionar}
        returnKeyType="done"
        onKeyPress={(e) => {
          if (e.nativeEvent.key === 'Backspace' && !texto && acessorios.length > 0) {
            remover(acessorios[acessorios.length - 1]);
          }
        }}
        accessibilityLabel="Adicionar acessório incluso"
      />

      <Text style={styles.dica}>Toque em "Enter" para adicionar cada acessório.</Text>
    </View>
  );
}
