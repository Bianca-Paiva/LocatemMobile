import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
// Importante: ScrollView vem daqui (react-native-gesture-handler), não de
// 'react-native' — mesmo motivo do SecaoModal (ver comentário lá). O app já
// usa react-native-gesture-handler em outros pontos, o que muda como o
// Android reconhece gestos na tela inteira, e um ScrollView "puro" dentro de
// outro (esse menu dentro do ScrollView da tela) não consegue negociar quem
// deve rolar — o de fora sempre ganha. A versão do gesture-handler participa
// do mesmo sistema de reconhecimento de gestos e resolve isso também no
// Android.
import { ScrollView } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { TempoDropdownProps } from './types';
import { styles } from './styles';

// Mesmas opções da versão Web (PeriodoLocacaoDropdown): "Selecione" + 1 a 30 dias
const TEMPO_OPTIONS = [
  'Selecione',
  ...Array.from({ length: 30 }, (_, i) => {
    const dia = i + 1;
    return dia === 1 ? '1 dia' : `${dia} dias`;
  }),
];

export default function TempoDropdown({ value, onChange, onOpenChange }: TempoDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const closeDropdown = () => {
    setIsOpen(false);
    onOpenChange?.(false);
  };

  const toggleDropdown = () => {
    const next = !isOpen;
    setIsOpen(next);
    onOpenChange?.(next);
  };

  const handleSelect = (option: string) => {
    onChange(option);
    closeDropdown();
  };

  return (
    // Sem Modal: o menu é uma View absoluta ancorada sob o botão, igual ao HorarioDropdown que já existe no projeto. zIndex/elevation sobem quando aberto pra não ficar atrás de outros cards da tela (ProdutosSemelhantes etc).
    <View style={[styles.container, isOpen && styles.containerOpen]}>
      {/* Botão Gatilho */}
      <TouchableOpacity
        style={[styles.trigger, isOpen && styles.triggerAtivo]}
        onPress={toggleDropdown}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityState={{ expanded: isOpen }}
      >
        <Text style={styles.triggerText} numberOfLines={1}>
          {value}
        </Text>
        <Feather
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          size={18}
          color="#374151"
          style={styles.chevron}
        />
      </TouchableOpacity>

      {isOpen && (
        // O ScrollView não tem nenhum Touchable/Pressable como ancestral aqui, então o gesto de rolagem chega até ele sem disputa.
        // `nestedScrollEnabled` é obrigatório no Android: esse menu fica dentro do ScrollView da tela (mesmo eixo vertical) e,
        // sem essa flag, o Android não entrega o gesto de arrastar para este ScrollView interno. No iOS isso não é necessário
        // (o UIScrollView nativo já negocia scroll aninhado sozinho) e a prop não tem efeito lá, então é seguro deixá-la sempre.
        <View style={styles.menu}>
          <ScrollView
            showsVerticalScrollIndicator
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled
          >
            {TEMPO_OPTIONS.map((item) => {
              const isSelected = item === value;
              return (
                <TouchableOpacity
                  key={item}
                  style={[styles.option, isSelected && styles.optionActive]}
                  onPress={() => handleSelect(item)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.optionText, isSelected && styles.optionTextActive]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
}