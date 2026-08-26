import type { KeyboardTypeOptions, ReturnKeyTypeOptions } from 'react-native';

export interface FormInputProps {
  id: string;
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (texto: string) => void;
  required?: boolean;
  error?: string;
  /** força a borda de erro sem exibir texto embaixo (útil em listas, ex: linhas de especificação) */
  invalido?: boolean;
  shake?: boolean;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
  multiline?: boolean;
  minHeight?: number;
  editable?: boolean;
  returnKeyType?: ReturnKeyTypeOptions;
  onSubmitEditing?: () => void;
  onBlur?: () => void;
  onKeyPress?: (e: { nativeEvent: { key: string } }) => void;
  accessibilityLabel?: string;
  /** conteúdo extra fixo à esquerda do texto (ex: prefixo "R$") */
  prefixo?: string;
}
