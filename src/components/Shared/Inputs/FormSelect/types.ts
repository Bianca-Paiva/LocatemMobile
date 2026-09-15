export interface FormSelectProps {
  id: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  options: string[];
  value: string;
  error?: string;
  shake?: boolean;
  onChange: (valor: string) => void;
}
