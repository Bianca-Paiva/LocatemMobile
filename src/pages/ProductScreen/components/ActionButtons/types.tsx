export interface ActionButtonsProps {
    /** Função disparada ao clicar no botão principal de Locar */
    onRent: () => void;

    /** Função disparada ao clicar no botão secundário de Carrinho */
    onAddToCart: () => void;
}