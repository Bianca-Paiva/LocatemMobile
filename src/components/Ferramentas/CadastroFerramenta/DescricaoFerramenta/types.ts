/**
 * Secao do cadastro de ferramenta: captura uma parte do anuncio criado pelo locador.
 */
export interface DescricaoFerramentaProps {
  value: string;
  onChange: (valor: string) => void;
  error?: string;
  shake?: boolean;
}
