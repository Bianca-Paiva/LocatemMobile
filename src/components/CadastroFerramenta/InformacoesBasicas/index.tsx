import { View, Text, TouchableOpacity } from 'react-native';
import FormInput from '../../Input/FormInput';
import FormSelect from '../../Input/FormSelect';
import SeletorQuantidade from '../../Input/SeletorQuantidade';
import {
  CATEGORIAS_FERRAMENTA,
  ESTADOS_CONSERVACAO,
  OPCOES_FONTE_ALIMENTACAO,
} from '../../../pages/CadastroFerramenta/types';
import styles from './styles';
import type { InformacoesBasicasProps } from './types';

export default function InformacoesBasicas({ form, onChangeCampo, erros, shake }: InformacoesBasicasProps) {
  const { nome, marca, modelo, categoria, estadoConservacao, quantidadeDisponivel, fonteAlimentacao } = form;

  return (
    <View style={styles.wrapper}>
      <FormInput
        id="nome"
        label="Nome da Ferramenta"
        placeholder="Ex: Furadeira de Impacto 750W"
        value={nome}
        required
        error={erros.nome}
        shake={shake && Boolean(erros.nome)}
        onChangeText={(texto) => onChangeCampo('nome', texto)}
      />

      <FormInput
        id="marca"
        label="Marca"
        placeholder="Ex: Bosch, Makita, DeWalt..."
        value={marca}
        required
        error={erros.marca}
        shake={shake && Boolean(erros.marca)}
        onChangeText={(texto) => onChangeCampo('marca', texto)}
      />

      <FormInput
        id="modelo"
        label="Modelo"
        placeholder="Ex: GSB 13 RE"
        value={modelo}
        required
        error={erros.modelo}
        shake={shake && Boolean(erros.modelo)}
        onChangeText={(texto) => onChangeCampo('modelo', texto)}
      />

      <FormSelect
        id="categoria"
        label="Categoria"
        required
        placeholder="Selecione uma categoria"
        options={CATEGORIAS_FERRAMENTA}
        value={categoria}
        error={erros.categoria}
        shake={shake && Boolean(erros.categoria)}
        onChange={(valor) => onChangeCampo('categoria', valor)}
      />

      <FormSelect
        id="estadoConservacao"
        label="Estado de Conservação"
        required
        placeholder="Selecione o estado"
        options={ESTADOS_CONSERVACAO}
        value={estadoConservacao}
        error={erros.estadoConservacao}
        shake={shake && Boolean(erros.estadoConservacao)}
        onChange={(valor) => onChangeCampo('estadoConservacao', valor)}
      />

      <SeletorQuantidade
        quantidade={quantidadeDisponivel}
        onDecrementar={() => onChangeCampo('quantidadeDisponivel', Math.max(1, quantidadeDisponivel - 1))}
        onIncrementar={() => onChangeCampo('quantidadeDisponivel', Math.min(999, quantidadeDisponivel + 1))}
      />

      <View style={styles.campoFonte}>
        <Text style={styles.label}>
          Fonte de Alimentação / Voltagem<Text style={styles.obrigatorio}> *</Text>
        </Text>

        <View style={styles.chips}>
          {OPCOES_FONTE_ALIMENTACAO.map((opcao) => {
            const ativo = fonteAlimentacao === opcao;
            return (
              <TouchableOpacity
                key={opcao}
                style={[styles.chip, ativo && styles.chipAtivo]}
                onPress={() => onChangeCampo('fonteAlimentacao', opcao)}
              >
                <Text style={[styles.chipTexto, ativo && styles.chipTextoAtivo]}>{opcao}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {erros.fonteAlimentacao ? <Text style={styles.error}>{erros.fonteAlimentacao}</Text> : null}
      </View>
    </View>
  );
}
