// src/types/index.ts

export interface CardData {
    id: string;
    holderName: string;
    cardBank: string;
    cardNumber: string;
    cardType: 'VISA' | 'MasterCard' | string;
}

export interface TransactionData {
    id: string;
    userId: string;
    amount: number;
    type: 'deposit' | 'withdrawal' | 'campaign_earning';
    date: string;
    status: 'pending' | 'completed' | 'failed';
    description?: string;
}