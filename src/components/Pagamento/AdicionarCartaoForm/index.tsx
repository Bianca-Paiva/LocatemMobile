import { View, Text, TouchableOpacity } from 'react-native';
import { CreditCard, Check } from 'lucide-react-native';

import FormInput from '../../Input/FormInput';
import FormSelect from '../../Input/FormSelect';
import { PARCELAS_PADRAO } from '../../../hooks/Pagamento/useAdicionarCartao';
import type { CampoCartao } from '../../../hooks/Pagamento/useAdicionarCartao';
import type { BandeiraCartao } from '../../../hooks/masks';
import colors from '../../../theme/colors';
import styles from './styles';

// Nome de exibição da bandeira detectada — mesmo texto exibido junto do ícone.
const nomesBandeira: Record<Exclude<BandeiraCartao, ''>, string> = {
  VISA: 'Visa',
  MASTER: 'Mastercard',
  AMEX: 'American Express',
  ELO: 'Elo',
  DISCOVER: 'Discover',
  DINERS: 'Diners',
};

interface DadosFormularioCartao {
  numero: string;
  nomeTitular: string;
  validade: string;
  cvv: string;
  parcelamento: string;
  salvarCartao: boolean;
}

interface AdicionarCartaoFormProps {
  dados: DadosFormularioCartao;
  bandeira: BandeiraCartao;
  erros: Partial<Record<CampoCartao, string>>;
  mostrarParcelamento?: boolean;
  parcelamentoOpcoes?: string[];
  onNumeroChange: (valor: string) => void;
  onNomeTitularChange: (valor: string) => void;
  onValidadeChange: (valor: string) => void;
  onValidadeBlur: () => void;
  onCvvChange: (valor: string) => void;
  onParcelamentoChange?: (valor: string) => void;
  onSalvarCartaoChange: (valor: boolean) => void;
}

export function AdicionarCartaoForm({
  dados,
  bandeira,
  erros,
  mostrarParcelamento = false,
  parcelamentoOpcoes = PARCELAS_PADRAO,
  onNumeroChange,
  onNomeTitularChange,
  onValidadeChange,
  onValidadeBlur,
  onCvvChange,
  onParcelamentoChange,
  onSalvarCartaoChange,
}: AdicionarCartaoFormProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Dados do Cartão</Text>
        <CreditCard size={18} color={colors.textDark} />
      </View>

      {/* Número do Cartão */}
      <FormInput
        id="numeroCartao"
        label="Número do Cartão"
        required
        keyboardType="numeric"
        placeholder="0000 0000 0000 0000"
        value={dados.numero}
        onChangeText={onNumeroChange}
        error={erros.numero}
        prefixo={bandeira ? nomesBandeira[bandeira as Exclude<BandeiraCartao, ''>] : undefined}
      />

      {/* Nome do Titular */}
      <FormInput
        id="nomeTitular"
        label="Nome do Titular"
        required
        placeholder="NOME COMO ESTÁ NO CARTÃO"
        value={dados.nomeTitular}
        onChangeText={onNomeTitularChange}
        error={erros.nomeTitular}
      />

      {/* Validade e CVV */}
      <View style={styles.linhaCampos}>
        <View style={styles.campoMetade}>
          <FormInput
            id="validade"
            label="Validade"
            required
            keyboardType="numeric"
            placeholder="MM/AA"
            value={dados.validade}
            onChangeText={onValidadeChange}
            onBlur={onValidadeBlur}
            error={erros.validade}
          />
        </View>

        <View style={styles.campoMetade}>
          <FormInput
            id="cvv"
            label="CVV"
            required
            keyboardType="numeric"
            placeholder="123"
            value={dados.cvv}
            onChangeText={onCvvChange}
            error={erros.cvv}
          />
        </View>
      </View>

      {/* Parcelamento */}
      {mostrarParcelamento && (
        <FormSelect
          id="parcelamento"
          label="Parcelamento"
          required
          value={dados.parcelamento}
          options={parcelamentoOpcoes}
          onChange={(valor) => onParcelamentoChange?.(valor)}
          error={erros.parcelamento}
        />
      )}

      {/* Salvar Cartão */}
      <TouchableOpacity
        style={styles.salvarCartao}
        onPress={() => onSalvarCartaoChange(!dados.salvarCartao)}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: dados.salvarCartao }}
      >
        <View style={[styles.checkbox, dados.salvarCartao && styles.checkboxMarcado]}>
          {dados.salvarCartao && <Check size={12} color="#FFFFFF" strokeWidth={3} />}
        </View>
        <Text style={styles.salvarCartaoTexto}>Salvar cartão para próximas compras</Text>
      </TouchableOpacity>
    </View>
  );
}
