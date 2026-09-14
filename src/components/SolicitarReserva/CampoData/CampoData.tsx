// Campo de data da tela "Detalhes da Locação".
// Ao tocar no campo, abre um calendário em vez de permitir texto livre.
// No Mobile, o calendário é exibido em uma folha (bottom sheet) usando Modal.

import { useState } from 'react';

import { Modal, Pressable, Text, View } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../../../theme/colors';

import { formatarDataBr, parseDataIso } from '../../../utils/dataLocacao';

import CalendarioLocacao from '../CalendarioLocacao/CalendarioLocacao';

import { styles } from './styles';

interface CampoDataProps {
  label: string;

  /** Data selecionada, no formato ISO ("yyyy-mm-dd") */
  value: string;

  onChange: (value: string) => void;

  /** Menor data selecionável */
  min?: string;

  /** Datas já locadas ou indisponíveis */
  diasIndisponiveis?: string[];

  /** Datas de entrega e devolução usadas para destacar o intervalo */
  dataEntrega?: string;
  dataDevolucao?: string;

  required?: boolean;
  error?: string;
}

export default function CampoData({
  label,
  value,
  onChange,
  min,
  diasIndisponiveis = [],
  dataEntrega = '',
  dataDevolucao = '',
  required = false,
  error,
}: CampoDataProps) {
  // Controla se o calendário está aberto ou fechado.
  const [aberto, setAberto] = useState(false);

  // Guarda o mês atualmente exibido no calendário.
  const [mesReferencia, setMesReferencia] = useState<Date>(
    () =>
      parseDataIso(value) ||
      parseDataIso(min ?? '') ||
      new Date(),
  );

  // Converte as datas indisponíveis para Set para facilitar as verificações.
  const diasIndisponiveisSet = new Set(diasIndisponiveis);

  // Abre o calendário e posiciona no mês da data selecionada.
  const abrirCalendario = () => {
    // Se não houver data selecionada, usa a data mínima.
    // Se também não houver data mínima, usa o mês atual.
    setMesReferencia(
      parseDataIso(value) ||
        parseDataIso(min ?? '') ||
        new Date(),
    );

    setAberto(true);
  };

  // Executado quando o usuário escolhe uma data no calendário.
  const handleSelecionar = (dataIso: string) => {
    // Envia a data escolhida para o componente pai.
    onChange(dataIso);

    // Fecha o calendário após a seleção.
    setAberto(false);
  };

  return (
    <View style={styles.wrapper}>
      {/* Label do campo e indicador de preenchimento obrigatório. */}
      <Text style={styles.label}>
        {label}
        {required && (
          <Text style={styles.required}> *</Text>
        )}
      </Text>

      {/* Campo clicável que abre o calendário. */}
      <Pressable
        style={[
          styles.campoWrapper,
          error && styles.erro,
        ]}
        onPress={abrirCalendario}
        accessibilityRole="button"
        accessibilityLabel={label}
      >
        {/* Exibe a data formatada ou o placeholder. */}
        <Text
          style={
            value
              ? styles.valorTexto
              : styles.placeholderTexto
          }
        >
          {value ? formatarDataBr(value) : 'dd/mm/aaaa'}
        </Text>

        {/* Ícone que indica que o campo representa uma data. */}
        <MaterialCommunityIcons
          name="calendar-blank-outline"
          size={18}
          color={colors.textMuted}
          style={styles.icone}
        />
      </Pressable>

      {/* Mensagem de erro do campo, quando existir. */}
      {error && (
        <Text style={styles.error}>
          {error}
        </Text>
      )}

      {/* Modal responsável por exibir o calendário. */}
      <Modal
        visible={aberto}
        transparent
        animationType="fade"
        onRequestClose={() => setAberto(false)}
      >
        {/* Tocar fora da folha fecha o calendário. */}
        <Pressable
          style={styles.overlay}
          onPress={() => setAberto(false)}
        >
          {/* Impede que toques dentro da folha fechem o Modal. */}
          <Pressable
            style={styles.folha}
            onPress={(e) => e.stopPropagation()}
          >
            {/* Cabeçalho da folha com título e botão fechar. */}
            <View style={styles.folhaCabecalho}>
              <Text style={styles.folhaTitulo}>
                {label}
              </Text>

              <Pressable
                onPress={() => setAberto(false)}
                accessibilityLabel="Fechar"
              >
                <MaterialCommunityIcons
                  name="close"
                  size={22}
                  color={colors.textMuted}
                />
              </Pressable>
            </View>

            {/* Calendário responsável pela navegação e seleção das datas. */}
            <CalendarioLocacao
              mesReferencia={mesReferencia}
              onMudarMes={setMesReferencia}
              dataEntrega={dataEntrega}
              dataDevolucao={dataDevolucao}
              dataMinima={min ?? ''}
              diasIndisponiveis={diasIndisponiveisSet}
              onSelecionar={handleSelecionar}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}