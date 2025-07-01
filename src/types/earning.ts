export interface EarningCardData {
    id: string;
    brandLogoUrl: string;
    brandHeadline: string;
    productName: string;
    description: string;
    createdAt: Date | string;
    earningCardImageUrl: string;
    clickCount: number;
    fixedPrice: number;
    isWithdrawalPossible: boolean;
    postedTime?: string;
}
