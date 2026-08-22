export interface FormTextareaProps {
  id: string;
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (texto: string) => void;
  required?: boolean;
  error?: string;
  shake?: boolean;
  maxLength?: number;
  minHeight?: number;
}
