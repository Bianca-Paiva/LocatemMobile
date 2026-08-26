import type { ReactNode } from "react";
import type { RootStackParamList } from "../../routes/AppRoutes";

// ===========================
// Nomes de tela válidos
// (baseado no seu RootStackParamList)
// ===========================
export type ScreenName = keyof RootStackParamList;

// ===========================
// Item de navegação do menu lateral
// ===========================
export interface NavItem {
    label: string;
    // Se não tiver "route", o item fecha o menu mas não navega
    // (mesmo comportamento da versão Web)
    route?: ScreenName;
    renderIcon: (active: boolean) => ReactNode;
}
