import { View, Text, TouchableOpacity, Alert } from 'react-native';
import FormInput from '../../Input/FormInput';
import FormTextarea from '../../Input/FormTextarea';
import { maskCEP } from '../../../hooks/masks';
import styles from './styles';
import type { EnderecoRetiradaProps } from './types';

export default function EnderecoRetirada({ form, onChangeCampo, erros, shake }: EnderecoRetiradaProps) {
  const {
    cep,
    ruaAvenida,
    numero,
    complemento,
    usarMesmoEnderecoDevolucao,
    cepDevolucao,
    ruaAvenidaDevolucao,
    numeroDevolucao,
    complementoDevolucao,
  } = form;

  const mostrarFormularioDevolucao = !usarMesmoEnderecoDevolucao;

  return (
    <View style={styles.wrapper}>
      <View style={styles.linhaCep}>
        <View style={styles.campoCep}>
          <FormInput
            id="cep"
            label="CEP"
            placeholder="00000-000"
            keyboardType="numeric"
            value={cep}
            required
            error={erros.cep}
            shake={shake && Boolean(erros.cep)}
            onChangeText={(texto) => onChangeCampo('cep', maskCEP(texto))}
            maxLength={9}
          />
        </View>

        <TouchableOpacity
          style={styles.linkCepDesconhecido}
          onPress={() => Alert.alert('Não sei meu CEP', 'Funcionalidade em desenvolvimento.')}
        >
          <Text style={styles.linkCepDesconhecidoTexto}>Não sei meu CEP</Text>
        </TouchableOpacity>
      </View>

      <FormInput
        id="ruaAvenida"
        label="Rua / Avenida"
        placeholder="Ex: Av. Paulista"
        value={ruaAvenida}
        required
        error={erros.ruaAvenida}
        shake={shake && Boolean(erros.ruaAvenida)}
        onChangeText={(texto) => onChangeCampo('ruaAvenida', texto)}
      />

      <FormInput
        id="numero"
        label="Número"
        placeholder="Ex: 1234"
        value={numero}
        required
        error={erros.numero}
        shake={shake && Boolean(erros.numero)}
        onChangeText={(texto) => onChangeCampo('numero', texto)}
      />

      <FormTextarea
        id="complemento"
        label="Complemento (opcional)"
        placeholder="Apartamento, bloco, referência..."
        value={complemento}
        onChangeText={(texto) => onChangeCampo('complemento', texto)}
        minHeight={80}
      />

      <TouchableOpacity
        style={styles.linhaCheckbox}
        activeOpacity={0.7}
        onPress={() => onChangeCampo('usarMesmoEnderecoDevolucao', !usarMesmoEnderecoDevolucao)}
      >
        <View style={[styles.checkbox, usarMesmoEnderecoDevolucao && styles.checkboxMarcado]}>
          {usarMesmoEnderecoDevolucao && <View style={styles.checkboxMarca} />}
        </View>
        <Text style={styles.checkboxTexto}>O endereço de devolução é o mesmo da retirada</Text>
      </TouchableOpacity>

      {mostrarFormularioDevolucao && (
        <View style={styles.wrapperDevolucao}>
          <Text style={styles.tituloDevolucao}>Endereço de devolução</Text>

          <View style={styles.linhaCep}>
            <View style={styles.campoCep}>
              <FormInput
                id="cepDevolucao"
                label="CEP"
                placeholder="00000-000"
                keyboardType="numeric"
                value={cepDevolucao}
                required
                error={erros.cepDevolucao}
                shake={shake && Boolean(erros.cepDevolucao)}
                onChangeText={(texto) => onChangeCampo('cepDevolucao', maskCEP(texto))}
                maxLength={9}
              />
            </View>
          </View>

          <FormInput
            id="ruaAvenidaDevolucao"
            label="Rua / Avenida"
            placeholder="Ex: Av. Paulista"
            value={ruaAvenidaDevolucao}
            required
            error={erros.ruaAvenidaDevolucao}
            shake={shake && Boolean(erros.ruaAvenidaDevolucao)}
            onChangeText={(texto) => onChangeCampo('ruaAvenidaDevolucao', texto)}
          />

          <FormInput
            id="numeroDevolucao"
            label="Número"
            placeholder="Ex: 1234"
            value={numeroDevolucao}
            required
            error={erros.numeroDevolucao}
            shake={shake && Boolean(erros.numeroDevolucao)}
            onChangeText={(texto) => onChangeCampo('numeroDevolucao', texto)}
          />

          <FormTextarea
            id="complementoDevolucao"
            label="Complemento (opcional)"
            placeholder="Apartamento, bloco, referência..."
            value={complementoDevolucao}
            onChangeText={(texto) => onChangeCampo('complementoDevolucao', texto)}
            minHeight={80}
          />
        </View>
      )}
    </View>
  );
}
