// Dropdown de horário da tela "Detalhes da Locação". As opções aparecem
// integradas ao próprio fluxo da tela — um menu ancorado sob o campo via
// `position: absolute` — em vez de abrir um `Modal`. Segue o mesmo padrão já
// usado em `TempoDropdown` (pages/ProductScreen/components/TempoDropown) e
// espelha o comportamento do `HorarioDropdown` da Web.
import { useState } from 'react';
import {
  Pressable,
  Text,
  View,
} from 'react-native';
// Importante: ScrollView vem daqui (react-native-gesture-handler), não de
// 'react-native'. O app já usa react-native-gesture-handler em outros pontos
// (ver SecaoModal e FotosFerramenta), o que muda como o Android reconhece
// gestos na tela inteira. Nesse cenário, um ScrollView "puro" de dentro de
// outro (esse menu dentro do ScrollView da tela) não consegue negociar
// direito quem deve rolar — o de fora sempre ganha. A versão do
// gesture-handler participa do mesmo sistema de reconhecimento de gestos e
// resolve essa disputa corretamente também no Android.
import { ScrollView } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../../../theme/colors';
import { styles } from './styles';

// Horários disponíveis como faixas de 3 horas
const HORA_INICIO = 6;
const HORA_FIM = 22;
const DURACAO_FAIXA = 3;

const HORARIO_OPTIONS = [
  {
    label: 'Selecione um horário',
    value: '',
  },
  ...Array.from(
    { length: HORA_FIM - HORA_INICIO - DURACAO_FAIXA + 1 },
    (_, i) => {
      const horaInicio = String(
        HORA_INICIO + i,
      ).padStart(2, '0');

      const horaFim = String(
        HORA_INICIO + i + DURACAO_FAIXA,
      ).padStart(2, '0');

      return {
        label: `${horaInicio}:00 - ${horaFim}:00`,
        value: `${horaInicio}:00`,
      };
    },
  ),
];

interface HorarioDropdownProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  shake?: boolean;
  /** Notifica a tela quando o menu abre/fecha (ex.: para travar o scroll da tela). */
  onOpenChange?: (isOpen: boolean) => void;
}

export default function HorarioDropdown({
  label,
  value,
  onChange,
  required = false,
  error,
  onOpenChange,
}: HorarioDropdownProps) {
  const [aberto, setAberto] = useState(false);

  const fecharMenu = () => {
    setAberto(false);
    onOpenChange?.(false);
  };

  const alternarMenu = () => {
    const proximoEstado = !aberto;
    setAberto(proximoEstado);
    onOpenChange?.(proximoEstado);
  };

  const handleSelect = (option: string) => {
    onChange(option);
    fecharMenu();
  };

  const selectedOption =
    HORARIO_OPTIONS.find(
      (option) => option.value === value,
    )?.label ?? 'Selecione um horário';

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>
        {label}

        {required && (
          <Text style={styles.required}>
            {' '}
            *
          </Text>
        )}
      </Text>

      {/* Sem Modal: o menu é uma View absoluta ancorada sob o botão, igual ao
          TempoDropdown. zIndex/elevation sobem quando aberto para o menu
          ficar sempre por cima dos campos seguintes da tela. */}
      <View style={[styles.container, aberto && styles.containerAberto]}>
        <Pressable
          style={[
            styles.trigger,
            error && styles.erro,
          ]}
          onPress={alternarMenu}
          accessibilityRole="button"
          accessibilityLabel={label}
          accessibilityState={{ expanded: aberto }}
        >
          <Text style={styles.triggerText} numberOfLines={1}>
            {selectedOption}
          </Text>

          <MaterialCommunityIcons
            name={aberto ? 'chevron-up' : 'chevron-down'}
            size={18}
            color={colors.textMuted}
          />
        </Pressable>

        {aberto && (
          // O ScrollView não tem nenhum Touchable/Pressable como ancestral
          // aqui, então o gesto de rolagem chega até ele sem disputa.
          //
          // `nestedScrollEnabled` é obrigatório no Android: esse menu fica
          // dentro do ScrollView da tela (mesmo eixo vertical) e, sem essa
          // flag, o Android não entrega o gesto de arrastar para este
          // ScrollView interno — o toque nunca chega a rolar a lista de
          // opções. O iOS não precisa dessa flag (o UIScrollView nativo já
          // negocia scroll aninhado sozinho), por isso só afetava Android.
          // A prop não tem efeito no iOS, então é seguro deixá-la sempre.
          <View style={styles.menu}>
            <ScrollView
              showsVerticalScrollIndicator
              keyboardShouldPersistTaps="handled"
              nestedScrollEnabled
            >
              {HORARIO_OPTIONS.map((option) => {
                const selecionado = option.value === value;
                return (
                  <Pressable
                    key={option.value || 'placeholder'}
                    style={[
                      styles.option,
                      selecionado && styles.optionActive,
                    ]}
                    onPress={() => handleSelect(option.value)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        selecionado && styles.optionActiveText,
                      ]}
                    >
                      {option.label}
                    </Text>

                    {selecionado && (
                      <MaterialCommunityIcons name="check" size={16} color={colors.textDark} />
                    )}
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        )}
      </View>

      {!!error && (
        <Text style={styles.error}>
          {error}
        </Text>
      )}
    </View>
  );
}
