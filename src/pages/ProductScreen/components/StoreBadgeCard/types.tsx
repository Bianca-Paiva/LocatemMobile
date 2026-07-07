export interface StoreBadgeCardProps {
    //nome da loja
    storeName: string;

    //nota media da loja
    averageRating: number;

    //se a loja é verificada ou não
    isVerifiedStore: boolean;

    //Imagem do badge da loja
    storeBadgeImage?: string;

    //Icone para ir visitar a loja
    onVisitStorePress?: () => void;
}