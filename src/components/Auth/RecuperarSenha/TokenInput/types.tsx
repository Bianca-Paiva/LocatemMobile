/**
 * Componente de autenticacao: apoia login, cadastro, recuperacao de senha ou protecao de rotas.
 */
export interface TokenInputProps{
    value:string,
    onChange:(value: string) => void;
}