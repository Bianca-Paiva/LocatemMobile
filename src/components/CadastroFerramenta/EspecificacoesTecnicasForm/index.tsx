import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FormInput from '../../Input/FormInput';
import styles from './styles';
import colors from '../../../theme/colors';
import type { EspecificacoesTecnicasFormProps } from './types';

export default function EspecificacoesTecnicasForm({
  especificacoes,
  onChange,
  erroPublicacao,
}: EspecificacoesTecnicasFormProps) {
  const [erro, setErro] = useState('');
  const mensagemErro = erroPublicacao ?? erro;

  const atualizarLinha = (id: string, campo: 'label' | 'valor', texto: string) => {
    const atualizadas = especificacoes.map((esp) => (esp.id === id ? { ...esp, [campo]: texto } : esp));
    onChange(atualizadas);

    const todasPreenchidas = atualizadas.every((esp) => esp.label.trim() !== '' && esp.valor.trim() !== '');
    if (todasPreenchidas) setErro('');
  };

  const removerLinha = (id: string) => {
    const atualizadas = especificacoes.filter((esp) => esp.id !== id);
    onChange(atualizadas);

    const todasPreenchidas = atualizadas.every((esp) => esp.label.trim() !== '' && esp.valor.trim() !== '');
    if (todasPreenchidas) setErro('');
  };

  const adicionarLinha = () => {
    const existeIncompleta = especificacoes.some((esp) => esp.label.trim() === '' || esp.valor.trim() === '');

    if (existeIncompleta) {
      setErro('Preencha a especificação anterior antes de adicionar uma nova.');
      return;
    }

    setErro('');
    onChange([...especificacoes, { id: `esp-${Date.now()}`, label: '', valor: '' }]);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.cabecalhoColunas}>
        <Text style={styles.cabecalhoColunaTexto}>ESPECIFICAÇÃO</Text>
        <Text style={styles.cabecalhoColunaTexto}>VALOR</Text>
        <View style={{ width: 34 }} />
      </View>

      {especificacoes.map((esp) => (
        <View key={esp.id} style={styles.linha}>
          <View style={styles.colunaInput}>
            <FormInput
              id={`especificacao-${esp.id}`}
              placeholder="Torque máximo"
              value={esp.label}
              onChangeText={(texto) => atualizarLinha(esp.id, 'label', texto)}
              accessibilityLabel="Especificação"
              invalido={Boolean(mensagemErro && esp.label.trim() === '')}
            />
          </View>

          <View style={styles.colunaInput}>
            <FormInput
              id={`valor-${esp.id}`}
              placeholder="65 Nm"
              value={esp.valor}
              onChangeText={(texto) => atualizarLinha(esp.id, 'valor', texto)}
              accessibilityLabel="Valor da especificação"
              invalido={Boolean(mensagemErro && esp.valor.trim() === '')}
            />
          </View>

          <TouchableOpacity
            style={styles.botaoRemover}
            onPress={() => removerLinha(esp.id)}
            accessibilityLabel="Remover especificação"
          >
            <MaterialCommunityIcons name="trash-can-outline" size={16} color={colors.error} />
          </TouchableOpacity>
        </View>
      ))}

      {mensagemErro ? <Text style={styles.error}>{mensagemErro}</Text> : null}

      <TouchableOpacity style={styles.botaoAdicionar} onPress={adicionarLinha}>
        <MaterialCommunityIcons name="plus" size={16} color={colors.amber} />
        <Text style={styles.botaoAdicionarTexto}>Adicionar Especificação</Text>
      </TouchableOpacity>
    </View>
  );
}
