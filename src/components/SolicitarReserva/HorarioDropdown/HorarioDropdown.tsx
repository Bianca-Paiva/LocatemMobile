import { useState } from 'react';
import {
  Image,
  Pressable,
  Text,
  View,
} from 'react-native';

import IconSeta from '../../../../assets/images/icons/IconSeta.png';
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
}

export default function HorarioDropdown({
  label,
  value,
  onChange,
  required = false,
  error,
  shake = false,
}: HorarioDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
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

      <View style={styles.container}>
        <Pressable
          style={[
            styles.trigger,
            error && styles.erro,
          ]}
          onPress={() =>
            setIsOpen((prev) => !prev)
          }
        >
          <Text style={styles.triggerText}>
            {selectedOption}
          </Text>

          <Image
            source={IconSeta}
            style={[
              styles.chevron,
              isOpen &&
                styles.chevronOpen,
            ]}
            resizeMode="contain"
          />
        </Pressable>

        {isOpen && (
          <View style={styles.menu}>
            {HORARIO_OPTIONS.map(
              (option) => (
                <Pressable
                  key={
                    option.value ||
                    'placeholder'
                  }
                  style={[
                    styles.option,
                    option.value === value &&
                      styles.optionActive,
                  ]}
                  onPress={() =>
                    handleSelect(
                      option.value,
                    )
                  }
                >
                  <Text
                    style={
                      styles.optionText
                    }
                  >
                    {option.label}
                  </Text>
                </Pressable>
              ),
            )}
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