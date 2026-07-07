import { ReactNode } from 'react';

export interface AccordionProps {
    // Título da aba (Ex: "Descrição", "Especificações Técnicas", "Avaliações de Clientes")
    title: string;

    children: ReactNode;
}