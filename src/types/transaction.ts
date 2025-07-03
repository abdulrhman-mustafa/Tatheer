// src/types/transaction.ts

export type TransactionType = 'deposit' | 'withdrawal' | 'campaign_payment' | 'campaign_earning';

export interface Transaction {
    id: string;
    userId: string;
    amount: number;
    type: TransactionType;
    date: string;
    status: 'completed' | 'pending' | 'failed';
    description?: string;
    campaignId?: string;
}