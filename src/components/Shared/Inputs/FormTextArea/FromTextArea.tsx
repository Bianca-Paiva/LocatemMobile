import { TextInputProps } from 'react-native';
import FormInput from '../FormInput/FormInput';
// Importe a interface do seu FormInput atualizado (ajuste o caminho se necessário)
import  { FormInputProps }  from '../FormInput/FormInput'; 

// Omitimos algumas props nativas do TextInputProps caso você queira forçar
// o padrão do seu componente base.
export interface FormTextareaProps extends FormInputProps {
  // Você pode adicionar props exclusivas do textarea aqui, se precisar
  minHeight?: number;
}

export default function FormTextarea({
  minHeight = 120,
  style,
  ...props
}: FormTextareaProps) {
  return (
    <FormInput
      {...props}
      multiline={true} // Força a ser textarea
      textAlignVertical="top" // Essencial para Android (texto começar em cima)
      style={[
        { minHeight }, // Aplica a altura mínima padrão
        style,
      ]}
    />
  );
}