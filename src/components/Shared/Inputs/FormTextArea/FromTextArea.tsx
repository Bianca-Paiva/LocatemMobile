import FormInput from '../FormInput/FormInput';
import type { FormInputProps } from '../FormInput/FormInput';

export interface FormTextareaProps extends FormInputProps {
  /** Altura mínima da caixa de texto. */
  minHeight?: number;
}

/**
 * Textarea = FormInput em modo multiline.
 *
 * O `minHeight` agora vai no `containerStyle`, porque é o container que
 * desenha a caixa — mandar a altura só para o TextInput interno fazia a borda
 * continuar com 48px enquanto o texto vazava por dentro.
 */
export default function FormTextarea({
  minHeight = 120,
  containerStyle,
  ...props
}: FormTextareaProps) {
  return (
    <FormInput
      {...props}
      multiline
      textAlignVertical="top"
      containerStyle={[{ minHeight }, containerStyle]}
    />
  );
}
