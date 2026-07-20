export interface CustomerFeedbackCardProps{
    reviewerName: string;
    starRating: number;
    feedbackMessage: string;
    hasAttachedPhotos: boolean;
    usefulCount?: number; // Contador de quantas pessoas acharam o comentário útil
} 