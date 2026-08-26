// Wrapper fino em cima do FormInput, só fixando multiline + altura mínima
// (mesmo papel do FormTextarea da Web, que reaproveitava o input base).
import FormInput from '../FormInput';
import type { FormTextareaProps } from './types';

export default function FormTextarea({
  id,
  label,
  placeholder,
  value,
  onChangeText,
  required,
  error,
  shake,
  maxLength,
  minHeight = 120,
}: FormTextareaProps) {
  return (
    <FormInput
      id={id}
      label={label}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      required={required}
      error={error}
      shake={shake}
      maxLength={maxLength}
      multiline
      minHeight={minHeight}
    />
  );
}
