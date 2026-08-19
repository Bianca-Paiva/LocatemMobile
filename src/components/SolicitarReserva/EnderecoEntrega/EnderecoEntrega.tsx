import { Alert, Pressable, Text, View } from 'react-native';

import FormInput from '../../Inputs/FormInput/FormInput';
import FormTextarea from '../../Inputs/FormTextArea/FromTextArea';
import { maskCEP, maskPhone } from '../../../hooks/masks';
import type { SolicitarReservaFormState } from '../../../pages/Reservas/SolicitarReserva/SolicitarReserva.types';

import { styles } from './styles';

/** Chaves do form relacionadas a este bloco (endereço + contato) */
type CampoEndereco =
  | 'cep'
  | 'cepDesconhecido'
  | 'ruaAvenida'
  | 'numero'
  | 'complemento'
  | 'nomeCompleto'
  | 'telefoneContato';

interface ErrosEndereco {
  cep?: string;
  ruaAvenida?: string;
  numero?: string;
  nomeCompleto?: string;
  telefoneContato?: string;
}

interface EnderecoEntregaProps {
  form: Pick<SolicitarReservaFormState, CampoEndereco>;
  onChangeCampo: <K extends CampoEndereco>(
    campo: K,
    valor: SolicitarReservaFormState[K]
  ) => void;
  erros: ErrosEndereco;
  shake: boolean;
}

// Removido o "id" da versão Web.
// No React Native não existe associação label/input via htmlFor,
// portanto a prop não possui utilidade e não faz parte de TextInputProps.

export default function EnderecoEntrega({
  form,
  onChangeCampo,
  erros,
  shake,
}: EnderecoEntregaProps) {
  const {
    cep,
    cepDesconhecido,
    ruaAvenida,
    numero,
    complemento,
    nomeCompleto,
    telefoneContato,
  } = form;

  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>
        Endereço de entrega e devolução
      </Text>

      <View style={styles.linhaCep}>
        <View style={styles.campoCep}>
          <FormInput
            label="CEP"
            placeholder="00000-000"
            keyboardType="numeric"
            value={cep}
            editable={!cepDesconhecido}
            required={!cepDesconhecido}
            error={erros.cep}
            status={erros.cep ? 'erro' : ''}
            shake={shake && Boolean(erros.cep)}
            onChangeText={(value) =>
              onChangeCampo('cep', maskCEP(value))
            }
          />
        </View>

        <Pressable
          onPress={() => {
            Alert.alert(
              'Aviso',
              'Funcionalidade em desenvolvimento.'
            );
          }}
        >
          <Text style={styles.linkCepDesconhecido}>
            {cepDesconhecido
              ? 'Informar meu CEP'
              : 'Não sei meu CEP'}
          </Text>
        </Pressable>
      </View>

      <View style={styles.linhaRuaNumero}>
        <FormInput
          label="Rua / Avenida"
          placeholder="Ex.: Avenida los Leones"
          value={ruaAvenida}
          required
          error={erros.ruaAvenida}
          status={erros.ruaAvenida ? 'erro' : ''}
          shake={shake && Boolean(erros.ruaAvenida)}
          onChangeText={(value) =>
            onChangeCampo('ruaAvenida', value)
          }
        />

        <FormInput
          label="Número"
          placeholder="Ex.: 1234"
          value={numero}
          required
          error={erros.numero}
          status={erros.numero ? 'erro' : ''}
          shake={shake && Boolean(erros.numero)}
          onChangeText={(value) =>
            onChangeCampo('numero', value)
          }
        />
      </View>

      <FormTextarea
        label="Complemento (opcional)"
        placeholder="Apartamento, bloco, referência..."
        value={complemento}
        onChangeText={(value) =>
          onChangeCampo('complemento', value)
        }
      />

      <View style={styles.dadosContato}>
        <Text style={styles.subtitulo}>
          Dados de contato
        </Text>

        <Text style={styles.descricaoContato}>
          Se houver algum problema na entrega e/ou
          devolução, você receberá uma ligação neste
          número.
        </Text>
      </View>

      <FormInput
        id="nomeCompleto"
        label="Nome Completo"
        placeholder="Digite seu nome"
        value={nomeCompleto}
        required
        error={erros.nomeCompleto}
        status={erros.nomeCompleto ? 'erro' : ''}
        shake={shake && Boolean(erros.nomeCompleto)}
        onChangeText={(value) =>
          onChangeCampo('nomeCompleto', value)
        }
      />

      <FormInput
        label="Telefone de contato"
        placeholder="(00) 00000-0000"
        keyboardType="phone-pad"
        value={telefoneContato}
        required
        error={erros.telefoneContato}
        status={erros.telefoneContato ? 'erro' : ''}
        shake={shake && Boolean(erros.telefoneContato)}
        onChangeText={(value) =>
          onChangeCampo(
            'telefoneContato',
            maskPhone(value)
          )
        }
      />
    </View>
  );
}